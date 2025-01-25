import { rtClass, rubyClass } from './Ruby.css';

type RubyProps = {
  alt?: string | undefined;
  content: string;
  showAlt: boolean;
};

export default function Ruby({ alt, content, showAlt }: RubyProps) {
  if (showAlt) {
    if (alt) {
      return (
        <ruby className={rubyClass}>
          {content}
          <rt className={rtClass}>{alt}</rt>
        </ruby>
      );
    }
  }
  return content;
}
