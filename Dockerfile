# 베이스 이미지 설정
FROM node:18-alpine AS base

# 필요한 라이브러리 설치
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json* ./
RUN npm install

# 1. Development 모드로 실행하기 위한 설정
FROM base AS dev

# 소스 코드를 복사하여 컨테이너에 포함시킴
COPY . .

# 포트 설정
EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV development

# 개발 서버 실행 (파일 변경 시 자동 반영)
CMD ["npm", "run", "dev"]