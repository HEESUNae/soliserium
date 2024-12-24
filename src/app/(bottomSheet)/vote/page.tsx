'use client';

import { Button } from '@/shared';
import styles from './page.module.css';
import { Radio } from '@/shared/ui/radio';
import React, { useEffect, useState } from 'react';
import { fetchUpdateVote } from '@/entities/vote/api/update-vote';
import { fetchGetAllVote } from '@/entities/vote/api/get-vote';
import { DocumentData } from 'firebase/firestore';
import { useUserAuthStore } from '@/entities';
import { fetchUpdateUser } from '@/entities/auth/api/update-user';

export default function VotePage() {
  const [voteList, setVoteList] = useState<null | DocumentData>(null);
  const [disabled, setDisabled] = useState(true);
  const [selectedVotes, setSelectedVotes] = useState({ vote1: '', vote2: '', vote3: '' });
  const { userAuth, setUserAuth } = useUserAuthStore();

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const vote1Opt = formData.get('vote1')?.toString() ?? '';
      const vote2Opt = formData.get('vote2')?.toString() ?? '';
      const vote3Opt = formData.get('vote3')?.toString() ?? '';
      const voteOptions = [
        { voteKey: 'vote1', optionKey: vote1Opt },
        { voteKey: 'vote2', optionKey: vote2Opt },
        { voteKey: 'vote3', optionKey: vote3Opt },
      ];

      if (voteList) {
        for (let i = 0; i < voteOptions.length; i++) {
          const { voteKey, optionKey } = voteOptions[i];
          // 투표 내용 업데이트
          await fetchUpdateVote(voteKey, { [optionKey]: voteList[i][optionKey] + 1 });
          // 계정 투표 처리
          if (userAuth.providerId === 'firebase') {
            await fetchUpdateUser(userAuth.uid as string, true);
          }
          setUserAuth({ ...userAuth, isVote: true });
          setDisabled(true);
        }
        // 업데이트 된 내용 다시 가져오기
        await getVote();
      }
      alert('투표가 완료되었습니다.');
    } catch (e) {
      console.log(e);
      alert('투표에 실패했습니다.');
    }
  };

  // 투표 내용 가져오기
  const getVote = async () => {
    try {
      const votes: DocumentData = await fetchGetAllVote();
      setVoteList(votes);
    } catch (e) {
      console.log(e);
    }
  };

  // 라디오 입력값 저장
  const handleVoteChange = (name: string, value: string) => {
    setSelectedVotes((prev) => ({ ...prev, [name]: value }));
  };

  // 모두 선택한 경우만 '결과보기' 버튼 활성화
  useEffect(() => {
    const isSubmitDisabled = !(selectedVotes.vote1 && selectedVotes.vote2 && selectedVotes.vote3);
    setDisabled(isSubmitDisabled);
  }, [selectedVotes]);

  useEffect(() => {
    getVote();
  }, []);

  if (!voteList) return <></>;

  return (
    <div className={styles.main}>
      <div className={styles.voteInfoBox}>
        <h2>{userAuth.isVote ? '이미 투표를 참여했습니다.' : '투표에 참여해주세요.'}</h2>
        <p>{userAuth.isVote ? '투표는 계정당 1번만 참여가능합니다.' : '투표 완료 후 결과 확인이 가능합니다.'}</p>
      </div>
      <div className={styles.questionWrap}>
        <form onSubmit={formSubmit}>
          <div className={styles.question}>
            <h2>Q1. 현재 가장 큰 고민은 무엇인가요?</h2>
            {vote1Options.map((option, idx) => (
              <Radio key={idx} name="vote1" value={option.value} onChange={handleVoteChange} disabled={userAuth.isVote}>
                <p>{option.text}</p>
                <p>{voteList[0]?.[option.value]}</p>
              </Radio>
            ))}
          </div>
          <div className={styles.question}>
            <h2>Q2. 스트레스 해소를 위해 주로 사용하는 방법은?</h2>
            {vote2Options.map((option, idx) => (
              <Radio key={idx} name="vote2" value={option.value} onChange={handleVoteChange} disabled={userAuth.isVote}>
                <p>{option.text}</p>
                <p>{voteList[1]?.[option.value]}</p>
              </Radio>
            ))}
          </div>
          <div className={styles.question}>
            <h2>Q3. 인간관계에서 가장 중요한 요소는?</h2>
            {vote3Options.map((option, idx) => (
              <Radio key={idx} name="vote3" value={option.value} onChange={handleVoteChange} disabled={userAuth.isVote}>
                <p>{option.text}</p>
                <p>{voteList[2]?.[option.value]}</p>
              </Radio>
            ))}
          </div>
          <Button type="submit" className="fill" disabled={disabled}>
            결과보기
          </Button>
        </form>
      </div>
    </div>
  );
}

const vote1Options = [
  { value: 'option1', text: '과도한 업무/학업 스트레스' },
  { value: 'option2', text: '팀원 또는 동료와의 갈등' },
  { value: 'option3', text: '업무/학업 성과에 대한 압박' },
  { value: 'option4', text: '진로 또는 커리어 방향 설정' },
];

const vote2Options = [
  { value: 'option1', text: '운동이나 산책' },
  { value: 'option2', text: '취미 생활 (게임, 영화 감상 등)' },
  { value: 'option3', text: '친구/가족과 대화' },
  { value: 'option4', text: '전문가의 상담을 받는다' },
];

const vote3Options = [
  { value: 'option1', text: '신뢰' },
  { value: 'option2', text: '소통' },
  { value: 'option3', text: '공감' },
  { value: 'option4', text: '책임감' },
];
