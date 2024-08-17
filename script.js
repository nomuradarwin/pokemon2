// 定数の宣言
const PLAYER_CLASS = 'x'; // 人間プレイヤーのクラス
const CPU_CLASS = 'o'; // CPUのクラス
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// 画像のURLを設定するための変数
let PLAYER_IMAGE_URL = '';
let CPU_IMAGE_URL = '';

// 効果音のURLを設定
const startSound = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E6%B1%BA%E5%AE%9A%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E6%8A%BC%E3%81%995.mp3');
const clickSound = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E6%B1%BA%E5%AE%9A%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E6%8A%BC%E3%81%9950.mp3');
const cpuClickSound = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E5%8F%AF%E6%84%9B%E3%81%84%E5%8B%95%E4%BD%9C1%20(1).mp3');
const playerWinSound1 = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E3%81%A9%E3%82%93%E3%81%A9%E3%82%93%E3%83%91%E3%83%95%E3%83%91%E3%83%95.wav');
const playerWinSound2 = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E3%80%8C%E3%82%84%E3%81%A3%E3%81%9F%EF%BC%81%E3%80%8D.mp3');
const playerLoseSound1 = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E3%80%8C%E3%81%90%E3%81%82%E3%81%82%E3%83%BC%E3%83%BC%E3%81%A3%EF%BC%81%E3%80%8D%20(1).mp3');
const playerLoseSound2 = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E3%80%8C%E3%81%8F%E3%81%A3%E3%80%81%E3%81%93%E3%82%93%E3%81%AA%E3%81%AF%E3%81%9A%E3%81%A7%E3%81%AF%E2%80%A6%E2%80%A6%E3%80%8D.mp3');
const restartSound = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E6%B1%BA%E5%AE%9A%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E6%8A%BC%E3%81%9912.mp3');
const rouletteStartSound = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E9%9B%BB%E5%AD%90%E3%83%AB%E3%83%BC%E3%83%AC%E3%83%83%E3%83%88.mp3');
const rouletteStopSound = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E9%9B%BB%E5%AD%90%E3%83%AB%E3%83%BC%E3%83%AC%E3%83%83%E3%83%88%E5%81%9C%E6%AD%A2%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E6%8A%BC%E3%81%99.mp3');
const rouletteSpinSound = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E9%9B%BB%E5%AD%90%E3%83%AB%E3%83%BC%E3%83%AC%E3%83%83%E3%83%88%E5%9B%9E%E8%BB%A2%E4%B8%AD.mp3');
const drawSound = new Audio('https://raw.githubusercontent.com/nomuradarwin/SE/main/%E3%80%8C%E3%81%90%E3%81%82%E3%81%82%E3%83%BC%E3%83%BC%E3%81%A3%EF%BC%81%E3%80%8D%20(1).mp3');
rouletteSpinSound.loop = true; // ルーレット回転中の音をループ再生

// BGMのリストを設定
const bgms = [
    new Audio('https://raw.githubusercontent.com/nomuradarwin/BGM/main/Festival!.mp3'),
    new Audio('https://raw.githubusercontent.com/nomuradarwin/BGM/main/%E4%B8%AD%E5%9B%BD%E8%8C%B6.mp3'),
    new Audio('https://raw.githubusercontent.com/nomuradarwin/BGM/main/%E6%98%BC%E4%B8%8B%E3%81%8C%E3%82%8A%E6%B0%97%E5%88%86.mp3')
];
let currentBgm = bgms[Math.floor(Math.random() * bgms.length)];
currentBgm.volume = 0.1; // BGMの音量を10%に設定

// DOM要素の取得
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessageModal');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const turnIndicator = document.getElementById('turn-indicator');
const characterSelection = document.getElementById('characterSelection');
const characters = document.querySelectorAll('.character');


// 音量の設定
startSound.volume = 0.1; // ゲーム開始時の効果音の音量を10%に設定
clickSound.volume = 0.8; // プレイヤーがマスをクリックした時の効果音の音量を80%に設定
cpuClickSound.volume = 0.2; // CPUがマスをクリックした時の効果音の音量を20%に設定
playerWinSound1.volume = 0.05; // プレイヤーが勝った時の効果音1の音量を5%に設定
playerWinSound2.volume = 0.3; // プレイヤーが勝った時の効果音2の音量を30%に設定
playerLoseSound1.volume = 0.2; // プレイヤーが負けた時の効果音1の音量を20%に設定
playerLoseSound2.volume = 0.2; // プレイヤーが負けた時の効果音2の音量を20%に設定
restartSound.volume = 0.5; // "もう一度"ボタンを押した時の効果音の音量を50%に設定
rouletteStartSound.volume = 0.5; // ルーレット開始時の音量を50%に設定
rouletteStopSound.volume = 0.5; // ルーレット停止時の音量を50%に設定
rouletteSpinSound.volume = 0.2; // ルーレット回転中の音量を50%に設定
drawSound.volume = 0.2; // 引き分け時の効果音の音量を80%に設定

let gameActive = false; // ゲームの状態を追跡するフラグ
let currentClass = PLAYER_CLASS; // ルーレット用のクラス
let intervalId; // ルーレットのインターバルID

