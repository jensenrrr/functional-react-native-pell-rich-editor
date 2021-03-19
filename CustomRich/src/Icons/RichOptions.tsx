import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const BoldIcon = (selected: boolean) => (
  <Svg width="19" height="24" fill="none" viewBox="0 0 19 24">
    <Path
      fill={selected ? "#75EAE4" : "#000"}
      d="M0 0v1.45h1.438c.79 0 1.437.653 1.437 1.45v17.4c0 .798-.647 1.45-1.438 1.45H0v1.45h12.219c3.594 0 6.469-2.9 6.469-6.524 0-2.755-1.65-5.084-4.021-6.027C16.248 9.56 17.25 7.83 17.25 5.8c0-3.19-2.588-5.8-5.75-5.8H0zm6.469 1.45h2.875c2.372 0 4.313 1.958 4.313 4.35 0 2.393-1.94 4.35-4.313 4.35H6.47v-8.7zm0 10.15h3.593c2.804 0 5.032 2.248 5.032 5.076 0 2.827-2.228 5.075-5.031 5.075H6.469V11.6z"
    />
  </Svg>
);

const ItalicIcon = (selected: boolean) => (
  <Svg width="17" height="24" viewBox="0 0 17 24" fill="none">
    <Path
      d="M6.10955 0L5.75018 1.45H8.2658C8.85877 1.45 9.21923 1.92361 9.05751 2.50361L4.23955 20.6966C4.07783 21.2766 3.46797 21.7502 2.875 21.7502H0.359375L0 23.2002H10.4219L10.7812 21.7502H7.90625C7.31328 21.7502 6.95283 21.2768 7.11455 20.6966L11.9325 2.50361C12.0942 1.92361 12.7041 1.45 13.2971 1.45H15.8127L16.1721 0H6.10955V0Z"
      fill={selected ? "#75EAE4" : "#000"}
    />
  </Svg>
);
const UnderlineIcon = (selected: boolean) => (
  <Svg width="18" height="25" fill="none" viewBox="0 0 18 25">
    <Path
      fill={selected ? "#75EAE4" : "#000"}
      d="M0 21.875h18V25H0v-3.125zM12 0v1.563c.829 0 1.5.7 1.5 1.563V12.5c0 2.588-2.016 4.687-4.5 4.687-2.487 0-4.5-2.099-4.5-4.687V3.126c0-.863.671-1.563 1.5-1.563V0H0v1.563c.829 0 1.5.7 1.5 1.563V12.5c0 4.314 3.358 7.812 7.5 7.812 4.142 0 7.5-3.498 7.5-7.812V3.126c0-.863.671-1.563 1.5-1.563V0h-6z"
    />
  </Svg>
);

const RichOptions = [BoldIcon, ItalicIcon, UnderlineIcon];
export default RichOptions;
export { BoldIcon, ItalicIcon, UnderlineIcon };
