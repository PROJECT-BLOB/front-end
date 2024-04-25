import ReactDOM from 'react-dom';

export default function Portal({ children }: React.PropsWithChildren) {
  const el = document.getElementById('modal-layer')!;

  return ReactDOM.createPortal(children, el);
}