// 効果音を再生する関数
function playSound(sound) {
    const clone = sound.cloneNode();
    clone.volume = sound.volume;
    clone.play();
}

// 先攻後攻を決めるルーレットエフェクト
function startRoulette() {
    playSound(rouletteStartSound);
    rouletteSpinSound.play(); // ルーレット回転中の音を再生
    const interval = 100; // ルーレットの切り替え間隔
    intervalId = setInterval(() => {
        setTurnIndicator(currentClass);
        currentClass = currentClass === PLAYER_CLASS ? CPU_CLASS : PLAYER_CLASS;
    }, interval);
}

// ルーレット停止ボタンのイベントリスナー
stopButton.addEventListener('click', () => {
    playSound(rouletteStopSound);
    rouletteSpinSound.pause(); // ルーレット回転中の音を停止
    rouletteSpinSound.currentTime = 0; // 音を最初に戻す
    clearInterval(intervalId);
    const firstTurn = Math.random() < 0.5 ? PLAYER_CLASS : CPU_CLASS;
    setTurnIndicator(firstTurn);
    stopButton.classList.add('d-none');
    initGame(firstTurn);
});

// ゲーム開始ボタンのイベントリスナー
startButton.addEventListener('click', () => {
    playSound(startSound); // スタート効果音を再生
    $('#characterSelectionModal').modal('show'); // キャラクター選択モーダルを表示
});

// キャラクターを選択したときの処理
characters.forEach(character => {
    character.addEventListener('click', () => {
        const selectedCharacter = character.getAttribute('data-character');
        console.log(`${selectedCharacter}が選択されました`);

        // プレイヤーが選んだキャラクターを設定
        PLAYER_IMAGE_URL = character.querySelector('img').src;

        // ランダムにCPUのキャラクターを選択
        const cpuCharacterIndex = Math.floor(Math.random() * characters.length);
        const cpuCharacter = characters[cpuCharacterIndex];
        CPU_IMAGE_URL = cpuCharacter.querySelector('img').src;
        console.log(`CPUは${cpuCharacter.getAttribute('data-character')}を選択しました`);

        // キャラクター選択モーダルを閉じる
        $('#characterSelectionModal').modal('hide');

        // ゲーム開始処理
        turnIndicator.classList.remove('d-none');
        board.classList.remove('d-none');
        stopButton.classList.remove('d-none');
        currentBgm.play(); // BGMの再生
        startButton.style.display = 'none'; // Game Start ボタンを非表示にする
        startRoulette(); // ルーレット開始
    });
});






// ゲームを初期化して開始する関数
function initGame(firstTurn) {
    gameActive = true; // ゲームがアクティブ
    playerMoves = []; // プレイヤーのマスを初期化
    cpuMoves = []; // CPUのマスを初期化
    
    cellElements.forEach(cell => {
        cell.classList.remove(PLAYER_CLASS);
        cell.classList.remove(CPU_CLASS);
        cell.innerHTML = ''; // 画像をクリア
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass(firstTurn);
    setTurnIndicator(firstTurn);
    if (firstTurn === CPU_CLASS) {
        setTimeout(cpuMove, 500); // CPUが先攻の場合、すぐにCPUのターンを実行
    }
}

// セルをクリックしたときの処理
function handleClick(e) {
    if (!gameActive) return; // ゲームがアクティブでない場合は何もしない
    playSound(clickSound); // クリック効果音を再生
    const cell = e.target;
    placeMark(cell, PLAYER_CLASS, PLAYER_IMAGE_URL);

    if (checkWin(PLAYER_CLASS)) {
        playSound(playerWinSound1);
        playSound(playerWinSound2);
        endGame(false, PLAYER_CLASS);
    } else if (isDraw()) {
        playSound(drawSound); // 引き分け時の効果音を再生
        endGame(true);
    } else {
        swapTurns(CPU_CLASS); // CPUのターンに切り替え
        setTimeout(() => {
            cpuMove(); // プレイヤーのターンが終わった後にCPUが動く
        }, 500); // 0.5秒の遅延を追加
    }
}

// ターンを入れ替える
function swapTurns(currentClass) {
    setBoardHoverClass(currentClass);
    setTurnIndicator(currentClass);
    if (currentClass === CPU_CLASS) {
        setTimeout(cpuMove, 500); // CPUのターンが来たらCPUが動く
    }
}

// CPUの動きを設定する関数
function cpuMove() {
    const availableCells = [...cellElements].filter(cell => {
        return !cell.classList.contains(PLAYER_CLASS) && !cell.classList.contains(CPU_CLASS);
    });
    if (availableCells.length > 0) {
        let cell;
        const cpuLevel = document.getElementById('cpuLevel').value;

        if (cpuLevel === 'weak') {
            // 弱い: ランダムなマスに置く
            const randomIndex = Math.floor(Math.random() * availableCells.length);
            cell = availableCells[randomIndex];
        } else if (cpuLevel === 'normal') {
            // 普通: ランダムに選ぶが、少し勝利パターンを狙う
            cell = chooseBestMove(availableCells, CPU_CLASS) || availableCells[Math.floor(Math.random() * availableCells.length)];
        } else if (cpuLevel === 'strong') {
            // 強い: 勝利できるパターンを最優先
            cell = chooseBestMove(availableCells, CPU_CLASS) || chooseBestMove(availableCells, PLAYER_CLASS) || availableCells[Math.floor(Math.random() * availableCells.length)];
        }

        playSound(cpuClickSound); // CPUのクリック効果音を再生
        placeMark(cell, CPU_CLASS, CPU_IMAGE_URL);
        if (checkWin(CPU_CLASS)) {
            const loseSound = Math.random() < 0.5 ? playerLoseSound1 : playerLoseSound2;
            playSound(loseSound);
            endGame(false, CPU_CLASS);
        } else if (isDraw()) {
            playSound(drawSound); // 引き分け時の効果音を再生
            endGame(true);
        } else {
            swapTurns(PLAYER_CLASS); // 再びプレイヤーのターンに切り替え
        }
    }
}


// 最適な手を選ぶための関数（単純な勝利チェックに基づく）
function chooseBestMove(cells, currentClass) {
    return cells.find(cell => {
        cell.classList.add(currentClass);
        const isWinningMove = checkWin(currentClass);
        cell.classList.remove(currentClass);
        return isWinningMove;
    });
}

// ゲーム終了の処理
function endGame(draw, winningClass) {
    gameActive = false; // ゲームを非アクティブにする
    if (draw) {
        playSound(drawSound); // 引き分け時の効果音を再生
        winningMessageTextElement.innerText = '引き分け!';
    } else {
        winningMessageTextElement.innerText = `${winningClass === CPU_CLASS ? "CPU" : "あなた"}の勝ち!`;
    }
    $(winningMessageElement).modal('show'); // モーダルを表示
}

// 引き分けかどうかの確認
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(PLAYER_CLASS) || cell.classList.contains(CPU_CLASS);
    });
}

