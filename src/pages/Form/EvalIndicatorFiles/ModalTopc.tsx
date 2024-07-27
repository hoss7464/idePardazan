import React from 'react';
import { ModalTopicCloseBtn } from './EvalIndicatorStyles';

interface MyComponentProps {
  modalTopicText: string;
  modalTopicCloseBtn: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalTopic: React.FC<MyComponentProps> = ({
  modalTopicText,
  modalTopicCloseBtn,
}) => {
  return (
    <>
      <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
        <h3 className="text-xl font-semibold">{modalTopicText}</h3>
        <button className="bg-white" onClick={modalTopicCloseBtn}>
          <ModalTopicCloseBtn />
        </button>
      </div>
    </>
  );
};

export default ModalTopic;
