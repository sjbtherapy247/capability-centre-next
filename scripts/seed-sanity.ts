/* eslint-disable no-console */
/**
 * Seed the Sanity dataset with content from the WordPress scrape (2026-05-30).
 *
 * Idempotent: uses fixed `_id`s and `transaction().createOrReplace()` so
 * re-running the script will overwrite existing seeded documents.
 *
 * Run with:
 *   npx tsx scripts/seed-sanity.ts
 *
 * Requires `.env.local` with:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN  (Editor+, write scope)
 */

import 'dotenv/config'
import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID missing in .env.local')
  console.error('   Run `npx sanity@latest init --env=.env.local` first.')
  process.exit(1)
}
if (!token) {
  console.error('❌ SANITY_API_TOKEN missing in .env.local')
  console.error('   Create one at https://www.sanity.io/manage with Editor permissions.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
})

const IMAGES_DIR = path.resolve(process.cwd(), 'public', 'images')

/** Upload an image (if local), return Sanity image ref structure. */
async function uploadImage(filename: string, alt?: string) {
  const full = path.join(IMAGES_DIR, filename)
  if (!fs.existsSync(full)) {
    console.warn(`⚠️  Image not found, skipping: ${filename}`)
    return undefined
  }
  // Re-use existing asset with this filename if present (idempotent uploads).
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type=="sanity.imageAsset" && originalFilename == $f][0]{_id}`,
    { f: filename },
  )
  let assetId: string
  if (existing?._id) {
    assetId = existing._id
    console.log(`   ↻ Reusing image: ${filename}`)
  } else {
    const buffer = fs.readFileSync(full)
    const asset = await client.assets.upload('image', buffer, { filename })
    assetId = asset._id
    console.log(`   ⬆ Uploaded image: ${filename}`)
  }
  return {
    _type: 'image' as const,
    asset: { _type: 'reference', _ref: assetId },
    alt,
  }
}

async function main() {
  console.log(`\n🌱 Seeding Sanity — project=${projectId} dataset=${dataset}\n`)

  // -------- Images
  console.log('📸 Images...')
  const [
    hero1,
    hero2,
    imgLeadership,
    imgCoaching,
    imgConsulting,
    imgTeam,
    imgPeak,
    imgSales,
  ] = await Promise.all([
    uploadImage('iStock-146796597-2-1500x630.jpg', 'Leadership training session'),
    uploadImage('iStock-172861621-1500x630.jpg', 'Executive coaching conversation'),
    uploadImage('iStock-146796597-845x321.jpg', 'Leadership & strategy'),
    uploadImage('iStock-157424388-845x321.jpg', 'Executive coaching'),
    uploadImage('iStock-157562595-845x321.jpg', 'Business consulting'),
    uploadImage('iStock-172861621-1210x423.jpg', 'Team development'),
    uploadImage('iStock-89285817-1210x423.jpeg', 'Peak performance'),
    uploadImage('iStock-172856538-1266x430.jpg', 'Sales & negotiation'),
  ])

  // -------- Site Settings (singleton)
  console.log('\n⚙️  Site settings...')
  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Capability Centre',
    tagline: 'Building capability in people, teams and organisations.',
    description:
      'Executive coaching, leadership development and business consulting — designed to lift performance where it counts.',
    contactEmail: 'hello@capabilitycentre.com.au',
    address: 'Sydney, Australia',
    officeHours: [
      { _key: 'h1', label: 'Mon–Fri', open: '9am', close: '5pm', closed: false },
      { _key: 'h2', label: 'Sat–Sun', closed: true },
    ],
    navigation: [
      { _key: 'n1', label: 'About', href: '/about' },
      { _key: 'n2', label: 'Services', href: '/services' },
      { _key: 'n3', label: 'Blog', href: '/blog' },
      { _key: 'n4', label: 'Contact', href: '/contact' },
    ],
    ctaLabel: 'Book a Call',
    ctaHref: '/book',
    footerTagline:
      'Executive coaching, leadership development and business consulting — building capability in people, teams and organisations.',
  }

  // -------- Testimonial
  console.log('💬 Testimonials...')
  const testimonialJulie = {
    _id: 'testimonial.julie-yaxley',
    _type: 'testimonial',
    quote:
      'Louise has a deep wealth of knowledge and wisdom into the complex transformational challenges facing organisations and their leaders today. The course I attended was a very effective model of delivering this insight into the development of supportive leadership skills. I have always found Louise to be extremely professional but also very approachable and she has always shown a high level of commitment and dedication to her work more than that which is commonly found. Over the period of the leadership course she has been a tremendous source of inspiration.',
    author: 'Julie Yaxley',
    role: 'Programme Board Manager',
    company: 'NHS',
    order: 1,
    featured: true,
  }

  // -------- Services
  console.log('🛠  Services...')
  const services = [
    {
      _id: 'service.leadership-strategy',
      _type: 'service',
      title: 'Leadership & Strategy',
      slug: { _type: 'slug', current: 'leadership-strategy' },
      shortDescription:
        'We delight in transforming managers into strategic, emotionally intelligent leaders.',
      longDescription:
        'From new leaders to seasoned executives, we work shoulder-to-shoulder with your people to build the strategic perspective, emotional intelligence and decision-making muscle today’s organisations demand.',
      image: imgLeadership,
      order: 1,
    },
    {
      _id: 'service.executive-coaching',
      _type: 'service',
      title: 'Executive Coaching',
      slug: { _type: 'slug', current: 'executive-coaching' },
      shortDescription:
        'We unlock your genius through engaging, impactful 1:1 or group coaching sessions.',
      longDescription:
        'Coaching is one of the most powerful business tools available to organisations today. Our coaching engagements are practical, confidential and outcome-focused — designed to lift leaders to the next level.',
      image: imgCoaching,
      order: 2,
    },
    {
      _id: 'service.business-consulting',
      _type: 'service',
      title: 'Business Consulting',
      slug: { _type: 'slug', current: 'business-consulting' },
      shortDescription:
        'Give us your toughest business challenge and we will help make change happen.',
      longDescription:
        'Whether you need a strategic refresh, an operating model rethink or a hands-on transformation partner, we bring decades of frontline experience to your toughest business problems.',
      image: imgConsulting,
      order: 3,
    },
    {
      _id: 'service.team-development',
      _type: 'service',
      title: 'Team Development',
      slug: { _type: 'slug', current: 'team-development' },
      shortDescription:
        'Our interactive programs and diagnostics build positive team dynamics and performance.',
      longDescription:
        'High-performing teams don’t happen by accident. Our team programs use proven diagnostics and facilitated experiences to build trust, alignment and accountable execution.',
      image: imgTeam,
      order: 4,
    },
    {
      _id: 'service.peak-performance',
      _type: 'service',
      title: 'Peak Performance',
      slug: { _type: 'slug', current: 'peak-performance' },
      shortDescription:
        'Unlock the next level of capability and productivity with our range of tailored programs.',
      longDescription:
        'Sustainable peak performance is built on mindset, habits and capability — not heroics. Our tailored programs combine evidence-based development with practical, in-flow application.',
      image: imgPeak,
      order: 5,
    },
    {
      _id: 'service.sales-negotiation',
      _type: 'service',
      title: 'Sales & Negotiation',
      slug: { _type: 'slug', current: 'sales-negotiation' },
      shortDescription:
        'Whatever your sales challenge, we have the solution; from lead generation, to negotiation.',
      longDescription:
        'Our ATTRACT Sales™ methodology helps sales teams hit and exceed their objectives. From lead generation and pipeline to high-stakes negotiation, we build the skill and the system.',
      image: imgSales,
      order: 6,
    },
  ]

  // -------- Home page singleton
  console.log('🏠 Home page...')
  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    seo: {
      metaTitle:
        'Capability Centre — Executive Coaching, Leadership & Business Consulting',
      metaDescription:
        'Capability Centre provides executive training, coaching, mentoring and consulting for individuals and businesses.',
    },
    heroSlides: [
      {
        _key: 'slide1',
        eyebrow: 'Sales Performance',
        heading: 'Hit your numbers — and your team’s potential.',
        body: 'Our ATTRACT Sales™ methodology helps your sales team achieve all of its objectives and more.',
        image: hero1,
      },
      {
        _key: 'slide2',
        eyebrow: 'Executive Coaching',
        heading: 'One of the most powerful tools in business.',
        body: 'Coaching unlocks performance, perspective and presence — for leaders ready to grow.',
        image: hero2,
      },
    ],
    servicesSection: {
      eyebrow: 'What we do',
      heading: 'Services tailored to grow capability.',
      body: 'Whatever your starting point, our work begins with understanding what you and your people need to thrive — then designing a path to get you there.',
      services: services.map((s) => ({ _type: 'reference', _ref: s._id, _key: `ref-${s._id}` })),
    },
    pillarsSection: {
      eyebrow: 'Why us',
      heading: 'Built on four foundations.',
      pillars: [
        { _key: 'p1', title: 'Tailored Approach', body: 'We provide tailored solutions that tackle individual, team and organisation-wide opportunities.' },
        { _key: 'p2', title: 'Relevant Expertise', body: 'With extensive first-hand experience, we work with your people to solve real-life challenges.' },
        { _key: 'p3', title: 'Engage, Instil, Amplify', body: 'We offer executive coaching or mentoring to all attendees, to instil and amplify the learning.' },
        { _key: 'p4', title: 'Results & Accountability', body: 'We drive performance and measurable results and are never satisfied until you are.' },
      ],
    },
    testimonialsSection: {
      eyebrow: 'What clients say',
      testimonials: [
        { _type: 'reference', _ref: testimonialJulie._id, _key: 'ref-julie' },
      ],
    },
    ctaSection: {
      heading: 'Ready to build capability that lasts?',
      body: 'Book a no-obligation conversation with Louise and let’s see if we’re a fit.',
      ctaLabel: 'Book a Call',
      ctaHref: '/book',
    },
  }

  // -------- Simple pages (About, Book, Contact)
  console.log('📄 Simple pages...')
  const aboutPage = {
    _id: 'page.about',
    _type: 'page',
    title: 'About',
    slug: { _type: 'slug', current: 'about' },
    seo: {
      metaTitle: 'About',
      metaDescription:
        'Meet Louise — the executive coach, leadership facilitator and consultant behind Capability Centre.',
    },
    hero: {
      eyebrow: 'About',
      heading: 'Meet Louise.',
      subheading:
        'Executive coach, leadership facilitator and consultant — building capability in people, teams and organisations.',
    },
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'b1c1',
            _type: 'span',
            text: 'Louise founded Capability Centre to do one thing well: build genuine capability in the people and teams she works with. Over many years across leadership, coaching, sales and transformation, she has worked alongside executives and front-line teams in the UK and Australia — from the NHS to professional services and high-growth businesses.',
            marks: [],
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'b2c1',
            _type: 'span',
            text: 'Her work blends rigorous methodology with genuine warmth. She believes the best performance unlocks when people are met where they are — and supported to grow into who they want to become.',
            marks: [],
          },
        ],
      },
    ],
  }

  const bookPage = {
    _id: 'page.book',
    _type: 'page',
    title: 'Book a Call',
    slug: { _type: 'slug', current: 'book' },
    seo: {
      metaTitle: 'Book a Call',
      metaDescription:
        'Book a call with Louise. She will help you understand how you can get to the next level in your career.',
    },
    hero: {
      eyebrow: 'Book a call',
      heading: 'Let’s talk about where you’re headed.',
      subheading:
        'Are you looking to improve your sales technique or your leadership style so you can improve your pay-check or business’ bottom line? Book a call and tell Louise where you’re currently at — she’ll recommend what you need to get to the next level.',
    },
    sidebar: {
      heading: 'Common focus areas',
      items: [
        'Sales Training',
        'FastTrack Leader™ Program',
        '1:1 Sales Coaching',
        'Executive Coaching',
        'Team Performance',
      ],
    },
  }

  const contactPage = {
    _id: 'page.contact',
    _type: 'page',
    title: 'Contact',
    slug: { _type: 'slug', current: 'contact' },
    seo: { metaTitle: 'Contact', metaDescription: 'Get in touch with Capability Centre.' },
    hero: {
      eyebrow: 'Contact',
      heading: 'Get in touch.',
      subheading:
        'Have a question, a brief or a challenge you want a hand with? Send us a note.',
    },
  }

  // -------- Blog posts
  console.log('📝 Blog posts...')
  const blogUnlocking = {
    _id: 'blogPost.unlocking-potential-energy',
    _type: 'blogPost',
    title: 'Unlocking Potential Energy',
    slug: { _type: 'slug', current: 'unlocking-potential-energy' },
    excerpt:
      'Effectiveness = motivation × capability². A theory of organisational relativity, with thanks to Einstein.',
    publishedAt: '2021-04-26T09:00:00.000Z',
    author: 'Louise Manning',
    tags: ['Einstein', 'Leadership'],
    body: [
      'Albert Einstein was undoubtedly one of the most influential physicists of our time and a number of his invaluable insights readily translate to the business world.',
      'According to Einstein: “most teachers waste their time by asking questions which are intended to discover what the pupil does not know.”',
      'This is equivalent to the workplace manager who only focuses on the gaps in the knowledge of their staff. Often, these are the same managers who limit their questions to those to which they already know the answer.',
      'In my experience, employees and co-workers add the most value when we leverage their knowledge and expertise. It is by building on a person’s strengths that we help them to achieve exceptional performance.',
      '“The true art of questioning has for its purpose to discover what the pupil knows or is capable of knowing.”',
      'By seeking to discover and identify the knowledge and talents within a team, we can unlock potential. With targeted training, coaching and mentoring to build on and share this capability, we can deliver superior performance.',
      'Einstein’s E=mc² theory of relativity arose from his realisation that energy and matter are equivalent; i.e. energy can be transformed into matter and vice versa. He proved that the speed of light is the conversion factor showing how the link between energy and matter operates.',
      'I know much more about organisations than I do about physics and I wonder what Einstein would have thought of the following equation:',
      ['Effectiveness = motivation × capability²', 'strong'] as const,
      'My theory of organisational relativity (E=mc²) proposes that effectiveness (at a team or personal level) and motivation are equivalent, at the rate of capability.',
    ].map(toBlock),
  }

  const blogThankYou = {
    _id: 'blogPost.thank-you-competitive-advantage',
    _type: 'blogPost',
    title: '“Thank You” is a Competitive Advantage',
    slug: { _type: 'slug', current: 'thank-you-competitive-advantage' },
    excerpt:
      'A simple thank you has been shown to increase staff loyalty, productivity and satisfaction. So why do so few of us say it?',
    publishedAt: '2021-03-12T09:00:00.000Z',
    author: 'Louise Manning',
    tags: ['Gandhi', 'Team', 'Motivation'],
    body: [
      'When did life get too complicated for a simple thank you?',
      'A guy who looked to be in his mid-thirties dropped his wallet today outside our local Post Office. I picked it up and handed it back to him. Unless he was doing a psychological study, I can only assume that I did him a favour. But, I was greeted with a mere grunt that roughly translated as “urrmph”.',
      'Who would have thought that these simple words have become a point of difference and even a competitive advantage for those who use them?',
      ['A simple “thank you” has been shown to increase staff loyalty, productivity and satisfaction.', 'strong'] as const,
      'Only last week, I was training a course at Gloucestershire College, focussing on team motivation. All the well-researched findings of Herzberg aside, we realised that a sincere and appropriate thank you is a basic requirement for team motivation. No amount of focus on the motivation accelerators (recognition, achievement, satisfying work etc.) will overcome the brakes applied when this common courtesy is lacking.',
      'Gratitude is healthy for the mind.',
      'In the workplace, a simple “thank you” has been shown to increase staff loyalty, productivity and satisfaction. Moreover, incivility in the workplace can lead to people leaving, skipping work and even deliberately reducing their work quality and output. Yet over half of employees today say they are either never thanked or thanked just seldomly or occasionally!',
      'Mahatma Gandhi once said “be the change you want to see in the world.” It’s contagious. So, to anyone who’s taken the time to read this post, all that remains is for me to say a genuine and heartfelt thank you!',
    ].map(toBlock),
  }

  // -------- Transaction
  console.log('\n💾 Writing transaction...')
  const tx = client.transaction()
  ;[
    siteSettings,
    testimonialJulie,
    ...services,
    homePage,
    aboutPage,
    bookPage,
    contactPage,
    blogUnlocking,
    blogThankYou,
  ].forEach((doc) => {
    tx.createOrReplace(doc)
  })

  const res = await tx.commit({ visibility: 'async' })
  console.log(`✅ Committed transaction id=${res.transactionId}`)
  console.log(`   Documents created/replaced: ${res.results.length}`)
  console.log('\n🎉 Seed complete. Run `npm run dev` and visit http://localhost:3000/\n')
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

let blockCounter = 0

type BlockInput = string | readonly [string, 'strong']

function toBlock(input: BlockInput) {
  blockCounter += 1
  const id = `b${blockCounter}`
  if (Array.isArray(input)) {
    const [text, mark] = input
    return {
      _key: id,
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: `${id}c1`,
          _type: 'span',
          text,
          marks: [mark],
        },
      ],
    }
  }
  return {
    _key: id,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: `${id}c1`,
        _type: 'span',
        text: input,
        marks: [],
      },
    ],
  }
}

main().catch((err) => {
  console.error('\n❌ Seed failed:', err)
  process.exit(1)
})
