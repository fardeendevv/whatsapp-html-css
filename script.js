var contacts = [
  {
    id: 1,
    name: "ali",
    bg: "#1a1f3a",
    color: "#7c83fd",
    initials: "A",
    online: true,
    status: "online",
    time: "10:42 AM",
    preview: "Bhai aaj meeting kab hai",
    unread: 2,
    messages: [
      { dir: "incoming", text: "Assalamualaikum bhai, kya haal hai", time: "10:30 AM" },
      { dir: "outgoing", text: "Walaikumsalam Ali, sab theek hai alhamdulillah. Tum sunao?", time: "10:31 AM", tick: "read" },
      { dir: "incoming", text: "Theek hun yaar. Project ke baare mein baat karni thi kuch.", time: "10:33 AM" },
      { dir: "outgoing", text: "Bilkul bolo, main sun raha hun.", time: "10:35 AM", tick: "read" },
      { dir: "incoming", text: "Frontend wala bug finally fix ho gaya. Ab sirf backend integration baaki hai.", time: "10:38 AM" },
      { dir: "incoming", text: "Finally", time: "10:42 AM" }
    ]
  },
  {
    id: 2,
    name: "Ahmed",
    bg: "#2a1a16",
    color: "#e17055",
    initials: "A",
    online: false,
    status: "last seen today at 9:15 AM",
    time: "9:15 AM",
    preview: "Okay sure, I will send you the file",
    unread: 0,
    messages: [
      { dir: "outgoing", text: "AHmad kya tum design files share kar sakty ho mujhe", time: "9:00 AM", tick: "read" },
      { dir: "incoming", text: "Haan krdeta hu. Kaunsi wali chahiye?", time: "9:05 AM" },
      { dir: "outgoing", text: "Homepage aur dashboard wali please", time: "9:08 AM", tick: "read" },
      { dir: "incoming", text: "Okay sure, I will send you the file", time: "9:15 AM" }
    ]
  },
  {
    id: 3,
    name: "boiii",
    bg: "#2a2416",
    color: "#fdcb6e",
    initials: "B",
    online: false,
    status: "5 members",
    time: "Yesterday",
    preview: "Umar: sham mai milty hain",
    unread: 4,
    messages: [
      { dir: "incoming", text: "hi guy's",  time: "Yesterday", sender: "Ali" },
      { dir: "outgoing", text: "Hii", time: "Yesterday", tick: "read" },
      { dir: "incoming", text: "sb kese ho?", time: "Yesterday", sender: "Ahmad" },
      { dir: "incoming", text: "koi plan hai", time: "Yesterday", sender: "Ahmad" },
      { dir: "incoming", text: "sham mai milty hain", time: "Yesterday", sender: "Umar" }
    ]
  },
  {
    id: 4,
    name: "Umar",
    bg: "#16281e",
    color: "#55efc4",
    initials: "U",
    online: false,
    status: "last seen today at 8:00 AM",
    time: "Monday",
    preview: "Check this new JavaScript library out",
    unread: 0,
    messages: [
      { dir: "incoming", text: "Bhai kya seen hai koi match hai?.", time: "Monday" },
      { dir: "outgoing", text: "Mera khayal hai ke iss week mai hai", time: "Monday", tick: "sent" },
      { dir: "incoming", text: "confirm krde", time: "Monday" }
    ]
  },
  {
    id: 5,
    name: "Mama",
    bg: "#1e1628",
    color: "#a29bfe",
    initials: "Ma",
    online: true,
    status: "online",
    time: "Yesterday",
    preview: "Beta ghar kab aao ge",
    unread: 1,
    messages: [
      { dir: "incoming", text: "Beta khana kha liya?", time: "1:00 PM" },
      { dir: "outgoing", text: "G Mama kha liya, fikar mat karien", time: "1:05 PM", tick: "read" },
      { dir: "incoming", text: "Beta ghar kab aao ge", time: "Yesterday" }
    ]
  }
];

var activeId = null;

function renderChatList(filter) {
  filter = filter || "";
  var list = document.getElementById("chatList");
  list.innerHTML = "";
  contacts
    .filter(function(c) { return c.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1; })
    .forEach(function(c) {
      var row = document.createElement("div");
      row.className = "chat-row" + (activeId === c.id ? " active" : "");
      row.innerHTML =
        '<div class="avatar" style="background:' + c.bg + ';color:' + c.color + ';">' +
          c.initials +
          (c.online ? '<div class="dot"></div>' : '') +
        '</div>' +
        '<div class="chat-info">' +
          '<div class="chat-top">' +
            '<span class="chat-name">' + c.name + '</span>' +
            '<span class="chat-time' + (c.unread ? ' has-unread' : '') + '">' + c.time + '</span>' +
          '</div>' +
          '<div class="chat-bottom">' +
            '<span class="chat-preview">' + c.preview + '</span>' +
            (c.unread ? '<span class="unread-count">' + c.unread + '</span>' : '') +
          '</div>' +
        '</div>';
      row.onclick = function() { openChat(c.id); };
      list.appendChild(row);
    });
}

