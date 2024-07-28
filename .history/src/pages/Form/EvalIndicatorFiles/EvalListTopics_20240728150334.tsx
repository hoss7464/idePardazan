import React from 'react';

interface MyComponentProps {
  listTopicName: string;
  listTopicOperation: string;
}

const EvalListTopics: React.FC<MyComponentProps> = ({
  listTopicName,
  listTopicOperation,
}) => {
  return (
    <>
      <thead>
        <TransformStreamDefaultController>
          <th
            scope="col"
            className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-1/6"
          >
            {listTopicName}
          </th>
       

          <th
            scope="col"
            className="px-6 py-3 text-center text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-1/6"
          >
            {listTopicOperation}
          </th>
        </TransformStreamDefaultController>
      </thead>
    </>
  );
};

export default EvalListTopics;
