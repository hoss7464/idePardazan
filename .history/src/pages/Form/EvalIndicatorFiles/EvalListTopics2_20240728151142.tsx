import React from 'react';

interface MyComponentProps {
  listTopicName: string;
  listTopicOperation: string;
}

const EvalListTopics2: React.FC<MyComponentProps> = ({
  listTopicName,
  listTopicOperation,
}) => {
  return (
    <>
      <thead>
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-full"
          >
            {listTopicName}
          </th>
    
          <th
            scope="col"
            className="px-6 py-3 text-center text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-full"
          >
            {listTopicOperation}
          </th>
        </tr>
      </thead>
    </>
  );
};

export default EvalListTopics2;
