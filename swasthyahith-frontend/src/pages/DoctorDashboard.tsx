"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Stethoscope, TrendingUp } from "lucide-react";
import Lottie from "react-lottie";
import { WaveChart } from "@/components/WaveChart";
import doc3dAnimation from "../assets/doc3d.json";
import NavBar from "@/components/NavBar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const stats = [
  { title: "Patients Cured", value: 1234, icon: Users },
  { title: "Prescriptions", value: 5678, icon: FileText },
  { title: "Diagnose Types", value: 42, icon: Stethoscope },
  { title: "Success Rate", value: "98%", icon: TrendingUp },
];

export default function DoctorDashboard() {
  const token = useSelector((state: any) => state.auth?.jwt);
  const [doctorInfo, setDoctorInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("Failed to fetch doctor info");
      })
      .then((data) => {
        setDoctorInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctor info:", err);
        setLoading(false);
      });
  }, [token]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: doc3dAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0e0d29] to-[#010048]/70 text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!doctorInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0e0d29] to-[#010048]/70 text-white">
        <p className="text-xl">Failed to load doctor information. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0e0d29] to-[#010048]/70 text-white">
      <NavBar />
      <div className="mx-auto px-14">
        {/* Greeting Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center rounded-lg shadow-lg my-10 py-10">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Welcome, Dr. <span className="text-[#8B5DFF]">{doctorInfo.name}</span>
            </h1>
            <p className="text-lg text-gray-400 mb-2">Reg. No: {doctorInfo.registrationNumber}</p>
            <p className="text-lg text-gray-400">Email: {doctorInfo.email}</p>
            <p className="text-lg text-gray-400">Phone: {doctorInfo.phone}</p>
          </div>
          <div className="flex-shrink-0 w-1/2 lg:w-1/3">
            <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center mb-8">
          <div className="text-white text-2xl font-bold">See your stats</div>
          <Button
            size="lg"
            className="bg-[#8B5DFF] hover:bg-[#6A42C2] text-white px-8 py-6 text-lg"
          >
            Prescribe Now
          </Button>
        </div>

        {/* Numbers Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-[#8B5DFF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col mb-8">
          <div className="text-white text-2xl font-bold">You got some visits this month!</div>
          <div className="mt-10">
            <WaveChart />
          </div>
        </div>
      </div>
    </div>
  );
}
