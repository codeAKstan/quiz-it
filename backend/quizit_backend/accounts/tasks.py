import requests
from celery import shared_task
from django.template.loader import render_to_string
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=3)
def send_password_reset_email(self, user_id, username, email, reset_url):
    """
    Task to send a password reset email using Mailgun API
    """
    try:
        # Render email template
        subject = "Password Reset Request"
        html_content = render_to_string('password_reset_email.html', {
            'user': {
                'username': username,
                'email': email
            },
            'reset_url': reset_url,
        })
        
        # Create plain text version as fallback
        text_content = f"""
        Hello {username},
        
        We received a request to reset your password. If you didn't make this request, you can safely ignore this email.
        
        To reset your password, click the link below:
        {reset_url}
        
        This link will expire in 24 hours.
        
        Thank you,
        The Team
        """
        
        # Send using Mailgun API
        response = requests.post(
            f"https://api.mailgun.net/v3/{settings.MAILGUN_DOMAIN}/messages",
            auth=("api", settings.MAILGUN_API_KEY),
            data={
                "from": f"Your App <{settings.DEFAULT_FROM_EMAIL}>",
                "to": [email],
                "subject": subject,
                "text": text_content,
                "html": html_content,
                "o:tag": ["password-reset"],  # Tag for analytics
                "o:tracking": "yes",  # Enable tracking
            }
        )
        
        # Check if the request was successful
        if response.status_code == 200:
            logger.info(f"Password reset email sent to {email} successfully")
            return f"Password reset email sent to {email}"
        else:
            logger.error(f"Failed to send email via Mailgun API: {response.text}")
            raise Exception(f"Mailgun API error: {response.status_code} - {response.text}")
            
    except Exception as exc:
        logger.error(f"Error sending password reset email: {str(exc)}")
        # Retry with exponential backoff
        retry_in = 60 * (2 ** self.request.retries)  # 60s, 120s, 240s
        raise self.retry(exc=exc, countdown=retry_in)