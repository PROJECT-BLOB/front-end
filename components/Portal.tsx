import ReactDOM from 'react-dom';

export default function Portal({ children }: React.PropsWithChildren) {
  const element = document.body;

  return ReactDOM.createPortal(children, element);
}
