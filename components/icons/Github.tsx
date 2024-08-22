import { cn } from '@/lib/utils'

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('__web-inspector-hide-shortcut__', className)}
    >
      <path
        d="M22.1948 11.3571C22.1878 11.4571 22.1798 11.5681 22.1738 11.6731C22.1492 12.1293 22.094 12.5833 22.0088 13.0321C21.6707 14.8265 20.8933 16.5091 19.7464 17.9298C18.5994 19.3506 17.1185 20.4652 15.4358 21.1741C15.1998 21.2741 14.9588 21.3621 14.7178 21.4441C14.5664 21.4967 14.4012 21.4939 14.2517 21.436C14.1554 21.3974 14.0731 21.3302 14.0159 21.2435C13.9587 21.1569 13.9293 21.0549 13.9317 20.951C13.9317 20.451 13.9387 19.9511 13.9397 19.4441C13.9397 18.9021 13.9467 18.3611 13.9397 17.8201C13.9429 17.3995 13.8638 16.9823 13.7068 16.592C13.5984 16.327 13.4344 16.0883 13.2258 15.8921L13.2046 15.868L13.4378 15.838C14.2105 15.7545 14.9658 15.5522 15.6768 15.238C16.4619 14.8833 17.1135 14.288 17.5376 13.5381C17.783 13.0939 17.9598 12.6151 18.0618 12.118C18.1933 11.4968 18.2464 10.8615 18.2197 10.2271C18.1939 9.22729 17.8114 8.26974 17.1416 7.5271C17.1257 7.51265 17.115 7.49348 17.1109 7.47241C17.1067 7.45134 17.1094 7.42942 17.1187 7.41003C17.2776 6.95893 17.3433 6.48028 17.3118 6.00305C17.2846 5.52311 17.1812 5.05052 17.0056 4.60303C17.0016 4.58676 16.9927 4.57221 16.98 4.56128C16.9673 4.55035 16.9515 4.54368 16.9348 4.54211C16.727 4.51609 16.5162 4.52615 16.3118 4.57202C15.8201 4.67532 15.3475 4.85526 14.9116 5.1051C14.6026 5.2761 14.3067 5.4671 14.0047 5.6521C13.9903 5.66229 13.9739 5.66898 13.9566 5.67175C13.9392 5.67453 13.9216 5.67331 13.9048 5.66809C13.4195 5.53677 12.9251 5.44148 12.4258 5.38306C11.8664 5.31736 11.3025 5.29693 10.7398 5.32202C10.335 5.33934 9.9316 5.38077 9.53175 5.44604C9.18205 5.50239 8.83549 5.57716 8.49367 5.67004C8.47953 5.67313 8.46494 5.67335 8.4507 5.67078C8.43646 5.6682 8.42283 5.66287 8.41066 5.65503C7.93787 5.33322 7.43562 5.05704 6.91066 4.83008C6.59987 4.69486 6.27288 4.60071 5.93776 4.55005C5.78173 4.52536 5.62284 4.52536 5.46681 4.55005C5.45481 4.55313 5.44351 4.55877 5.43385 4.56653C5.4242 4.57429 5.41625 4.58404 5.41066 4.59509C5.19338 5.12933 5.08422 5.70136 5.08962 6.27808C5.09247 6.67532 5.16403 7.06904 5.3008 7.44202C5.30596 7.45494 5.30655 7.46928 5.30275 7.48267C5.29895 7.49605 5.29098 7.50783 5.2798 7.51611C4.87203 7.96654 4.56695 8.50014 4.38576 9.08008C4.25644 9.49457 4.1891 9.92592 4.18581 10.3601C4.17881 10.808 4.2075 11.2558 4.27174 11.6991C4.36227 12.4007 4.5951 13.0765 4.95583 13.6851C5.34575 14.3156 5.90167 14.8266 6.56276 15.1621C7.07684 15.425 7.62603 15.6121 8.19362 15.718C8.51062 15.78 8.83163 15.8181 9.15163 15.8711L9.18874 15.879L9.17165 15.901C8.88747 16.1731 8.68545 16.5196 8.58864 16.901C8.54964 17.036 8.5298 17.1741 8.4988 17.3101C8.49414 17.3309 8.48144 17.3492 8.46364 17.3611C8.07542 17.5404 7.65349 17.6346 7.22585 17.6371C6.88058 17.6386 6.54015 17.5555 6.23439 17.3951C5.92863 17.2348 5.6667 17.002 5.4717 16.717C5.3607 16.567 5.2658 16.4021 5.1548 16.2511C4.93258 15.9321 4.639 15.6691 4.29762 15.483C3.98506 15.3142 3.62148 15.2658 3.27565 15.347C3.07065 15.396 3.03364 15.519 3.16164 15.686C3.25678 15.8095 3.37673 15.9117 3.51369 15.9861C3.74843 16.1202 3.95064 16.3045 4.10573 16.526C4.37645 16.8763 4.5981 17.2618 4.76466 17.672C4.83991 17.8681 4.94621 18.0508 5.07961 18.213C5.35913 18.5391 5.73142 18.7725 6.14674 18.8821C6.51701 18.9847 6.90069 19.0302 7.28468 19.0171C7.67206 19.0084 8.0581 18.9675 8.43874 18.895C8.43874 18.916 8.43874 18.9351 8.43874 18.9551C8.44474 19.6057 8.44963 20.2564 8.45363 20.9071C8.45923 21.0105 8.43911 21.1135 8.39479 21.207C8.35142 21.2902 8.2865 21.3601 8.2068 21.4095C8.12711 21.459 8.03543 21.4861 7.94167 21.488C7.7837 21.4932 7.62661 21.4631 7.48171 21.4C5.81171 20.8033 4.30986 19.8132 3.10329 18.5135C1.89672 17.2139 1.021 15.6428 0.549821 13.9331C0.406688 13.4137 0.303001 12.8841 0.239763 12.349C0.022838 10.5647 0.24546 8.75454 0.888444 7.07605C1.53143 5.39756 2.57523 3.90169 3.92873 2.71899C5.03698 1.74852 6.32939 1.01122 7.72878 0.551025C8.31546 0.357232 8.91771 0.214064 9.52882 0.123047C9.92624 0.0617311 10.3269 0.0239614 10.7288 0.0100098C10.756 0.0086026 10.7831 0.00525106 10.8098 0H11.5408C11.5706 0.00517646 11.6005 0.00895618 11.6306 0.0111084C12.0534 0.0262877 12.4751 0.0672895 12.8928 0.134033C13.521 0.230168 14.1391 0.382842 14.7398 0.590088C16.3997 1.15942 17.9002 2.11572 19.1174 3.37988C20.3347 4.64404 21.2336 6.17977 21.7398 7.86011C21.9839 8.67323 22.1309 9.51241 22.1778 10.3601C22.1848 10.4601 22.1927 10.56 22.1987 10.66L22.1948 11.3571Z"
        fill="white"
      ></path>
    </svg>
  )
}
