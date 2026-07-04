import { IconType } from "react-icons"
import {
  FaMapMarkerAlt,
  FaLanguage,
  FaGamepad,
  FaUniversity,
  FaBuilding,
  FaTools,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaPlayCircle,
  FaLink,
  FaGoodreads,
  FaReddit,
  FaDribbble,
  FaStackOverflow,
} from "react-icons/fa"
import { FaBluesky, FaMoneyBills, FaXTwitter } from "react-icons/fa6"

/**
 * Configuration for the home page intro section
 */
export const homeIntroConfig = {
  /**
   * Number of work items to show in the preview sections on the home page.
   * Note that the actual number shown may be less if there aren't enough items.
   * If the actual number of items is larger than this, a "View All" link will be displayed.
   * This number must be a number greater than zero.
   */
  workItemsToShow: 3,

  /**
   * Number of projects to show in the preview sections on the home page.
   * Note that the actual number shown may be less if there aren't enough items.
   * If the actual number of items is larger than this, a "View All" link will be displayed.
   * This number must be a number greater than zero. We recommend keeping it low and
   * having a multiple of 2 for better grid layout (e.g., 2 or 4).
   */
  projectsToShow: 4,

  /**
   * Number of blog posts and projects to show in the preview sections on the home page.
   * Note that the actual number shown may be less if there aren't enough items.
   * If the actual number of items is larger than this, a "View All" link will be displayed.
   * This number must be a number greater than zero. We recommend keeping it low (=3) and
   * having a multiple of 3 for better grid layout.
   */
  blogPostsToShow: 3,
}

/**
 * Configuration for pagination settings within the site.
 */
export const paginationConfig = {
  /**
   * Number of blog posts to show per page for "/blog" and "/blog?page=n" routes.
   * This number must be a number greater than zero.
   */
  blogPostsPerPage: 5,

  /**
   * Number of work items to show per page for "/work" and "/work?page=n" routes.
   * This number must be a number greater than zero.
   */
  workItemsPerPage: 6,

  /**
   * Number of projects to show per page for "/projects" and "/projects?page=n" routes.
   * This number must be a number greater than zero.
   */
  projectsPerPage: 6,
}

/**
 * Configuration for the footer
 */
export const footerConfig = {
  /**
   * Social media links
   * Simply add your URLs below. Leave empty ("") to hide a social link.
   */
  socialLinks: {
    github: "https://github.com/eh3ankazemi",
    linkedin: "https://www.linkedin.com/in/eh3ankazemi",
    goodreads: "",
    instagram: "https://www.instagram.com/eh3ankazemi/",
    twitter: "https://x.com/eh3ankazemi",
    reddit: "",
    dribbble: "",
    youtube: "https://www.youtube.com/@eh3ankazemi",
    stackoverflow: "",
    bluesky: "",
    link: "https://links.ehsan-kazemi.ir/",
    call: "tel:+989212154476",
    email: "mailto:eh3ankazemii@gmail.com",
  },
}

// USERS DO NOT NEED TO MODIFY BELOW THIS LINE
// YOU CAN, HOWEVER, EXTEND THE ICON MAPS IF NEEDED

/**
 * Internal mapping of predefined fact categories to their icons
 * This is used internally by the HomeContent component - users don't need to modify this
 */
export const factIconMap: Record<string, IconType> = {
  company: FaBuilding,
  education: FaUniversity,
  location: FaMapMarkerAlt,
  languages: FaLanguage,
  role: FaTools,
  crypto:FaMoneyBills, 
  movie:FaPlayCircle, 
}

/**
 * Internal mapping of social platforms to their icons and labels
 * This is used internally by the Footer component - users don't need to modify this
 */
export const socialIconMap: Record<
  keyof typeof footerConfig.socialLinks,
  { icon: IconType; label: string }
> = {
  github: { icon: FaGithub, label: "GitHub" },
  linkedin: { icon: FaLinkedin, label: "LinkedIn" },
  goodreads: { icon: FaGoodreads, label: "GoodReads" },
  instagram: { icon: FaInstagram, label: "Instagram" },
  twitter: { icon: FaXTwitter, label: "X" },
  reddit: { icon: FaReddit, label: "Reddit" },
  dribbble: { icon: FaDribbble, label: "Dribbble" },
  youtube: { icon: FaYoutube, label: "YouTube" },
  bluesky: { icon: FaBluesky, label: "Bluesky" },
  stackoverflow: { icon: FaStackOverflow, label: "Stack Overflow" },
  link: { icon: FaLink, label: "LinkStack" },
  call: { icon: FaPhone, label: "Call" },
  email: { icon: FaEnvelope, label: "Email" },
}
