"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoPng from '../public/images/turinglogo.png';
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-zinc-200/30">
      <div className="flex flex-col w-[50%] gap-5 cursor-default sm:w-[70%] mb-10 sm:mb-0">
        <Image src={logoPng} alt="turinglogo" width={100} height={100} className="sm:w-[50px]"></Image>
        <p className="text-4xl font-bold">Welcome to Turing Team! ✨</p>
        <div className="text-muted-foreground cursor-default text-wrap flex flex-col gap-3 text-[1.1rem]">
          *★,°*:.☆(￣▽￣)/ :*.°★* 。<br />
          <p>图灵智能创新团队作为广东海洋大学首批重点建设的校级创新创业团队，是学校第五轮学科评估的示范基地。</p>
          <p>团队在计算机视觉、自然语言处理、前端、后台和UI等方向进行研究和开发。成立近6年来，团队拥有近30项发明专利和软件著作权，并在I类和II类学科专业竞赛中获得了32项国家级奖项和近70项省级奖项。</p>
          <p>往届成员曾成功进入知名院校如中国科学技术大学、华南理工大学和北京交通大学等，多人本科毕业后被字节跳动、阿里巴巴、网易等知名互联网企业录用。</p>
        </div>
        <Button
          className="sm:h-[55px] sm:text-[1.1rem] h-[45px] text-[1.05rem]"
          onClick={() => {
            router.push("/resume");
          }}
        >填写简历信息</Button>
      </div>
    </div>
  );
}
