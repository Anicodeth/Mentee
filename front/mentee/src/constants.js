const globalIp = "http://192.168.135.214:5000";
// const localIp = "https://mentee-deployment-new-backend.vercel.app";
const localIp = "http://localhost:5000";
const baseApi = localIp;
const baseFrontApi = "http://localhost:3000" ;
const localLinks = [
  "Home",
  "Pricing",
  "About us",
  "Contact",
  "Mentors",
  "Lectures",
];
const socialLinks = ["Facebook", "Twitter", "Instagram", "LinkedIn"];
const infoLinks = ["privacy policy", "Terms Of Service"];
const defaultThumbnail = "https://altair.com/images/default-source/resource-images/antenna-optimization-machine-learning-thumbnail-jpg.jpg";
const defaultPersonProfile = "images/person_1.png";
export { globalIp, localIp, localLinks, socialLinks, infoLinks, baseFrontApi,baseApi,defaultThumbnail,defaultPersonProfile };