function openChat(id) {
  activeId = id;
  var c = contacts.filter(function(x) { return x.id === id; })[0];
  c.unread = 0;
  renderChatList(document.getElementById("searchInput").value);

  var main = document.getElementById("chatMain");
  main.innerHTML =
    '<div class="chat-main-header">' +
      '<div class="avatar" style="width:42px;height:42px;font-size:15px;background:' + c.bg + ';color:' + c.color + ';">' +
        c.initials +
        (c.online ? '<div class="dot"></div>' : '') +
      '</div>' +
      '<div class="chat-info-header">' +
        '<div class="chat-contact-name">' + c.name + '</div>' +
        '<div class="chat-contact-status">' + c.status + '</div>' +
      '</div>' +
      '<div class="header-right">' +
        '<button class="btn-icon" title="Search in chat">' +
          '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>' +
        '</button>' +
        '<button class="btn-icon" title="More options">' +
          '<svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<div class="messages-wrap" id="msgList"></div>' +
    '<div class="input-row">' +
      '<div class="input-field-wrap">' +
        '<button class="btn-icon" title="Attach file" style="color:#8696a0;">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>' +
        '</button>' +
        '<textarea id="msgInput" placeholder="Type a message" rows="1" ' +
          'onkeydown="handleKey(event)" oninput="autoGrow(this)"></textarea>' +
      '</div>' +
      '<button class="send-btn" onclick="sendMessage()" title="Send">' +
        '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>' +
      '</button>' +
    '</div>';

  paintMessages(c);

  var inp = document.getElementById("msgInput");
  if (inp) inp.focus();
}

function paintMessages(c) {
  var list = document.getElementById("msgList");
  if (!list) return;
  list.innerHTML = '<div class="date-divider"><span>Today</span></div>';

  c.messages.forEach(function(m) {
    var row = document.createElement("div");
    row.className = "message-row " + m.dir;

    var tickHtml = "";
    if (m.dir === "outgoing") {
      var cls = m.tick === "read" ? "read" : "sent";
      tickHtml = '<span class="tick ' + cls + '">&#10003;&#10003;</span>';
    }

    var senderHtml = m.sender ? '<div class="bubble-sender">' + m.sender + '</div>' : "";

    row.innerHTML =
      '<div class="bubble">' +
        senderHtml +
        m.text +
        '<div class="bubble-footer">' +
          '<span class="bubble-time">' + m.time + '</span>' +
          tickHtml +
        '</div>' +
      '</div>';

    list.appendChild(row);
  });

  if (c.id === 1) {
    var tr = document.createElement("div");
    tr.className = "typing-row";
    tr.innerHTML =
      '<div class="typing-bubble">' +
        '<div class="typing-dot"></div>' +
        '<div class="typing-dot"></div>' +
        '<div class="typing-dot"></div>' +
      '</div>';
    list.appendChild(tr);
  }

  list.scrollTop = list.scrollHeight;
}

function sendMessage() {
  var c = contacts.filter(function(x) { return x.id === activeId; })[0];
  var inp = document.getElementById("msgInput");
  if (!inp || !c) return;

  var text = inp.value.trim();
  if (!text) return;

  var now = new Date();
  var t = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  c.messages.push({ dir: "outgoing", text: text, time: t, tick: "sent" });
  c.preview = text;
  c.time = t;

  inp.value = "";
  inp.style.height = "auto";
  paintMessages(c);
  renderChatList(document.getElementById("searchInput").value);

  setTimeout(function() {
    var replies = [
      "Theek hai samajh gaya",
      "Okay main dekh leta hun",
      "Han bilkul, thoda time do",
      "Sure bhai, reply karta hun thodi der mein",
      "Got it, will get back to you",
      "Kal tak ho jayega inshallah",
      "Theek hai no problem"
    ];
    var r = replies[Math.floor(Math.random() * replies.length)];
    var rt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    c.messages.push({ dir: "incoming", text: r, time: rt });
    c.preview = r;
    c.time = rt;
    paintMessages(c);
    renderChatList(document.getElementById("searchInput").value);
  }, 1000 + Math.random() * 700);
}

function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoGrow(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 100) + "px";
}

function filterChats(q) {
  renderChatList(q);
}

renderChatList();
