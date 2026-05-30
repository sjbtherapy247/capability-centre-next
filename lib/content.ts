/**
 * Static content sourced from the WordPress scrape (2026-05-30).
 * Will be migrated to Sanity once the project is initialised.
 */

export type ServiceCard = {
  slug: string
  title: string
  short: string
  long: string
  image?: string
}

export const services: ServiceCard[] = [
  {
    slug: 'leadership-strategy',
    title: 'Leadership & Strategy',
    short:
      'We delight in transforming managers into strategic, emotionally intelligent leaders.',
    long:
      'From new leaders to seasoned executives, we work shoulder-to-shoulder with your people to build the strategic perspective, emotional intelligence and decision-making muscle today\u2019s organisations demand.',
    image: '/images/iStock-146796597-845x321.jpg',
  },
  {
    slug: 'executive-coaching',
    title: 'Executive Coaching',
    short:
      'We unlock your genius through engaging, impactful 1:1 or group coaching sessions.',
    long:
      'Coaching is one of the most powerful business tools available to organisations today. Our coaching engagements are practical, confidential and outcome-focused \u2014 designed to lift leaders to the next level.',
    image: '/images/iStock-157424388-845x321.jpg',
  },
  {
    slug: 'business-consulting',
    title: 'Business Consulting',
    short:
      'Give us your toughest business challenge and we will help make change happen.',
    long:
      'Whether you need a strategic refresh, an operating model rethink or a hands-on transformation partner, we bring decades of frontline experience to your toughest business problems.',
    image: '/images/iStock-157562595-845x321.jpg',
  },
  {
    slug: 'team-development',
    title: 'Team Development',
    short:
      'Our interactive programs and diagnostics build positive team dynamics and performance.',
    long:
      'High-performing teams don\u2019t happen by accident. Our team programs use proven diagnostics and facilitated experiences to build trust, alignment and accountable execution.',
    image: '/images/iStock-172861621-1210x423.jpg',
  },
  {
    slug: 'peak-performance',
    title: 'Peak Performance',
    short:
      'Unlock the next level of capability and productivity with our range of tailored programs.',
    long:
      'Sustainable peak performance is built on mindset, habits and capability \u2014 not heroics. Our tailored programs combine evidence-based development with practical, in-flow application.',
    image: '/images/iStock-89285817-1210x423.jpeg',
  },
  {
    slug: 'sales-negotiation',
    title: 'Sales & Negotiation',
    short:
      'Whatever your sales challenge, we have the solution; from lead generation, to negotiation.',
    long:
      'Our ATTRACT Sales\u2122 methodology helps sales teams hit and exceed their objectives. From lead generation and pipeline to high-stakes negotiation, we build the skill and the system.',
    image: '/images/iStock-172856538-1266x430.jpg',
  },
]

export type Pillar = { title: string; body: string }

export const pillars: Pillar[] = [
  {
    title: 'Tailored Approach',
    body: 'We provide tailored solutions that tackle individual, team and organisation-wide opportunities.',
  },
  {
    title: 'Relevant Expertise',
    body: 'With extensive first-hand experience, we work with your people to solve real-life challenges.',
  },
  {
    title: 'Engage, Instil, Amplify',
    body: 'We offer executive coaching or mentoring to all attendees, to instil and amplify the learning.',
  },
  {
    title: 'Results & Accountability',
    body: 'We drive performance and measurable results and are never satisfied until you are.',
  },
]

export type HeroSlide = {
  eyebrow: string
  heading: string
  body: string
  image: string
}

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: 'Sales Performance',
    heading: 'Hit your numbers \u2014 and your team\u2019s potential.',
    body: 'Our ATTRACT Sales\u2122 methodology helps your sales team achieve all of its objectives and more.',
    image: '/images/iStock-146796597-2-1500x630.jpg',
  },
  {
    eyebrow: 'Executive Coaching',
    heading: 'One of the most powerful tools in business.',
    body: 'Coaching unlocks performance, perspective and presence \u2014 for leaders ready to grow.',
    image: '/images/iStock-172861621-1500x630.jpg',
  },
]

