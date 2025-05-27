import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";
import Stats from "@/components/client-view/stats";
import Blogs from "@/components/client-view/Courses";

async function extractAllDatas(currentSection) {
  try {
    // Use environment variable or relative URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://akdukeyhere.vercel.app';
    
    const res = await fetch(`${baseUrl}/api/${currentSection}/get`, {
      method: "GET",
      cache: "no-store",
      // Add timeout
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${currentSection}: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data && data.data;
  } catch (error) {
    console.error(`Error fetching ${currentSection}:`, error.message);
    return null;
  }
}

export default async function Home() {
  // Fetch all data with error handling
  const [
    homeSectionData,
    aboutSectionData,
    experienceSectionData,
    educationSectionData,
    projectSectionData,
    stats,
    blog
  ] = await Promise.allSettled([
    extractAllDatas("home"),
    extractAllDatas("about"),
    extractAllDatas("experience"),
    extractAllDatas("education"),
    extractAllDatas("project"),
    extractAllDatas("stats"),
    extractAllDatas("Courses")
  ]);

  // Extract successful results, use null for failed ones
  const getData = (result) => result.status === 'fulfilled' ? result.value : null;

  return (
    <div>
      <ClientHomeView data={getData(homeSectionData)} />
      <ClientAboutView data={
        getData(aboutSectionData) && getData(aboutSectionData).length 
          ? getData(aboutSectionData)[0] 
          : []
      } />
      <ClientExperienceAndEducationView  
        educationData={getData(educationSectionData)} 
        experienceData={getData(experienceSectionData)}  
      />
      <ClientProjectView data={getData(projectSectionData)} />
      <ClientContactView/>
      <Stats data={getData(stats)}/>
      <Blogs data = {getData(blog)}/>
    </div>
  );
}