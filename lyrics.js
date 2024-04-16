const lyrics = [
    { time: 0, text: "" },
    { time: 12.10, text: "Sintang Paaralan" },
    { time: 14.90, text: "Tanglaw ka ng bayan " },
    { time: 18.00, text: "Pandayan ng isip ng kabataan" },
    { time: 24.10, text: "Kami ay dumating nang salat sa yaman" },
    { time: 29.10, text: "Hanap na dunong ay iyong alay" },
    { time: 35.10, text: "Ang layunin mong makatao" },
    { time: 41.15, text: "Dinarangal ang Pilipino" },
    { time: 47.10, text: "Ang iyong aral, diwa, adhikang taglay" },
    { time: 53.20, text: "PUP, aming gabay" },
    { time: 56.10, text: "Paaralang dakila" },
    { time: 62.00, text: "PUP, pinagpala" },
    { time: 68.50, text: "Gagamitin ang karunungan" },
    { time: 74.10, text: "Mula sa iyo, para sa bayan" },
    { time: 80.60, text: "Ang iyong aral, diwa, adhikang taglay" },
    { time: 86.10, text: "PUP, aming gabay" },
    { time: 89.00, text: "Paaralang dakila" },
    { time: 95.00, text: "PUP, pinagpala" }
  ];

  const lyricsContainer = document.getElementById('lyrics');

  lyrics.forEach((line, index) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = line.text;
    paragraph.classList.add('lyrics-line');
    lyricsContainer.appendChild(paragraph);
  });

  const audio = document.getElementById('audio');
  audio.volume = 0.3;

  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;

    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].time <= currentTime && (lyrics[i + 1] && lyrics[i + 1].time > currentTime)) {
        const currentLine = document.querySelectorAll('.lyrics-line')[i];
        const previousLine = document.querySelector('.lyrics-line.current');
        if (previousLine) {
          previousLine.classList.remove('current');
          markPassedLines(i); // Mark passed lines
        }
        currentLine.classList.add('current');
        scrollLyricsContainer();
        break;
      }
    }

    const lastLineIndex = lyrics.length - 1;
    if (currentTime >= lyrics[lastLineIndex].time) {
      const lastLine = document.querySelectorAll('.lyrics-line')[lastLineIndex];
      const previousLine = document.querySelector('.lyrics-line.current');
      if (previousLine) {
        previousLine.classList.remove('current');
        markPassedLines(lastLineIndex); // Mark passed lines
      }
      lastLine.classList.add('current');
      scrollLyricsContainer();
    }
  });

  function scrollLyricsContainer() {
    const container = document.querySelector('.lyrics-container');
    const currentLine = document.querySelector('.lyrics-line.current');
    if (!currentLine) return;

    const containerScrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const currentLineTop = currentLine.offsetTop;
    const currentLineHeight = currentLine.offsetHeight;

    if (currentLineTop < containerScrollTop || currentLineTop + currentLineHeight > containerScrollTop + containerHeight) {
      container.scrollTo({
        top: currentLineTop - (containerHeight / 2) + (currentLineHeight / 2),
        behavior: 'smooth'
      });
    }
  }

  function markPassedLines(index) {
    const lines = document.querySelectorAll('.lyrics-line');
    for (let i = 0; i < lines.length; i++) {
      if (i <= index) {
        lines[i].classList.add('passed');
      } else {
        lines[i].classList.remove('passed');
      }
    }
  }