export type Testimonial = {
  quote: string
  author: string
  role: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Louise has a deep wealth of knowledge and wisdom into the complex transformational challenges facing organisations and their leaders today. The course I attended was a very effective model of delivering this insight into the development of supportive leadership skills. I have always found Louise to be extremely professional but also very approachable and she has always shown a high level of commitment and dedication to her work more than that which is commonly found. Over the period of the leadership course she has been a tremendous source of inspiration.',
    author: 'Julie Yaxley',
    role: 'Programme Board Manager',
    company: 'NHS',
  },
]

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  author: string
  tags: string[]
  body: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'unlocking-potential-energy',
    title: 'Unlocking Potential Energy',
    excerpt:
      'Effectiveness = motivation \u00d7 capability\u00b2. A theory of organisational relativity, with thanks to Einstein.',
    publishedAt: '2021-04-26',
    author: 'Louise Manning',
    tags: ['Einstein', 'Leadership'],
    body: [
      'Albert Einstein was undoubtedly one of the most influential physicists of our time and a number of his invaluable insights readily translate to the business world.',
      'According to Einstein: \u201cmost teachers waste their time by asking questions which are intended to discover what the pupil does not know.\u201d',
      'This is equivalent to the workplace manager who only focuses on the gaps in the knowledge of their staff. Often, these are the same managers who limit their questions to those to which they already know the answer.',
      'In my experience, employees and co-workers add the most value when we leverage their knowledge and expertise. It is by building on a person\u2019s strengths that we help them to achieve exceptional performance.',
      '\u201cThe true art of questioning has for its purpose to discover what the pupil knows or is capable of knowing.\u201d',
      'By seeking to discover and identify the knowledge and talents within a team, we can unlock potential. With targeted training, coaching and mentoring to build on and share this capability, we can deliver superior performance.',
      'Einstein\u2019s E=mc\u00b2 theory of relativity arose from his realisation that energy and matter are equivalent; i.e. energy can be transformed into matter and vice versa. He proved that the speed of light is the conversion factor showing how the link between energy and matter operates.',
      'I know much more about organisations than I do about physics and I wonder what Einstein would have thought of the following equation:',
      '**Effectiveness = motivation \u00d7 capability\u00b2**',
      'My theory of organisational relativity (E=mc\u00b2) proposes that effectiveness (at a team or personal level) and motivation are equivalent, at the rate of capability.',
    ],
  },
  {
    slug: 'thank-you-competitive-advantage',
    title: '\u201cThank You\u201d is a Competitive Advantage',
    excerpt:
      'A simple thank you has been shown to increase staff loyalty, productivity and satisfaction. So why do so few of us say it?',
    publishedAt: '2021-03-12',
    author: 'Louise Manning',
    tags: ['Gandhi', 'Team', 'Motivation'],
    body: [
      'When did life get too complicated for a simple thank you?',
      'A guy who looked to be in his mid-thirties dropped his wallet today outside our local Post Office. I picked it up and handed it back to him. Unless he was doing a psychological study, I can only assume that I did him a favour. But, I was greeted with a mere grunt that roughly translated as \u201currmph\u201d.',
      'Who would have thought that these simple words have become a point of difference and even a competitive advantage for those who use them?',
      '**A simple \u201cthank you\u201d has been shown to increase staff loyalty, productivity and satisfaction.**',
      'Only last week, I was training a course at Gloucestershire College, focussing on team motivation. All the well-researched findings of Herzberg aside, we realised that a sincere and appropriate thank you is a basic requirement for team motivation. No amount of focus on the motivation accelerators (recognition, achievement, satisfying work etc.) will overcome the brakes applied when this common courtesy is lacking.',
      'Gratitude is healthy for the mind.',
      'In the workplace, a simple \u201cthank you\u201d has been shown to increase staff loyalty, productivity and satisfaction. Moreover, incivility in the workplace can lead to people leaving, skipping work and even deliberately reducing their work quality and output. Yet over half of employees today say they are either never thanked or thanked just seldomly or occasionally!',
      'Mahatma Gandhi once said \u201cbe the change you want to see in the world.\u201d It\u2019s contagious. So, to anyone who\u2019s taken the time to read this post, all that remains is for me to say a genuine and heartfelt thank you!',
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getService(slug: string): ServiceCard | undefined {
  return services.find((s) => s.slug === slug)
}
