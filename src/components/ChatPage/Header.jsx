import { MessageCircle } from "lucide-react";
import PropTypes from 'prop-types';

/**The header shown at the beginning of a conversation.*/
const Header = (props) => (
  <>
    <div className="mt-8 flex flex-col gap-3">
      <div className="w-fit rounded-full bg-white/10 p-3">
        <MessageCircle className="text-[var(--ga-text)]/75" size={32} />
      </div>
      <h1 className="text-4xl font-bold text-[var(--ga-text)]">
        {props.participants.join(", ")}
      </h1>
      <h2 className="text-lg text-[var(--ga-text)]/75">
        {
          props.participants.length === 1 ?
            <>This is the beginning of your conversation with {props.participants[0]}.</> :
            <>This is the beginning of the group conversation.</>
        }
      </h2>
      <div className="border-b border-white/10" />
    </div>
  </>
);

Header.propTypes = {
  participants: PropTypes.array.isRequired
}

export default Header;