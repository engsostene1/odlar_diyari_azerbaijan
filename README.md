# Odlar Diyarı

**Odlar Diyarı** means "Land of Fires" in Azerbaijani. It is a small travel website for Azerbaijan, written as if it were the site of a travel agency that wants visitors to fall in love with the country and book a trip. I built it as a web design assignment using only HTML, CSS and a little JavaScript. There are no frameworks, no libraries and nothing to install.

Azerbaijan earned its nickname from the natural gas flames that have burned on its hillsides for centuries, so the name and the fire theme run through the whole site, from the logo to the colours (blue, red and green, taken from the national flag).

> Odlar Diyarı is a made-up agency. The contact form does not send anything and the prices in the planner are only estimates.

---

## Contents

1. [Pages at a glance](#pages-at-a-glance)
2. [How each requirement is met](#how-each-requirement-is-met)
3. [Extra features](#extra-features)
4. [Project structure](#project-structure)
5. [How to run it](#how-to-run-it)
6. [Design decisions](#design-decisions)
7. [Accessibility and responsiveness](#accessibility-and-responsiveness)
8. [Known limitations](#known-limitations)
9. [Credits](#credits)

---

## Pages at a glance

| Page | File | What it is for |
|---|---|---|
| Home | `index.html` | Introduces Azerbaijan and the agency |
| Explore | `explore.html` | Attractions, culture, food and activities |
| Trip Planner | `planner.html` | Extra feature: a live budget calculator |
| About | `about.html` | About me: bio, skills and contact details |
| Contact | `contact.html` | Enquiry form with a confirmation message |

Every page shares the same header, navigation menu and footer, so visitors can reach any page from anywhere.

---

## How each requirement is met

### Home page (`index.html`)

| Requirement | How I did it |
|---|---|
| A unique and creative name | **Odlar Diyarı** ("Land of Fires"), shown in the header of every page next to a small flame logo (`images/favicon.svg`). |
| A welcoming headline and short introduction | The hero section opens with the headline "Where ancient fire meets the Caspian wind", followed by a short welcome that starts with *Salam* and explains what the site offers. Two buttons lead to the Explore page and the Trip Planner. |
| A brief description of the destination | The "About the destination" section says where Azerbaijan is, why it is called the Land of Fires, and how compact it is. A small grid of quick facts sits beside it (capital, population, area and currency). |
| An attractive banner or image | `images/hero-banner.svg` shows Baku at dusk: the Flame Towers, the Maiden Tower and the Old City walls on the Caspian shore. The image sits behind the headline with a dark gradient so the text stays readable. |
| A navigation menu linking to all pages | The sticky header lists Home, Explore, Trip Planner, About and Contact. The current page is highlighted. On phones the menu collapses behind a button. |
| At least three reasons to visit | Four cards: the fire that never goes out, medieval meets futuristic, tea and hospitality, and mountains, sea and plains. |
| A footer with relevant information | The footer has a short description, links to every page, practical tips (best months to visit, currency, driving side, e-visa reminder), a link to the Azerbaijan Tourism Board and the copyright line. |

Two additions on the home page that were not in the brief:

- **Sample journeys:** three short concept itineraries (Baku Classic, Silk Road to Sheki, Mountains and Tea) so the site feels like a real agency.
- **The story of Azerbaijan:** a seven-chapter history section (see [Extra features](#extra-features)).

### Explore page (`explore.html`)

| Requirement | How I did it |
|---|---|
| At least three tourist attractions | Four: the Old City and Maiden Tower in Baku, Gobustan, Yanar Dag with the fire temple, and Sheki Khan's Palace. |
| An image and short description for each | Each attraction has its own illustration (`old-city.svg`, `gobustan.svg`, `yanar-dag.svg`, `sheki.svg`), a short description and small tags such as "UNESCO" or "Hike". The layout alternates, with the picture on the left and then on the right. |
| Local culture, traditions or cuisine | A culture section covers Novruz, mugham music, carpets and tea. A second list covers five dishes: plov, dolma, qutab, piti and pakhlava. |
| At least two activities | Three activity cards: strolling Baku Boulevard, a plov cooking class, and hiking or skiing in the Caucasus. |
| At least one external link | A highlighted box links to the Azerbaijan Tourism Board and to UNESCO's World Heritage list for Azerbaijan. Both open in a new tab with `rel="noopener noreferrer"`. |

### About page (`about.html`)

| Requirement | How I did it |
|---|---|
| A brief bio | A short introduction next to my profile picture. |
| Technical and soft skills | Two separate lists shown as coloured tags: technical skills in navy and soft skills in red. |
| Email, social media and profile picture | A contact list with email, GitHub and LinkedIn, plus a round profile picture (`images/profile.svg`). Links to outside sites open in a new tab. |

### Contact page (`contact.html`)

| Requirement | How I did it |
|---|---|
| A simple form with name, email, a short message and other relevant details | The form has eleven fields, grouped into three sections: *About you*, *Your trip* and *Your message*. |
| Explore different input types | See the table below. |
| Decide which fields are required | Five fields are required: full name, email, enquiry topic, message and the consent checkbox. The rest are optional because they only help the adviser tailor the reply. |
| A message after submitting | When the form is valid, a green panel appears and moves focus to itself. It thanks the visitor by name, repeats the topic and email, and lists what happens next (a confirmation email straight away and a reply within two working days). It also states that this demo has no server. |

Input types used on the form:

| Field | Input type | Required? | Validation |
|---|---|---|---|
| Full name | `text` | Yes | 2 to 80 characters |
| Email address | `email` | Yes | Browser checks the format |
| Phone | `tel` | No | Digits, spaces, `+`, `-` and brackets only |
| Enquiry topic | `select` | Yes | The first option is empty so a choice must be made |
| Planned arrival date | `date` | No | Past dates are blocked by JavaScript |
| Number of travellers | `number` | No | 1 to 20 |
| Travel style | `radio` | No | Four choices, one pre-selected |
| Budget per person | `range` | No | USD 500 to 5,000; the label updates as you drag |
| Interests | `checkbox` group | No | Four choices, tick any |
| Message | `textarea` | Yes | 10 to 1,000 characters |
| Consent | `checkbox` | Yes | Must be ticked |

Validation uses the browser's built-in rules. When something is wrong, the browser shows its own error bubble next to the field. The confirmation message is written with `textContent` instead of `innerHTML`, so whatever a visitor types can never be injected into the page as HTML.

---

## Extra features

### 1. Trip Planner (`planner.html`)

This is the additional page. The visitor chooses the number of nights, number of travellers, hotel type and any activities, and the estimated cost updates instantly, without a button or page reload. The results panel breaks the total into accommodation, food, local transport and activities, and also shows the cost per person.

How the maths works (all values are in `js/script.js`):

- Rooms = travellers divided by two, rounded up.
- Accommodation = nightly room price × nights × rooms.
- Food = daily food cost × (nights + 1) × travellers.
- Transport = daily transport cost × (nights + 1).
- Activities = activity price × travellers.

Room prices per night: guesthouse USD 35, mid-range USD 90, luxury USD 250. Food is USD 22 per person per day and transport USD 15 per day. These figures are my own rough estimates for demonstration, and the page says so.

### 2. The story of Azerbaijan (home page)

A seven-chapter history section placed after the destination description. The chapters run from the Stone Age to modern independence: ancient roots, faith and dynasties, the Turkic and poetic age, Safavids and khanates, Russian rule and the oil boom, the first republic and the Soviet era, and independence today. Small buttons at the top jump straight to any chapter.

Each event is a **picture card**. The year sits on the picture, and hovering over the card lifts it, zooms the picture and slides the text up over it. On phones and touch screens there is no hover, so the picture sits above the text and everything is visible at once. Keyboard users can tab to a card to reveal its text.

### 3. Small touches

- Mobile menu that opens and closes with a button.
- Footer year that updates itself.
- A skip link at the top of each page for keyboard and screen reader users.

---

## Project structure

```
odlar-diyari/
├── index.html
├── explore.html
├── planner.html
├── about.html
├── contact.html
├── README.md
├── Sources_Credits.pdf       sources and credits
├── Project_Explained.xlsx    spreadsheet explaining the project
├── css/
│   └── style.css             all styling, split into numbered sections
├── js/
│   └── script.js             menu, form handling and planner maths
└── images/
    ├── hero-banner.svg       home page banner
    ├── old-city.svg          Explore: Old City and Maiden Tower
    ├── gobustan.svg          Explore: Gobustan
    ├── yanar-dag.svg         Explore: Yanar Dag
    ├── sheki.svg             Explore: Sheki Khan's Palace
    ├── caucasian-albania.svg history cards
    ├── poetry.svg            history cards
    ├── oil.svg               history cards
    ├── republic.svg          history cards
    ├── profile.svg           profile picture (placeholder)
    └── favicon.svg           logo and browser tab icon
```

`css/style.css` is organised into numbered sections (design tokens, base styles, layout, header, hero, cards, Explore, About, forms, planner, footer, utilities, responsive rules, history timeline and picture cards), so it is easy to find what to change.

---

## How to run it

There is nothing to install or build.

**Option 1: open the file.** Double-click `index.html`. It opens in your default browser.

**Option 2: VS Code with Live Server (what I used while building).**
1. Open the project folder in VS Code (File → Open Folder).
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**. The page reloads every time you save.

**Option 3: a local server.** From the project folder, run `python3 -m http.server 8000` and visit `http://localhost:8000`.

### Using your own photos

Everything currently uses SVG illustrations. To swap in a real photo, save it inside `images/` with a lowercase name and no spaces, then point to it with a relative path:

```html
<img src="images/baku-old-city.jpg" alt="A short description of the photo">
```

Always use copyright-free photos and add them to the sources document.

---

## Design decisions

- **Colours:** blue, red and green come from the Azerbaijani flag, with a warm sand background and a dark navy for text and the header. All colours are CSS variables at the top of `style.css`, so the whole palette can be changed in one place.
- **Typography:** system font stacks only (Georgia for headings, Segoe UI and similar for body text). Nothing is downloaded, so pages load quickly and there is no third-party tracking.
- **Illustrations:** SVG images stay sharp at any size and are very small files. I drew them as code instead of using stock photos, so there are no licence problems.
- **Plain JavaScript:** the scripts are short and do only three jobs (the menu, the form message and the planner), so no library was needed.

---

## Accessibility and responsiveness

- Semantic HTML: `header`, `nav`, `main`, `section`, `article`, `footer` and a sensible heading order.
- Descriptive `alt` text on every meaningful image. Decorative images use an empty `alt`.
- Every form field has a visible `<label>`, related fields are grouped with `<fieldset>` and `<legend>`, and required fields are marked.
- The confirmation message and planner results use `aria-live`, so screen readers announce them.
- Clear focus outlines, a skip link, and keyboard access to the history cards.
- Animations are switched off for visitors who have asked their device for reduced motion.
- The layout uses CSS Grid and Flexbox, and I checked it down to phone width (about 390 px) with no sideways scrolling.

---

## Known limitations

- **The contact form has no back end.** It only shows the confirmation message and nothing is sent or saved. To make it real, point the form's `action` at a form service or my own server.
- **Planner prices are estimates**, not real quotes. Flights and visa fees are not included.
- **The profile picture and contact links on the About page are placeholders** until I replace them with my real details.
- **Travel information changes.** Visa rules, seasons and prices should always be checked with official sources before a real trip.
- The history section is a short overview. Different people tell these events differently, so it should not be treated as a full academic account.

---

## Credits

All images are original SVG illustrations created for this project. No third-party code snippets, fonts or libraries are used. Facts about Azerbaijan come from public sources, rewritten in my own words. Full details, including the history sources, are in `Sources_Credits.pdf`.

External resources linked from the site:

- Azerbaijan Tourism Board: https://tourismboard.az
- UNESCO World Heritage, Azerbaijan: https://whc.unesco.org/en/statesparties/az