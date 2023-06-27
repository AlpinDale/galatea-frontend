import { Sliders, Send } from "lucide-react";

/** Meant to be used exclusively within the InputBar. */
const IconButton = ({ children }) => (
    <button
      type="button"
      className="focusable-icon-button focusable-field border-2 border-transparent py-3 px-1"
    >
      {children}
    </button>
  );  

/** Bar containing the message text input and some attached buttons. */
const InputBar = () => (
  <div class="flex justify-center pb-4 max-sm:pb-0">
    <input
      type="text"
      placeholder="Send a message..."
      class="focusable-field w-full rounded-l-xl px-4 py-2"
    />
    <IconButton>
      <Sliders size={20} />
    </IconButton>
    <IconButton>
      <Send size={20} />
    </IconButton>
    <div class="rounded-r-xl bg-white/5 pr-2" />
  </div>
);

export default InputBar;
