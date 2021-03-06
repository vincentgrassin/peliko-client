import * as React from "react";
import Svg, { Defs, Path, G, Mask, Use } from "react-native-svg";

export interface MailBoxProps {}

const MailBox: React.FC<MailBoxProps> = (props) => (
  <Svg width="150px" height="151px" viewBox="0 0 150 151" {...props}>
    <Defs>
      <Path id="a" d="M0 0.0142L150 0.0142 150 150 0 150z" />
    </Defs>
    <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <Path
        fill="#AED7E6"
        d="M82.683 149.064L96.934 149.064 96.934 73.799 82.683 73.799z"
      />
      <G transform="translate(0 .986)">
        <Mask id="b" fill="#fff">
          <Use xlinkHref="#a" />
        </Mask>
        <Path
          d="M84.606 146.155h10.405V74.736H84.606v71.419zM96.934 150H82.683a1.923 1.923 0 01-1.923-1.923V72.813c0-1.063.861-1.924 1.923-1.924h14.251c1.063 0 1.923.861 1.923 1.924v75.264c0 1.062-.86 1.923-1.923 1.923z"
          fill="#202120"
          mask="url(#b)"
        />
        <Path
          d="M141.692 73.05H52.946V1.936h65.389c16.426 0 29.742 13.356 29.742 29.832v34.908c0 3.518-2.86 6.372-6.385 6.372"
          fill="#F7C42F"
          mask="url(#b)"
        />
        <Path
          d="M54.87 71.126h86.822a4.46 4.46 0 004.462-4.45V31.77c0-15.389-12.48-27.91-27.82-27.91H54.87v67.267zm86.822 3.846H52.947a1.924 1.924 0 01-1.923-1.923V1.937c0-1.062.86-1.923 1.923-1.923h65.388C135.795.014 150 14.26 150 31.77v34.907c0 4.574-3.728 8.296-8.31 8.296z"
          fill="#202120"
          mask="url(#b)"
        />
        <Path
          d="M82.689 73.05H23.205v-41.4c0-16.41 13.302-29.713 29.713-29.713h.057c16.41 0 29.714 13.303 29.714 29.713v41.4z"
          fill="#F27153"
          mask="url(#b)"
        />
        <Path
          d="M25.126 71.126h55.64V31.65c0-15.324-12.468-27.79-27.79-27.79-15.383 0-27.85 12.466-27.85 27.79v39.476zm57.562 3.846H23.203a1.924 1.924 0 01-1.923-1.923V31.65C21.28 14.206 35.473.014 52.917.014 70.42.014 84.61 14.206 84.61 31.65v41.4c0 1.06-.86 1.922-1.922 1.922z"
          fill="#202120"
          mask="url(#b)"
        />
        <Path
          d="M129.601 35.624h-23.743c-4.363 0-7.901 3.53-7.901 7.885 0 4.354 3.538 7.885 7.901 7.885 4.363 0 7.9-3.53 7.9-7.885h15.843a3.947 3.947 0 003.95-3.943 3.946 3.946 0 00-3.95-3.942"
          fill="#AED7E6"
          mask="url(#b)"
        />
        <Path
          d="M105.858 37.547c-3.296 0-5.977 2.675-5.977 5.962s2.68 5.962 5.977 5.962 5.978-2.675 5.978-5.962c0-1.062.86-1.923 1.922-1.923H129.6a2.027 2.027 0 002.028-2.019c0-1.115-.911-2.02-2.028-2.02h-23.743zm0 15.77c-5.416 0-9.823-4.4-9.823-9.808 0-5.408 4.407-9.809 9.823-9.809H129.6c3.238 0 5.873 2.632 5.873 5.867 0 3.234-2.635 5.865-5.873 5.865h-14.108c-.898 4.49-4.877 7.885-9.635 7.885z"
          fill="#202120"
          mask="url(#b)"
        />
        <Path
          d="M21.18 128.905c-15.956-1.35-24.263-14.198-15.997-27.728L23.204 73.05H82.69l-19.155 30.557c-10.587 16.643-23.519 26.893-42.355 25.3"
          fill="#FFBDCB"
          mask="url(#b)"
        />
        <Path
          d="M21.342 126.99c16.212 1.367 29.1-6.388 40.57-24.415l17.301-27.603H24.255L6.802 102.216c-3.308 5.413-3.853 10.957-1.514 15.573 2.64 5.207 8.49 8.56 16.054 9.2m3.677 4.005c-1.314 0-2.646-.058-4.002-.172-8.92-.755-15.904-4.871-19.159-11.296-2.965-5.85-2.366-12.722 1.683-19.35L21.584 72.01a1.924 1.924 0 011.62-.885h59.484a1.924 1.924 0 011.63 2.944L65.163 104.63c-11.389 17.9-24.228 26.365-40.144 26.365"
          fill="#202120"
          mask="url(#b)"
        />
      </G>
    </G>
  </Svg>
);

export default MailBox;
