'use client';

import FirstSection from "@/components/firstsection";
import DefaultFooter from "@/components/footer";
import MainForm from "@/components/mainform";
import DefaultNavbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="bg-white mb-12">
      <DefaultNavbar />
      <section className="p-6 md:p-12">
        <FirstSection />
        <div className="mt-8 bg-slate-100 p-6 rounded-xl text-center">
          <MainForm />
        </div>
      </section>
      {/* <DefaultFooter /> */}
    </main>
  )
}
