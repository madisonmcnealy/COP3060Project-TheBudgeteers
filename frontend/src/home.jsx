import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            {/* HERO / LANDING SECTION */}
            <section className="home-hero page-card">
                <div className="home-hero-text">
                    <p className="hero-kicker">Welcome to</p>
                    <h1 className="hero-title">The Budgeteers</h1>
                    <p className="hero-tagline">Student Budget Tracker</p>

                    <p className="hero-subtitle">
                        A simple, privacy-friendly way for college students to track
                        expenses, visualize trends, and build healthier money habits —
                        without connecting a bank account.
                    </p>

                    <div className="hero-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/form")}
                        >
                            Add an Expense
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate("/data")}
                        >
                            View My Spending
                        </button>
                    </div>

                    <div className="hero-pill-row">
                        <span className="hero-pill">No bank login required</span>
                        <span className="hero-pill">Made for college students</span>
                        <span className="hero-pill">Track habits, not just numbers</span>
                    </div>
                </div>

                <div className="home-hero-card">
                    <h3 className="mini-card-title">This month at a glance</h3>
                    <ul className="mini-metrics">
                        <li>
                            <span className="metric-label">Total spent</span>
                            <span className="metric-value">$0.00</span>
                        </li>
                        <li>
                            <span className="metric-label">Categories tracked</span>
                            <span className="metric-value">0</span>
                        </li>
                        <li>
                            <span className="metric-label">Last expense added</span>
                            <span className="metric-value">–</span>
                        </li>
                    </ul>
                    <p className="mini-card-caption">
                        Start logging expenses to see live stats and charts on your data
                        page.
                    </p>
                </div>
            </section>

            {/* FEATURE CARDS */}
            <section className="home-grid">
                <div className="feature-card">
                    <h3>Track what matters</h3>
                    <p>
                        Capture everyday expenses like food, textbooks, rent, and social
                        events so you always know where your money is going.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>See where it goes</h3>
                    <p>
                        Use simple tables and charts to spot spending trends, busy weeks,
                        and categories that are eating your budget.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Build better habits</h3>
                    <p>
                        Turn small insights into better decisions — set informal spending
                        limits, plan ahead, and avoid end-of-month surprises.
                    </p>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="home-steps page-card">
                <h2 className="section-title">How it works</h2>
                <ol className="step-list">
                    <li>
                        <strong>Add expenses</strong> – log what you spend in just a few
                        clicks.
                    </li>
                    <li>
                        <strong>Review your data</strong> – check totals, categories, and
                        charts on the data page.
                    </li>
                    <li>
                        <strong>Adjust your budget</strong> – use what you see to set goals
                        and stay on track.
                    </li>
                </ol>
            </section>

            <footer className="home-footer-note">
                <p>
                    © 2025 The Budgeteers – Student Budget Tracker. Built for students,
                    by students.
                </p>
            </footer>
        </div>
    );
}

