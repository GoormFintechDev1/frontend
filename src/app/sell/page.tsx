'use client'

import Button from "@/components/Button"
import Image from "next/image"
import Select, { GroupBase, StylesConfig } from 'react-select'

export default function Sell() {

    const textGuide = `* 예시 가이드
한 달 전에 구매했는데 생각보다 잘 안써서 판매합니다.
오늘이나 내일 중으로 거래하고 싶어요.
오늘은 오후 5시부터 가능하고, 내일은 오전부터 다 가능합니다!!
    `;

    interface OptionType {
        label: string;
        value: string;
      }
      
    const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#34d399' : '#d9d9d9',
            boxShadow: 'none',
            '&:hover': {
            borderColor: state.isFocused ? '#34d399' : '#d9d9d9',
            },
            minHeight: '48px',
            borderRadius: '6px',
            
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: '12px',  // Placeholder 크기 조정
            color: '#4b5563',  // Placeholder 색상 설정 (예: 회색)
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#34d399' : state.isFocused ? '#e5e7eb' : '#ffffff',  // 선택 시와 Hover 시 색상
            color: state.isSelected ? '#ffffff' : '#111827', // 선택된 텍스트 색상
            '&:hover': {
              backgroundColor: '#e5e7eb', // Hover 시 색상
              color: '#111827',           // Hover 시 텍스트 색상
            },
          }),
          singleValue: (provided) => ({
            ...provided,
            fontSize: '14px', // 선택된 값의 크기 설정
            color: '#111827', // 선택된 값의 색상
          }),
    };

      

    const categoryOptions = [
        {value:"", label:""},
        {value:"", label:""},
        {value:"", label:""}
    ]

    return (
        <div className="flex flex-col space-y-8 h-full w-full">
            <div className="flex justify-between items-center w-full p-4 fixed top-0 left-0 bg-white">
                <Image alt="취소하기" src="/icons/X.png" width={25} height={25}></Image>
                <p className="main-text">내 상품 판매하기</p>
                <span className="w-6"></span>
                {/* <Image alt="취소하기" src="/icons/Done.png" width={25} height={25}></Image> */}
            </div>
            <form className="flex flex-col overflow-y-auto pb-20 space-y-6">
                <div>
                    <label className="label-sm">이미지 추가</label>
                    <div>이미지 추가 기능 구현 예정...</div>
                </div>
                <div className="label-input-set">
                    <label className="label-sm">제목</label>
                    <input className="!h-12 !rounded-md input-base text-sm" placeholder="제목을 입력하세요."></input>
                </div>
                <div className="label-input-set">
                    <label className="label-sm">거래방식</label>
                    <div className="flex flex-row h-12 space-x-3">
                        <button type="button" className="border rounded-md w-20 h-full text-xs border-[#d9d9d9]">판매하기</button>
                        <button type="button" className="border rounded-md w-20 h-full text-xs border-[#d9d9d9]">판매하기</button>
                    </div>
                </div>
                <div className="label-input-set">
                    <label className="label-sm">가격</label>
                    <div className="flex flex-row space-x-2 !h-12 !rounded-md input-base text-sm input-base focus-within:border-emerald-400">
                        <input className="placeholder:text-xs w-full h-full focus:outline-none" placeholder="가격을 입력하세요." />
                        <p>원</p>
                    </div>
                </div>
                <div className="label-input-set">
                    <label className="label-sm">카테고리</label>
                    <Select styles={customStyles} placeholder="장소를 선택하세요." options={categoryOptions}></Select>
                </div>
                <div className="label-input-set">
                    <label className="label-sm">상세 설명</label>
                    <textarea className="text-sm !h-32 !rounded-md border-[#d9d9d9] placeholder:text-[10px] placeholder:leading-5 p-3 border placeholder:text-gray-600 focus:border-emerald-400 outline-none" placeholder={textGuide}></textarea>
                </div>
                <div className="label-input-set">
                    <label className="label-sm">거래 희망 장소</label>
                    <Select styles={customStyles} placeholder="장소를 선택하세요." options={categoryOptions}></Select>
                </div>
                <div className="fixed bottom-0 left-0 w-full px-8 py-5 bg-white shadow-md">
                    <Button>등록하기</Button>
                </div>
            </form>
        </div>
    )
}
