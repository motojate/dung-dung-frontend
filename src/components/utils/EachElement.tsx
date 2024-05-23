import { ReactNode } from 'react';

interface EachElementProps<T> {
  render: (item: T, index: number) => ReactNode;
  of: T[];
}

const EachElement = <T,>({ render, of }: EachElementProps<T>) => (
  <div>
    {of.map((item, index) => {
      return (
        <div key={`${item}-${index}`} className="mb-10">
          {render(item, index)}
        </div>
      );
    })}
  </div>
);

export default EachElement;
