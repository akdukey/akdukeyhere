import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";
import Stats from "@/components/client-view/stats";
import Courses from "@/components/client-view/Courses"
import { Suspense } from "react";

// Optimized fetch with connection pooling and timeout
const fetchWithTimeout = async (url, timeout = 8000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "force-cache", // Cache for 1 hour
      next: { revalidate: 3600 },
      signal: controller.signal,
      headers: {
        'Connection': 'keep-alive',
        'Keep-Alive': 'timeout=5, max=1000'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn(`Failed to fetch ${url}:`, error.message);
    return { data: null };
  }
};

// Single API call to get all data at once
async function extractAllData() {
  const baseUrl = "https://akdukeyhere.vercel.app/api";
  
  // Try to fetch from a combined endpoint first (if you create one)
  try {
    const combinedRes = await fetchWithTimeout(`${baseUrl}/all-data/get`);
    if (combinedRes && combinedRes.success) {
      return combinedRes.data;
    }
  } catch (error) {
    // Fall back to individual calls if combined endpoint doesn't exist
  }
  
  // Parallel fetch with reduced timeout for faster failure detection
  const endpoints = [
    "home", "about", "experience", "education", 
    "project", "stats", "Courses"
  ];
  
  const results = await Promise.allSettled(
    endpoints.map(endpoint => 
      fetchWithTimeout(`${baseUrl}/${endpoint}/get`, 5000)
    )
  );
  
  return {
    home: results[0].status === 'fulfilled' ? results[0].value?.data : null,
    about: results[1].status === 'fulfilled' ? results[1].value?.data : null,
    experience: results[2].status === 'fulfilled' ? results[2].value?.data : null,
    education: results[3].status === 'fulfilled' ? results[3].value?.data : null,
    project: results[4].status === 'fulfilled' ? results[4].value?.data : null,
    stats: results[5].status === 'fulfilled' ? results[5].value?.data : null,
    courses: results[6].status === 'fulfilled' ? results[6].value?.data : null,
  };
}

// Preload critical data
async function getCriticalData() {
  const baseUrl = "https://akdukeyhere.vercel.app/api";
  
  // Only fetch the most critical data first (home + about)
  const [homeResult, aboutResult] = await Promise.allSettled([
    fetchWithTimeout(`${baseUrl}/home/get`, 3000),
    fetchWithTimeout(`${baseUrl}/about/get`, 3000)
  ]);
  
  return {
    home: homeResult.status === 'fulfilled' ? homeResult.value?.data : null,
    about: aboutResult.status === 'fulfilled' ? aboutResult.value?.data : null,
  };
}

// Loading component for sections
function SectionLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
    </div>
  );
}

// Lazy-loaded section component
async function LazySection({ endpoint, Component, ...props }) {
  try {
    const data = await fetchWithTimeout(
      `https://akdukeyhere.vercel.app/api/${endpoint}/get`,
      4000
    );
    return <Component data={data?.data} {...props} />;
  } catch (error) {
    return <Component data={null} {...props} />;
  }
}

export default async function Home() {
  // Get critical data immediately
  const criticalData = await getCriticalData();
  
  return (
    <div>
      {/* Render critical sections immediately */}
      <ClientHomeView data={criticalData.home} />
      <ClientAboutView 
        data={criticalData.about && criticalData.about.length ? criticalData.about[0] : []} 
      />
      
      {/* Lazy load non-critical sections */}
      <Suspense fallback={<SectionLoader />}>
        <LazySection 
          endpoint="experience" 
          Component={ClientExperienceAndEducationView}
          experienceData={null}
          educationData={null}
        />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <LazySection endpoint="project" Component={ClientProjectView} />
      </Suspense>
      
      {/* Contact section doesn't need data */}
      <ClientContactView />
      
      <Suspense fallback={<SectionLoader />}>
        <LazySection endpoint="stats" Component={Stats} />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <LazySection endpoint="Courses" Component={Courses} />
      </Suspense>
      
      <div className="h-[10vh] w-full bg-transparent"></div>
    </div>
  );
}

// Export metadata for better SEO and loading
export const metadata = {
  title: 'Portfolio',
  description: 'Professional portfolio website',
};

// Enable static generation if data doesn't change frequently
export const revalidate = 3600; // Revalidate every hour