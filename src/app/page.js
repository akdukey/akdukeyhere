import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";
import Stats from "@/components/client-view/stats";
import Courses from "@/components/client-view/Courses"
import Image from "next/image";

async function extractAllDatas(currentSection) {
  try {
    const res = await fetch(`https://akdukeyhere.vercel.app/api/${currentSection}/get`, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return data && data.data;
  } catch (error) {
    console.error(`Error fetching ${currentSection}:`, error);
    return null; // Return null instead of throwing to prevent complete failure
  }
}

export default async function Home() {
  // Use Promise.allSettled to handle partial failures gracefully
  const results = await Promise.allSettled([
    extractAllDatas("home"),
    extractAllDatas("about"),
    extractAllDatas("experience"),
    extractAllDatas("education"),
    extractAllDatas("project"),
    extractAllDatas("stats"),
    extractAllDatas("Courses")
  ]);

  // Extract data from settled promises
  const [
    homeSectionData,
    aboutSectionData,
    experienceSectionData,
    educationSectionData,
    projectSectionData,
    stats,
    courses
  ] = results.map(result => result.status === 'fulfilled' ? result.value : null);

  return (
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView data={ 
        aboutSectionData && aboutSectionData.length ? aboutSectionData[0] : []
      } />
      <ClientExperienceAndEducationView  
        educationData={educationSectionData} 
        experienceData={experienceSectionData}  
      />
      <ClientProjectView data={projectSectionData} />
      <ClientContactView/>
      <Stats data={stats}/>
      <Courses data={courses}/>
      <div className="h-[10vh] w-full bg-transparent"></div>
    </div>
  );
}