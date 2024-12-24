'use client';

import { Button } from '@/shared';
import styles from './page.module.css';
import { Radio } from '@/shared/ui/radio';
import React from 'react';

export default function VotePage() {
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('서비스 준비중입니다.');
  };
  return (
    <div className={styles.main}>
      <div className={styles.voteInfoBox}>
        <h2>투표에 참여해주세요.</h2>
        <p>투표 완료 후 결과 확인이 가능합니다.</p>
      </div>
      <div className={styles.questionWrap}>
        <form onSubmit={formSubmit}>
          <div className={styles.question}>
            <h3>Q1. 현재 가장 큰 고민은 무엇인가요?</h3>
            <Radio name="vote1" value="option1">
              <p>과도한 업무/학업 스트레스</p>
              <p>0</p>
            </Radio>
            <Radio name="vote1" value="option2">
              <p>팀원 또는 동료와의 갈등</p>
              <p>0</p>
            </Radio>
            <Radio name="vote1" value="option3">
              <p> 업무/학업 성과에 대한 압박</p>
              <p>0</p>
            </Radio>
            <Radio name="vote1" value="option4">
              <p>진로 또는 커리어 방향 설정</p>
              <p>0</p>
            </Radio>
          </div>
          <div className={styles.question}>
            <h3>Q2. 스트레스 해소를 위해 주로 사용하는 방법은?</h3>
            <Radio name="vote2" value="option1">
              <p>운동이나 산책</p>
              <p>0</p>
            </Radio>
            <Radio name="vote2" value="option2">
              <p>취미 생활 (게임, 영화 감상 등)</p>
              <p>0</p>
            </Radio>
            <Radio name="vote2" value="option3">
              <p>친구/가족과 대화</p>
              <p>0</p>
            </Radio>
            <Radio name="vote2" value="option4">
              <p>전문가의 상담을 받는다</p>
              <p>0</p>
            </Radio>
          </div>
          <div className={styles.question}>
            <h3>Q3. 인간관계에서 가장 중요한 요소는?</h3>
            <Radio name="vote3" value="option1">
              <p>신뢰</p>
              <p>0</p>
            </Radio>
            <Radio name="vote3" value="option2">
              <p>소통</p>
              <p>0</p>
            </Radio>
            <Radio name="vote3" value="option3">
              <p>공감</p>
              <p>0</p>
            </Radio>
            <Radio name="vote3" value="option4">
              <p>책임감</p>
              <p>0</p>
            </Radio>
          </div>
          <Button type="submit" className="fill">
            결과보기
          </Button>
        </form>
      </div>
    </div>
  );
}
