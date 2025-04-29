from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from io import BytesIO
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import inch
from reportlab.lib import colors
from transformers import pipeline
from database import users_collection
import bcrypt
import jwt 
import datetime
from database import users_collection


import os
from dotenv import load_dotenv
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")



app = Flask(__name__)
CORS(app)


# Initialize QA pipeline
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

# Sample context (can be dynamic later)
LEGAL_CONTEXT = """
In today's rapidly evolving digital age, technology plays an increasingly vital role in shaping our lives, influencing everything from the way we communicate and work to how we learn and entertain ourselves. With the advent of artificial intelligence, machine learning, and automation, industries across the globe are experiencing unprecedented transformations. Education, for instance, has been revolutionized through online learning platforms, enabling students to access knowledge and resources from anywhere in the world. Similarly, healthcare has seen remarkable advancements with telemedicine, wearable health monitors, and AI-assisted diagnostics improving patient care and early detection of diseases. In the business realm, data analytics and cloud computing have empowered companies to make smarter, faster decisions based on real-time insights. While these innovations bring immense benefits, they also raise important questions about privacy, security, and the ethical use of technology. As we navigate this complex landscape, it is crucial to strike a balance between embracing progress and safeguarding our values, ensuring that technology serves humanity positively and inclusively. Only through thoughtful implementation, continuous learning, and collaborative efforts can we harness the full potential of technological innovation for a better and more equitable future.
"""

# ----------- NDA PDF GENERATION -----------
@app.route("/generate_nda_pdf", methods=["POST"])
def generate_nda_pdf():
    data = request.get_json()
    disclosing_party = data.get("disclosingParty", "")
    receiving_party = data.get("receivingParty", "")
    date = data.get("date", "")
    purpose = data.get("purpose", "")

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=LETTER, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=72)

    styles = getSampleStyleSheet()
    normal = styles["Normal"]
    bold_center = ParagraphStyle(name="BoldCenter", parent=styles["Heading1"], alignment=TA_CENTER)
    section_header = ParagraphStyle(name="SectionHeader", fontSize=12, leading=14, spaceAfter=6, spaceBefore=12, fontName="Helvetica-Bold")
    indent = ParagraphStyle(name="Indented", parent=normal, leftIndent=20)

    elements = []

    elements.append(Paragraph("NON-DISCLOSURE AGREEMENT", bold_center))
    elements.append(Spacer(1, 12))

    def add_section(title, bullets):
        elements.append(Paragraph(title, section_header))
        for bullet in bullets:
            elements.append(Paragraph("• " + bullet, indent))

    add_section("PARTIES", [
        f"This Non-Disclosure Agreement is entered into on {date}, by and between {disclosing_party} and {receiving_party}."
    ])
    add_section("CONFIDENTIAL INFORMATION", [
        "The Receiving Party agrees not to disclose or misuse any confidential information.",
        "Confidential information includes business processes, client details, and any proprietary data."
    ])
    add_section("RETURN OF CONFIDENTIAL INFORMATION", [
        "All confidential information must be returned upon agreement termination."
    ])
    add_section("OWNERSHIP", [
        "This Agreement is non-transferable without written consent."
    ])
    add_section("GOVERNING LAW", [
        "This Agreement is governed by the applicable jurisdiction."
    ])
    add_section("SIGNATURE AND DATE", [
        f"Disclosing Party: _______________________      Date: {date}",
        f"Receiving Party: _______________________      Date: {date}"
    ])

    def draw_border(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(colors.blue)
        canvas.setLineWidth(3)
        canvas.rect(40, 40, doc.width + 64, doc.height + 64)
        canvas.restoreState()

    doc.build(elements, onFirstPage=draw_border, onLaterPages=draw_border)
    buffer.seek(0)

    return send_file(buffer, as_attachment=True, download_name="NDA_Document.pdf", mimetype="application/pdf")


# ----------- LEGAL QA ENDPOINT -----------
@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()
    question = data.get("question", "")

    if not question:
        return jsonify({"answer": "⚠️ Please provide a question."}), 400

    try:
        result = qa_pipeline(question=question, context=LEGAL_CONTEXT)
        return jsonify({"answer": result["answer"]})
    except Exception as e:
        return jsonify({"answer": f"❌ Error: {str(e)}"}), 500


#authentication
@app.route('/signup',methods=["POST"])



def signup():
    data=request.get_json()
    email=data.get('email')
    password=data.get('password')
    if users_collection.find_one({"email":email}):
        return jsonify({"message":"user already exists"}),400
    hashed_password=bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
    users_collection.insert_one({"email":email,"password":hashed_password})
    return jsonify({"message":"signup successuful"}),201


#Login auth

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user = users_collection.find_one({"email": email})
    print("User from DB:", user)
    print("Password provided:", password)
    print("Password matches:", bcrypt.checkpw(password.encode("utf-8"), user["password"]))


    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        token = jwt.encode(
            {
                "email": email,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
            },
            SECRET_KEY,
            algorithm="HS256",
        )
        return jsonify({"message": "Login successful", "token": token, "user": email}), 200

    return jsonify({"message": "Invalid credentials"}), 401
@app.route("/verify-token", methods=["POST"])
def verify_token():
    data = request.get_json()
    token = data.get("token", "")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return jsonify({"valid": True, "email": payload["email"]}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"valid": False, "error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"valid": False, "error": "Invalid token"}), 401
@app.route("/test-db")
def test_db():
    try:
        users = list(users_collection.find())
        return jsonify({"success": True, "users": [u['email'] for u in users]}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500







if __name__ == "__main__":
    app.run(debug=True)
