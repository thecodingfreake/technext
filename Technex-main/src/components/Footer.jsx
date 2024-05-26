import React from "react"
import Logo from "../assets/logo.png"

export default function Footer () {
    return(
        <div className="footerSection">
            <div className="footerTop">
                <div className="footerLeft">
                    <img src={Logo} alt="logo" />
                    <p>Prepare for the exam with our comprehensive mock exams. Practice essential skills and improve your test-taking abilities with our curated questions and detailed explanations.</p>
                </div>
                <div className="footerRight">
                    <h3>Support team</h3>
                    <h4>....</h4>
                    <h4>....<br />Mail: ....</h4>
                </div>
            </div>
            <div className="footerBottom">
                <h4>Copyright © 2024 CIT-QUEST | Powered by Flanzer</h4>
            </div>
        </div>
    )
}