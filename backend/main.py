# main.py - FastAPI Backend with Email Notifications

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from datetime import datetime
import json
import os
from pathlib import Path
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Portfolio Contact API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173","https://portfolio2-0-one-delta.vercel.app", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

# File path for storing messages
MESSAGES_FILE = Path("messages.json")

def load_messages():
    """Load messages from JSON file"""
    if MESSAGES_FILE.exists():
        with open(MESSAGES_FILE, "r") as f:
            return json.load(f)
    return []

def save_messages(messages):
    """Save messages to JSON file"""
    with open(MESSAGES_FILE, "w") as f:
        json.dump(messages, f, indent=2)

def send_email_notification(contact: ContactMessage, message_id: int):
    """
    Send email notification when new message is received
    
    SENDERS: Anyone can send you a message
    RECEIVER: You receive the email at RECEIVER_EMAIL
    SMTP_SENDER: Gmail account used to send the notification email
    
    Flow: Visitor sends message -> Saved -> Email sent to YOUR inbox
    """
    try:
        # Email configuration
        smtp_sender = os.getenv("SENDER_EMAIL")  # Gmail account for SMTP
        smtp_password = os.getenv("SENDER_PASSWORD")  # App Password
        your_email = os.getenv("RECEIVER_EMAIL")  # YOUR email where you receive notifications
        
        # Check if credentials are set
        if not smtp_sender or not smtp_password:
            print("⚠️ Warning: Email credentials not configured. Email will not be sent.")
            print("Set SENDER_EMAIL and SENDER_PASSWORD in .env file")
            return False
        
        if not your_email:
            your_email = smtp_sender  # Use sender email as fallback
            print(f"⚠️ RECEIVER_EMAIL not set, using SENDER_EMAIL: {your_email}")
        
        # Create email message
        message = MIMEMultipart("alternative")
        message["Subject"] = f"🎉 New Message from {contact.name} - Portfolio Contact"
        message["From"] = smtp_sender
        message["To"] = your_email
        
        # HTML body for better formatting
        html_body = f"""
        <html>
            <body style="font-family: 'Courier Prime', monospace; background-color: #000; color: #10b981; padding: 20px;">
                <div style="border: 2px solid #10b981; border-radius: 10px; padding: 20px; background-color: rgba(5, 46, 22, 0.9);">
                    <h1 style="color: #10b981; text-shadow: 0 0 10px rgba(16, 185, 129, 0.8); margin-top: 0;">
                        ✨ New Portfolio Message
                    </h1>
                    
                    <div style="margin-top: 20px;">
                        <p><strong style="color: #06b6d4;">Message ID:</strong> #{message_id}</p>
                        <p><strong style="color: #06b6d4;">From (Sender):</strong> {contact.name}</p>
                        <p><strong style="color: #06b6d4;">Sender's Email:</strong> {contact.email}</p>
                        <p><strong style="color: #06b6d4;">Date:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                    </div>
                    
                    <div style="margin-top: 30px; border-top: 2px solid #10b981; padding-top: 20px;">
                        <h2 style="color: #10b981; margin-top: 0;">Message Content:</h2>
                        <div style="background-color: rgba(0, 0, 0, 0.5); padding: 15px; border-left: 3px solid #06b6d4; border-radius: 5px; white-space: pre-wrap; word-wrap: break-word;">
                            {contact.message}
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; border-top: 2px solid #10b981; padding-top: 20px;">
                        <p style="color: #06b6d4; margin: 10px 0;">
                            <strong>📧 To reply, email:</strong> {contact.email}
                        </p>
                        <p style="color: #10b981; font-size: 12px; margin-top: 20px;">
                            Sent from Your Portfolio Contact Form
                        </p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Plain text version
        text_body = f"""
New Portfolio Message
====================

Message ID: #{message_id}
From (Sender): {contact.name}
Sender's Email: {contact.email}
Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

Message:
--------
{contact.message}

---
To reply, email: {contact.email}
        """
        
        # Attach both versions
        message.attach(MIMEText(text_body, "plain"))
        message.attach(MIMEText(html_body, "html"))
        
        # Send email via Gmail SMTP
        print(f"📧 Sending email notification to {your_email}...")
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=10)
        server.login(smtp_sender, smtp_password)
        server.sendmail(smtp_sender, your_email, message.as_string())
        server.quit()
        
        print(f"✅ Email sent successfully to {your_email}!")
        return True
        
    except smtplib.SMTPAuthenticationError:
        print(f"❌ Email Error: SMTP authentication failed. Check SENDER_EMAIL and SENDER_PASSWORD in .env")
        return False
    except smtplib.SMTPException as e:
        print(f"❌ Email Error: {str(e)}")
        return False
    except Exception as e:
        print(f"❌ Email Error: {str(e)}")
        return False

@app.get("/")
def read_root():
    return {
        "message": "Portfolio Contact API is running",
        "endpoints": {
            "post_message": "/api/contact",
            "get_all_messages": "/api/messages",
            "get_single_message": "/api/messages/{message_id}",
            "mark_as_read": "/api/messages/{message_id}/read",
            "delete_message": "/api/messages/{message_id}"
        }
    }

@app.post("/api/contact")
def send_contact_message(contact: ContactMessage):
    """
    Receive contact message from portfolio and send email notification
    """
    try:
        # Load existing messages
        messages = load_messages()
        
        # Create new message object
        new_message = {
            "id": len(messages) + 1,
            "name": contact.name,
            "email": contact.email,
            "message": contact.message,
            "timestamp": datetime.now().isoformat(),
            "read": False
        }
        
        # Add to messages
        messages.append(new_message)
        
        # Save to file
        save_messages(messages)
        
        # Send email notification
        email_sent = send_email_notification(contact, new_message["id"])
        
        return {
            "status": "success",
            "message": "Message received successfully!",
            "email_notification": "sent" if email_sent else "failed",
            "data": new_message
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/messages")
def get_all_messages():
    """
    Get all messages
    """
    messages = load_messages()
    return {
        "total": len(messages),
        "unread": len([m for m in messages if not m["read"]]),
        "messages": messages
    }

@app.get("/api/messages/{message_id}")
def get_message(message_id: int):
    """
    Get specific message by ID
    """
    messages = load_messages()
    for msg in messages:
        if msg["id"] == message_id:
            return msg
    raise HTTPException(status_code=404, detail="Message not found")

@app.put("/api/messages/{message_id}/read")
def mark_as_read(message_id: int):
    """
    Mark message as read
    """
    messages = load_messages()
    for msg in messages:
        if msg["id"] == message_id:
            msg["read"] = True
            save_messages(messages)
            return {"status": "success", "message": "Message marked as read"}
    raise HTTPException(status_code=404, detail="Message not found")

@app.delete("/api/messages/{message_id}")
def delete_message(message_id: int):
    """
    Delete a message
    """
    messages = load_messages()
    for i, msg in enumerate(messages):
        if msg["id"] == message_id:
            messages.pop(i)
            save_messages(messages)
            return {"status": "success", "message": "Message deleted"}
    raise HTTPException(status_code=404, detail="Message not found")

if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*60)
    print("🚀 Portfolio Contact API Starting...")
    print("="*60)
    print("\n⚙️ Checking email configuration...")
    if os.getenv("SENDER_EMAIL") and os.getenv("SENDER_PASSWORD"):
        print("✅ Email notifications: ENABLED")
    else:
        print("⚠️ Email notifications: DISABLED (configure .env file)")
    print("\n📡 Server running on http://0.0.0.0:8000")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("="*60 + "\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)