"use client"

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { SetGoalInput } from "@/interface/goal";
import { paramMonth } from "@/utils/calculateDay";
import dayjs from "dayjs";
import { useExpenseGoal, useRevenueGoal, useSetGoal, useUpdateGoal } from "@/hooks/useGoalQuery";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
dayjs().format();

export default function setGoals(){
  const { register, handleSubmit, setValue} = useForm<SetGoalInput>({ mode: "onChange" });

  const {data:revenue} = useRevenueGoal(paramMonth);
  const {data:expense} = useExpenseGoal(paramMonth);

  const [revenueGoal, setRevenueGoal] = useState(0);
  const [expenseGoal, setExpenseGoal] = useState(0);

  const setMutation = useSetGoal();
  const updateMutation = useUpdateGoal();

  const onSubmit = (data: SetGoalInput) => {
    const newData = { ...data, goalMonth: paramMonth };
    if (revenueGoal === 0 && expenseGoal === 0) {
      setMutation.mutate(newData);
    } else {
      updateMutation.mutate(newData);
    }
  };

  useEffect(() => {
    if (revenue || expense) {
      const revenueValue = revenue?.revenueGoal0Ago || 0;
      const expenseValue = expense?.expenseGoal0Ago || 0;
      setRevenueGoal(revenueValue);
      setExpenseGoal(expenseValue);
      setValue("revenueGoal", revenueValue);
      setValue("expenseGoal", expenseValue);
    }
  }, [revenue, expense]);

  const router = useRouter();

  return (
    <div className="container min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <Link href={"#"} onClick={router.back}>
          <Image alt="back" src={'/icons/arrow.png'} width={25} height={25} />
        </Link>
      </div>
      <div className="flex flex-row items-center mb-6">
        <p className="text-xl font-semibold">목표 설정하기</p>
      </div>
      <form className="flex flex-col space-y-10 flex-grow" onSubmit={handleSubmit(onSubmit)}>
        <div className="label-input-set">
          <label className="label-base">매출 목표</label>
          <div className="input-base flex flex-row items-center justify-between space-x-3 focus-within:border-emerald-400">
            <input
              className="text-emerald-500 placeholder:text-xs w-full placeholder:text-gray-600 focus:outline-none"
              placeholder="매출 목표를 설정해보세요."
              {...register("revenueGoal", { valueAsNumber: true })}
            />
            <p>원</p>
          </div>
        </div>
        <div className="label-input-set">
          <label className="label-base">지출 예산</label>
          <div className="input-base flex flex-row items-center justify-between space-x-3 focus-within:border-emerald-400">
            <input
              className="text-red-500 placeholder:text-xs w-full placeholder:text-gray-600 focus:outline-none"
              placeholder="지출 예산을 설정해보세요."
              {...register("expenseGoal", { valueAsNumber: true })}
            />
            <p>원</p>
          </div>
        </div>
        <div className="flex-grow"></div> {/* This will push the button to the bottom */}
        <Button type="submit" href="/goals" className="!mb-[40px]">저장하기</Button> {/* Added larger bottom margin */}
      </form>
      <Navbar />
    </div>
);
}