// 追跡用リスト
let playerMoves = [];
let cpuMoves = [];

function placeMark(cell, currentClass, imageUrl) {
    // マスに既にマークが存在する場合は、何もしない
    if (cell.classList.contains(PLAYER_CLASS) || cell.classList.contains(CPU_CLASS)) {
        return;
    }

    // マスにマークを追加
    cell.classList.add(currentClass);
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.width = '80%';
    img.style.height = '80%';
    cell.appendChild(img);

    // 現在のクラスがプレイヤーの場合
    if (currentClass === PLAYER_CLASS) {
        playerMoves.push(cell);
        if (playerMoves.length > 3) {
            const firstCell = playerMoves.shift(); // 最初のマスを取り除く
            firstCell.classList.remove(PLAYER_CLASS);
            firstCell.innerHTML = ''; // 画像を消去
            firstCell.addEventListener('click', handleClick, { once: true }); // クリックイベントを再追加
        }
    }

    // 現在のクラスがCPUの場合
    if (currentClass === CPU_CLASS) {
        cpuMoves.push(cell);
        if (cpuMoves.length > 3) {
            const firstCell = cpuMoves.shift(); // 最初のマスを取り除く
            firstCell.classList.remove(CPU_CLASS);
            firstCell.innerHTML = ''; // 画像を消去
            firstCell.addEventListener('click', handleClick, { once: true }); // クリックイベントを再追加
        }
    }
}

// ターンを入れ替える
function swapTurns(currentClass) {
    setBoardHoverClass(currentClass);
    setTurnIndicator(currentClass);
}

// ホバー時のクラス設定
function setBoardHoverClass(currentClass) {
    board.classList.remove(PLAYER_CLASS);
    board.classList.remove(CPU_CLASS);
    if (currentClass === PLAYER_CLASS) {
        board.classList.add('player-turn');
    } else {
        board.classList.add('cpu-turn');
    }
}

// ターンインジケーターの設定
function setTurnIndicator(currentClass) {
    turnIndicator.innerText = currentClass === PLAYER_CLASS ? "あなたのターン" : "CPUのターン";
    if (currentClass === PLAYER_CLASS) {
        turnIndicator.style.borderColor = 'yellow';
    } else {
        turnIndicator.style.borderColor = 'red';
    }
}

// 勝利条件のチェック
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

// リスタートボタンのイベントリスナー
restartButton.addEventListener('click', async () => {
    playSound(restartSound);
    currentBgm.pause(); // 現在のBGMを停止
    currentBgm = bgms[Math.floor(Math.random() * bgms.length)]; // 新しいBGMをランダムに選択
    currentBgm.volume = 0.1; // BGMの音量を10%に設定
    currentBgm.play(); // 新しいBGMを再生
    $(winningMessageElement).modal('hide'); // モーダルを隠す
    stopButton.classList.remove('d-none');
    startRoulette();
    resetBoard(); // ボードをリセット
});

// ボードをリセットする関数
function resetBoard() {
    cellElements.forEach(cell => {
        cell.classList.remove(PLAYER_CLASS);
        cell.classList.remove(CPU_CLASS);
        cell.innerHTML = ''; // 画像をクリア
    });
}
