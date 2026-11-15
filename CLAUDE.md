# PROJECT BRIEF

This is the personal portfolio website of Anshumali Garg, an AI Agent Builder

Goal: Win cients who need AI Agents / Agentic AI Workflow. The webside must show what i build and get visitors to message me on Whatsapp or book a call 

Primary Audience: Business Decision makers across different industries

The one message a visitor must leave with: "This person builds production grade Agentic AI workflows/ AI Agents that can take repititive work of my team.

The one Action: Message me on Whatsapp, Secondary Action - Book a call with me

# CURRENT STATUS
Update this secion at the end of every working session

**Session 1 (2026-11-15): first build complete.**
- Static site, no build step (GitHub Pages ready): `index.html`, `css/styles.css`, `js/data.js`, `js/main.js`, `.nojekyll`, `assets/images/projects/` (empty, for screenshots).
- All sections built: fixed nav, hero with 3D swirling name ring, marquee strip, About (scroll word-highlight), Skills (drag/tap dial + holographic panel, auto-cycles), Projects (8-card carousel), Contact (liquid glass + Book-a-call form), footer.
- Content edits go in `js/data.js` (WhatsApp number, form endpoint, skills, projects). Search the codebase for `PLACEHOLDER`.
- Still needed from Anshumali: hero photo (`assets/images/profile.png`), 8 real projects, phone, email, office address, social links, Formspree endpoint (until set, the form opens WhatsApp pre-filled with the visitor's details).
- **Live:** https://agarg48.github.io/anshu-portfolio-website/ (repo `agarg48/anshu-portfolio-website`, GitHub Pages from `main` / root). Deploy = commit + `git push`; Pages rebuilds in ~1 min. Keep `css/`, `js/`, `assets/` folders in the repo — uploading only `index.html` breaks styling.
- Hero title changed (approved by Anshumali): pill now reads "AI Agent Builder · Agentic AI Workflows"; original title "Quantitative Trading Research | Global Financial Analyst" kept as a smaller subtitle under the name.

# SITE STRUCTURE

- Navigation Bar(fixed at top)
- Hero Section
- About me and Skills
- Projects
- Contact/CTA

# CONTENT

1. Hero:
Name: Anshumali Garg
Title: Quantitative Trading Research | Global Financial Analyst
Value Statement: Leveraging deep banking domain knowledge and technology expertise to simplify complex business processes, enable effective solutions, and drive operational excellence through collaboration and continuous improvement. 

One Primary Button - Whatsapp me with redirection link to my Whatsapp - +919910520685

Secondary Link - Book a call button with redirection to Form at the bottom

Image - Leave a clearly market placeholder for a photo, positioned as a Hero Image.

2. About me:
I bring a strong combination of banking domain expertise, business analysis capabilities, and Mainframe technology experience to deliver effective, business-driven solutions. I excel at translating complex business requirements into clear functional specifications, driving system enhancements, optimizing business processes, and bridging the gap between business stakeholders and technology teams. With a strong analytical mindset, collaborative approach, and focus on quality and operational excellence, I contribute to seamless solution delivery, improved operational efficiency, and enhanced customer experience while ensuring business objectives and regulatory requirements are met.

Skills: 
- Actively developing expertise in Agentic AI, AI-powered workflow orchestration, multi-agent systems, Large Language Models (LLMs), prompt engineering, and intelligent automation to identify opportunities for streamlining business processes, enhancing operational efficiency, and transforming traditional banking operations.
- Skilled in requirement engineering, functional specification development, stakeholder management, API analysis, workflow optimization, and translating complex banking requirements into scalable technology solutions.
- Experienced in Banking Business Analysis, Core Banking Operations, Mainframe Technology, and Digital Transformation, with a growing focus on Generative AI and Agentic AI capabilities.
- Generative AI, Large Language Models (LLMs), Prompt Engineering, Retrieval-Augmented Generation (RAG), AI-Assisted Documentation
- Agentic AI Concepts, AI Agents, Multi-Agent Systems, AI Workflow Orchestration, Autonomous Workflows, AI-Driven Process Automation
- Intelligent Automation, AI-Based Requirement Analysis, AI-Powered Testing, Process Optimization, Human-in-the-Loop Workflows

3. Projects:

This is the most important section of the website because the visitor will decide if he wants to work wiht me seeing my projects.

8 project cards. Each card contains:
Project name
One Line description
Tech Stack I used
Link of the Project

I have not yet supplied any real project as of now. Build all 8 cards with clearly market placeholder in the correct structure so that I can replace the text and imaged easily and more cards in future.

4. Contact/CTA Button

Whatsapp me with rediction link to my Whatsapp - +91-9910520685
Book a Call Form - Name, Phone Number, Email id and a brief of the requirement. 

# DESIGN RULES:

All design references are inside /references folder. Follow my instructions here and create the UI and visual design according to these:
1. Background theme- See the reference image background_theme.png and create a similar dark black modern background with light hues of different colors as seen in the reference. Ignore other elements like fonts, layout and design, just pick the  background color theme from the reference. 
2. Hero Section- See the reference image hero.png. Create hero section according to the reference. Leave a placeholder for putting my image on the right bottom of this hero section as seen in the reference image and instead of the PORTFOLIO Text, put my name - ANSHUMALI GARG. But for the name I want a motion andimation. I want a swirling rotating animation for this. in slow motion. See the references name_animation_1.pngand name_animation_2.png and analyse how it is rotating and create it like this,use same kind of Font. Make sure the anumation is smooth and looks aesthetically pleasing. It should come at the place of Text which is in the reference hero.png
3. About me- See the reference image about_me.png. That is a simple static reference image. See how can you make it look coherent to the rest of the design of the website and give life to it. 
4. Skills- Below the About me Section there should be a Skills section. I have placed the reference in the skills.png file. I  want to analyze it first. I want a futuristic tech animation where one click on those toughscreen looking cards with different icons based on my skills. Once that card is selected then on the right side the text content of the card should show as in the reference and gradually text fades in and fades out. But the problem is I have 2-3 lines of text content for one skill. So you need to see how can you present it better so it looks great and appropriate matching the standard of premium website. This is the main attraction of the website, make sure to design it critically and carefully. There should be a smooth overlay of this design with the background theme. Keep iterating until you are satisfied with the overall look and feel of this section. 
5. Contact/CTA section- Share a reference image as contact_me.png. Add a book a call form with Name, Emailid, Phone Number and Requirment in bried fields and leave placeholders for the Phone number, Office address, Social Media handles. Make sure the design is the liquid design as seen in the website.
6. Navigation  BAR- Create a Navigation Fixed Strip on your own matching the vibe of the website. 

One important note that you have to maintain the background design theme for the full website which I have shared. The other references which are there for different section they contain different background, So ignore the background of those other references, just see the layout visual desin as per the instruction above. Make sure to give proper contrast at appropriate places so that the sections looks good and according to the background. That should be poper readibility and placements of elements. 

# TECHNICAL CONSTRAINTS
- We will deploy the website on Github Pages. Make sure to follow the technical requirements according to github. 
Keep the code organised and commented so future changes are easy.
All placeholder must be clearly marked in the code so that they are easy to find and replace

Never invent content, clais or number or client names.
