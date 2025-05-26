import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";
import Stats from "@/components/client-view/stats";
import Courses from "@/components/client-view/Courses"
import Image from "next/image";

async function extractAllDatas(currentSection) {
  const res = await fetch(`https://akdukeyhere.vercel.app/api/${currentSection}/get`, {
    method: "GET",
    cache: "no-store"
  });
  const data = await res.json();
  return data && data.data;
}

export default async function Home() {
  // Fetch all data in parallel instead of sequentially
  const [
    homeSectionData,
    aboutSectionData,
    experienceSectionData,
    educationSectionData,
    projectSectionData,
    stats,
    courses
  ] = await Promise.all([
    extractAllDatas("home"),
    extractAllDatas("about"),
    extractAllDatas("experience"),
    extractAllDatas("education"),
    extractAllDatas("project"),
    extractAllDatas("stats"),
    extractAllDatas("Courses")
  ]);

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