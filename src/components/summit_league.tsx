

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SmartCoaching Admin - 써밋 리그 관리</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Malgun Gothic', '맑은 고딕', sans-serif; font-size: 13px; background: #f0f2f5; color: #333; }

  /* ── TOP NAV ── */
  /* ── GNB ── */
  .top-nav {
    background: #fff;
    border-bottom: 1px solid #d8e4ed;
    display: flex;
    align-items: center;
    padding: 0 0 0 16px;
    height: 72px;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  }
  /* 로고 + 유저 정보 영역 */
  .logo-wrap {
    display: flex; flex-direction: column; justify-content: center;
    min-width: 148px; padding-right: 16px;
    border-right: 1px solid #e0eaf2; height: 100%;
  }
  .logo { font-size: 17px; font-weight: 800; color: #777; letter-spacing: -0.3px; line-height: 1.2; }
  .logo span { color: #3a8dbf; }
  .user-info { font-size: 11px; color: #999; margin-top: 3px; white-space: nowrap; }
  .user-info span { color: #4a90b8; cursor: pointer; text-decoration: underline; margin: 0 3px; }
  /* GNB 메뉴 */
  .top-menu { display: flex; gap: 0; flex: 1; height: 100%; align-items: stretch; }
  .top-menu-item {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 0 20px; cursor: pointer; color: #888;
    transition: color .2s; gap: 5px; font-size: 12px; font-weight: 500;
    border-bottom: 3px solid transparent; position: relative;
    white-space: nowrap;
  }
  .top-menu-item:hover { color: #3a8dbf; }
  .top-menu-item.active { color: #3a8dbf; border-bottom-color: #3a8dbf; font-weight: 700; }
  .gnb-icon { display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; }

  /* ── LAYOUT ── */
  .layout { display: flex; min-height: calc(100vh - 72px); }

  /* ── SIDEBAR (LNB) ── */
  .sidebar {
    width: 200px; background: #f4f8fb; border-right: 1px solid #d8e4ed;
    padding: 0; flex-shrink: 0;
  }
  .sidebar-header {
    background: #e8f2f9; padding: 18px 0 14px;
    border-bottom: 1px solid #cdd8e4; text-align: center;
  }
  .sidebar-title {
    font-size: 14px; font-weight: 700; color: #2c5f7a;
    padding: 0 16px 10px; text-align: left;
  }
  .sidebar-user-icon {
    display: flex; align-items: center; justify-content: center;
    padding: 4px 0;
  }
  .sidebar-item {
    padding: 11px 20px 11px 18px; cursor: pointer; color: #4a6378;
    transition: all .15s; border-left: 3px solid transparent;
    font-size: 12.5px; display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid #e5edf4;
  }
  .sidebar-item:hover { background: #ddeef8; color: #2c5f7a; border-left-color: #4a90b8; }
  .sidebar-item.active {
    background: #d4e8f5; color: #1d4f6b; font-weight: 700;
    border-left-color: #2c7db8;
  }
  .sidebar-item.active::after { content: "—"; font-size: 11px; color: #7aaecb; font-weight: 400; }

  /* ── MAIN CONTENT ── */
  .main { flex: 1; padding: 24px 28px; overflow-x: auto; }

  /* ── PAGE HEADER ── */
  .page-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 20px;
  }
  .page-title { font-size: 20px; font-weight: 700; color: #1a3c52; }
  .breadcrumb { font-size: 12px; color: #999; }
  .breadcrumb span { color: #4a90b8; }

  /* ── CARDS / SECTIONS ── */
  .card {
    background: #fff; border: 1px solid #dde3ea; border-radius: 8px;
    padding: 20px 24px; margin-bottom: 16px;
  }
  .card-title {
    font-size: 14px; font-weight: 700; color: #2c5f7a; margin-bottom: 16px;
    padding-bottom: 10px; border-bottom: 1px solid #eef2f7;
    display: flex; align-items: center; gap: 8px;
  }
  .card-title::before { content: ''; width: 4px; height: 16px; background: #4a90b8; border-radius: 2px; display: inline-block; }

  /* ── BUTTONS ── */
  .btn {
    padding: 7px 16px; border-radius: 5px; border: none; cursor: pointer;
    font-size: 12.5px; font-weight: 600; transition: all .2s;
  }
  .btn-primary { background: #4a90b8; color: #fff; }
  .btn-primary:hover { background: #3a7aa8; }
  .btn-secondary { background: #fff; color: #4a90b8; border: 1px solid #4a90b8; }
  .btn-secondary:hover { background: #e8f4fb; }
  .btn-danger { background: #e74c3c; color: #fff; }
  .btn-danger:hover { background: #c0392b; }
  .btn-sm { padding: 4px 10px; font-size: 11.5px; }
  .btn-gray { background: #e0e6ec; color: #555; border: 1px solid #ccc; }
  .btn-green { background: #27ae60; color: #fff; }
  .btn-orange { background: #e67e22; color: #fff; }

  /* ── TABLES ── */
  table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  thead tr { background: #4a90b8; color: #fff; }
  thead th { padding: 10px 12px; text-align: center; font-weight: 600; }
  tbody tr { border-bottom: 1px solid #eef2f7; }
  tbody tr:hover { background: #f7fbfe; }
  tbody td { padding: 9px 12px; text-align: center; vertical-align: middle; }
  tbody td.left { text-align: left; }

  /* ── BADGE ── */
  .badge { padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; white-space: nowrap; }
  .badge-blue { background: #e3f0fb; color: #4a90b8; }
  .badge-green { background: #e6f9f0; color: #27ae60; }
  .badge-gray { background: #f0f0f0; color: #888; }
  .badge-red { background: #fde8e8; color: #e74c3c; }
  .badge-orange { background: #fef3e2; color: #e67e22; }

  /* ── FORM ── */
  .form-group { display: flex; flex-direction: column; gap: 5px; }
  .form-label { font-size: 12px; font-weight: 600; color: #555; }
  .form-input, .form-select {
    border: 1px solid #cdd5de; border-radius: 5px; padding: 7px 10px;
    font-size: 12.5px; color: #333; font-family: inherit;
    transition: border-color .2s;
  }
  .form-input:focus, .form-select:focus { outline: none; border-color: #4a90b8; }
  .form-textarea {
    border: 1px solid #cdd5de; border-radius: 5px; padding: 10px;
    font-size: 12.5px; color: #333; font-family: inherit; resize: vertical;
    min-height: 100px; width: 100%;
  }
  .form-row { display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
  .form-row-2 { display: grid; gap: 16px; grid-template-columns: repeat(2, 1fr); }

  /* ── TABS ── */
  .tabs { display: flex; gap: 0; border-bottom: 2px solid #4a90b8; margin-bottom: 20px; }
  .tab {
    padding: 10px 20px; cursor: pointer; font-size: 13px; font-weight: 600;
    color: #888; border: 1px solid #dde3ea; border-bottom: none;
    background: #f5f7fa; border-radius: 6px 6px 0 0; margin-right: 4px;
    transition: all .2s;
  }
  .tab.active { background: #fff; color: #4a90b8; border-bottom: 2px solid #fff; margin-bottom: -2px; }
  .tab:hover:not(.active) { background: #e8f4fb; }

  /* ── SEARCH BOX ── */
  .search-box {
    background: #f7fbfe; border: 1px solid #dde3ea; border-radius: 6px;
    padding: 16px 20px; margin-bottom: 16px;
  }
  .search-title { font-weight: 700; color: #4a90b8; margin-bottom: 12px; font-size: 13px; }
  .search-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 12px; }
  .search-row { display: flex; align-items: center; gap: 8px; }
  .search-label { font-size: 12px; color: #555; font-weight: 600; white-space: nowrap; min-width: 70px; }

  /* ── STATS BOXES ── */
  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
  .stat-box {
    background: #fff; border: 1px solid #dde3ea; border-radius: 8px;
    padding: 16px; text-align: center;
  }
  .stat-label { font-size: 11px; color: #999; margin-bottom: 6px; }
  .stat-value { font-size: 24px; font-weight: 700; color: #2c5f7a; }
  .stat-value.blue { color: #4a90b8; }
  .stat-value.green { color: #27ae60; }
  .stat-value.orange { color: #e67e22; }

  /* ── MODAL ── */
  .modal-overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,0.4); z-index: 999; align-items: center; justify-content: center;
  }
  .modal-overlay.show { display: flex; }
  .modal {
    background: #fff; border-radius: 10px; width: 520px; max-height: 90vh;
    overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  }
  .modal-header {
    padding: 18px 24px; border-bottom: 1px solid #eef2f7;
    display: flex; justify-content: space-between; align-items: center;
  }
  .modal-title { font-size: 15px; font-weight: 700; color: #1a3c52; }
  .modal-close { cursor: pointer; font-size: 20px; color: #999; line-height: 1; }
  .modal-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
  .modal-footer {
    padding: 16px 24px; border-top: 1px solid #eef2f7;
    display: flex; justify-content: flex-end; gap: 8px;
  }

  /* ── PAGE SECTIONS (hidden/shown) ── */
  .page-section { display: none; }
  .page-section.active { display: block; }

  /* ── NOTICE ── */
  .notice {
    background: #fff8e1; border: 1px solid #ffe082; border-radius: 6px;
    padding: 10px 16px; font-size: 12px; color: #795548; margin-bottom: 16px;
  }
  .notice.info { background: #e3f2fd; border-color: #90caf9; color: #1565c0; }
  .notice.danger { background: #fde8e8; border-color: #f5b5b5; color: #c0392b; }

  /* ── SCHEDULE TABLE ── */
  .schedule-table table thead tr { background: #5ba3c9; }
  .schedule-table input[type="date"], .schedule-table input[type="time"] {
    border: 1px solid #cdd5de; border-radius: 4px; padding: 4px 6px;
    font-size: 12px; font-family: inherit;
  }
  .schedule-table input[type="date"]:focus, .schedule-table input[type="time"]:focus {
    outline: none; border-color: #4a90b8;
  }
  .row-holiday { background: #edf6ff !important; }
  .row-holiday td { color: #4a90b8; font-weight: 600; }

  /* ── RESULT TABLE ── */
  .result-range { display: flex; align-items: center; gap: 6px; justify-content: center; }
  .result-range input { width: 60px; text-align: center; }

  /* ── GIFT TABS ── */
  .sub-tabs { display: flex; gap: 4px; margin-bottom: 16px; }
  .sub-tab {
    padding: 7px 16px; border-radius: 20px; cursor: pointer; font-size: 12.5px;
    font-weight: 600; background: #f0f2f5; color: #888; border: 1px solid #dde3ea;
    transition: all .2s;
  }
  .sub-tab.active { background: #4a90b8; color: #fff; border-color: #4a90b8; }

  /* ── ADJUST BUTTONS ── */
  .adj-btn {
    width: 22px; height: 22px; border-radius: 50%; border: 1px solid #ccc;
    background: #fff; cursor: pointer; font-weight: 700; font-size: 13px;
    display: inline-flex; align-items: center; justify-content: center;
    transition: all .2s;
  }
  .adj-btn:hover { background: #4a90b8; color: #fff; border-color: #4a90b8; }
  .adj-highlight { background: #fff9c4; font-weight: 700; }
  .adj-warn { color: #e74c3c; font-weight: 700; }

  /* total row */
  .total-row { background: #e8f4fb !important; font-weight: 700; }
  .total-row td { color: #2c5f7a; }

  /* footer buttons */
  .action-footer {
    display: flex; justify-content: flex-end; gap: 8px;
    padding: 16px 0; border-top: 1px solid #eee; margin-top: 16px;
  }

  .count-badge {
    background: #e8f4fb; color: #4a90b8; font-weight: 700;
    padding: 4px 12px; border-radius: 4px; font-size: 13px;
    border: 1px solid #c0dced; display: inline-block; margin-bottom: 12px;
  }

  .detail-modal { width: 700px; }
</style>
</head>
<body>

<!-- TOP NAV -->
<div class="top-nav">
  <!-- 로고 + 유저 정보 묶음 -->
  <div class="logo-wrap">
    <div class="logo">SMART <span>COACHING</span></div>
    <div class="user-info">김전호님 <span>개인정보수정</span> 로그아웃</div>
  </div>
  <!-- GNB 메뉴 -->
  <div class="top-menu">
    <div class="top-menu-item">
      <span class="gnb-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="8" height="8" rx="1.5" fill="currentColor" opacity=".6"/><rect x="12" y="2" width="8" height="8" rx="1.5" fill="currentColor" opacity=".6"/><rect x="2" y="12" width="8" height="8" rx="1.5" fill="currentColor" opacity=".6"/><rect x="12" y="12" width="8" height="8" rx="1.5" fill="currentColor" opacity=".6"/></svg></span>
      회원관리
    </div>
    <div class="top-menu-item">
      <span class="gnb-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="4" width="16" height="2.5" rx="1.25" fill="currentColor"/><rect x="3" y="9.75" width="16" height="2.5" rx="1.25" fill="currentColor"/><rect x="3" y="15.5" width="10" height="2.5" rx="1.25" fill="currentColor"/></svg></span>
      교사/센터관리
    </div>
    <div class="top-menu-item">
      <span class="gnb-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="4" y="3" width="14" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 8h8M7 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span>
      제품관리
    </div>
    <div class="top-menu-item active">
      <span class="gnb-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2l2.5 5.5H19l-4.5 3.5 1.7 5.5L11 13.5 5.8 16.5l1.7-5.5L3 7.5h5.5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></span>
      써밋 리그 관리
    </div>
    <div class="top-menu-item">
      <span class="gnb-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="14" width="3" height="5" rx="1" fill="currentColor"/><rect x="9.5" y="9" width="3" height="10" rx="1" fill="currentColor"/><rect x="16" y="4" width="3" height="15" rx="1" fill="currentColor"/></svg></span>
      통계관리
    </div>
    <div class="top-menu-item">
      <span class="gnb-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="4" stroke="currentColor" stroke-width="2"/><path d="M11 3v2M11 17v2M3 11h2M17 11h2M5.4 5.4l1.4 1.4M15.2 15.2l1.4 1.4M5.4 16.6l1.4-1.4M15.2 6.8l1.4-1.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span>
      시스템관리
    </div>
    <div class="top-menu-item">
      <span class="gnb-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="7" width="16" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 7V5a4 4 0 018 0v2" stroke="currentColor" stroke-width="1.8"/></svg></span>
      API 관리
    </div>
  </div>
</div>

<div class="layout">

  <!-- SIDEBAR -->
  <div class="sidebar">
    <!-- 섹션 타이틀 + 사용자 아이콘 -->
    <div class="sidebar-header">
      <div class="sidebar-title">써밋 리그 관리</div>
      <div class="sidebar-user-icon">
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <circle cx="19" cy="19" r="18" fill="#dde8f0" stroke="#c5d8e8" stroke-width="1.5"/>
          <circle cx="19" cy="15" r="6" fill="#8fb4cc"/>
          <path d="M7 34c0-6.627 5.373-12 12-12h0c6.627 0 12 5.373 12 12" fill="#8fb4cc"/>
        </svg>
      </div>
    </div>
    <!-- 메뉴 항목 -->
    <div class="sidebar-item" onclick="showPage('league-list')">리그 목록 관리</div>
    <div class="sidebar-item" onclick="showLeagueDetail('2026_winter')">리그 정책 관리</div>
    <div class="sidebar-item" onclick="showPage('group-assign')">써밋 리그 조 편성</div>
    <div class="sidebar-item" onclick="showPage('member-manage')">써밋 리그 회원 관리</div>
    <div class="sidebar-item" onclick="showPage('apply-stats')">써밋 리그 신청 통계</div>
    <div class="sidebar-item" onclick="showPage('apply-status')">써밋 리그 신청 현황</div>
    <div class="sidebar-item" onclick="showPage('gift-manage')">선물 관리</div>
    <div class="sidebar-item" onclick="showPage('result-manage')">써밋 리그 결과 관리</div>
  </div>

  <!-- MAIN -->
  <div class="main">

    <!-- ══════════════════════════════════════════════ -->
    <!-- PAGE 1: 리그 목록 관리 -->
    <!-- ══════════════════════════════════════════════ -->
    <div id="page-league-list" class="page-section active">
      <div class="page-header">
        <div class="page-title">리그 목록 관리</div>
        <div class="breadcrumb">🏠 > 써밋 리그 관리 > <span>리그 목록 관리</span></div>
      </div>

      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <div style="display:flex; gap:8px; align-items:center;">
            <select class="form-select" style="width:100px;"><option>전체 연도</option><option>2026</option><option>2025</option></select>
            <select class="form-select" style="width:110px;"><option>전체 시즌</option><option>윈터리그</option><option>서머리그</option></select>
            <select class="form-select" style="width:100px;"><option>전체 상태</option><option>예정</option><option>진행중</option><option>종료</option></select>
            <button class="btn btn-primary">검색</button>
          </div>
          <button class="btn btn-primary" onclick="showPage('league-detail')">+ 리그 생성</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>No</th><th>리그명</th><th>시즌</th>
              <th>운영 기간</th><th>참여 인원</th><th>상태</th><th>관리</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>7</td>
              <td class="left"><b>2026 윈터 리그오브매스</b></td>
              <td><span class="badge badge-blue">윈터리그</span></td>
              <td>2026.01.12 ~ 2026.03.01</td>
              <td>43,428명</td>
              <td><span class="badge badge-green">진행중</span></td>
              <td><button class="btn btn-secondary btn-sm" onclick="showLeagueDetail('2026_winter')">상세관리</button> <button class="btn btn-gray btn-sm" onclick="showPage('group-assign')" style="margin-left:4px;">조 편성</button></td>
            </tr>
            <tr>
              <td>6</td>
              <td class="left">2025 서머 리그오브매스</td>
              <td><span class="badge badge-orange">서머리그</span></td>
              <td>2025.07.14 ~ 2025.09.06</td>
              <td>38,204명</td>
              <td><span class="badge badge-gray">종료</span></td>
              <td><button class="btn btn-secondary btn-sm" onclick="showLeagueDetail('2025_summer')">상세관리</button> <button class="btn btn-gray btn-sm" style="margin-left:4px;">조 편성</button> <button class="btn btn-primary btn-sm" style="margin-left:4px;" onclick="showPage('result-manage')">결과보기</button></td>
            </tr>
            <tr>
              <td>5</td>
              <td class="left">2025 윈터 리그오브매스</td>
              <td><span class="badge badge-blue">윈터리그</span></td>
              <td>2025.01.13 ~ 2025.03.01</td>
              <td>35,190명</td>
              <td><span class="badge badge-gray">종료</span></td>
              <td><button class="btn btn-secondary btn-sm" onclick="showLeagueDetail('2025_winter')">상세관리</button> <button class="btn btn-gray btn-sm" style="margin-left:4px;">조 편성</button> <button class="btn btn-primary btn-sm" style="margin-left:4px;" onclick="showPage('result-manage')">결과보기</button></td>
            </tr>
            <tr>
              <td>4</td>
              <td class="left">2024 서머 리그오브매스</td>
              <td><span class="badge badge-orange">서머리그</span></td>
              <td>2024.07.15 ~ 2024.09.07</td>
              <td>33,817명</td>
              <td><span class="badge badge-gray">종료</span></td>
              <td><button class="btn btn-secondary btn-sm" onclick="showLeagueDetail('2024_summer')">상세관리</button> <button class="btn btn-gray btn-sm" style="margin-left:4px;">조 편성</button> <button class="btn btn-primary btn-sm" style="margin-left:4px;" onclick="showPage('result-manage')">결과보기</button></td>
            </tr>
            <tr>
              <td>3</td>
              <td class="left">2024 윈터 리그오브매스</td>
              <td><span class="badge badge-blue">윈터리그</span></td>
              <td>2024.01.08 ~ 2024.02.24</td>
              <td>31,042명</td>
              <td><span class="badge badge-gray">종료</span></td>
              <td><button class="btn btn-secondary btn-sm" onclick="showLeagueDetail('2024_winter')">상세관리</button> <button class="btn btn-gray btn-sm" style="margin-left:4px;">조 편성</button> <button class="btn btn-primary btn-sm" style="margin-left:4px;" onclick="showPage('result-manage')">결과보기</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td class="left">2023 서머 리그오브매스</td>
              <td><span class="badge badge-orange">서머리그</span></td>
              <td>2023.07.17 ~ 2023.09.02</td>
              <td>28,350명</td>
              <td><span class="badge badge-gray">종료</span></td>
              <td><button class="btn btn-secondary btn-sm" onclick="showLeagueDetail('2023_summer')">상세관리</button> <button class="btn btn-gray btn-sm" style="margin-left:4px;">조 편성</button> <button class="btn btn-primary btn-sm" style="margin-left:4px;" onclick="showPage('result-manage')">결과보기</button></td>
            </tr>
            <tr>
              <td>1</td>
              <td class="left">2023 윈터 리그오브매스</td>
              <td><span class="badge badge-blue">윈터리그</span></td>
              <td>2023.01.09 ~ 2023.02.25</td>
              <td>24,918명</td>
              <td><span class="badge badge-gray">종료</span></td>
              <td><button class="btn btn-secondary btn-sm" onclick="showLeagueDetail('2023_winter')">상세관리</button> <button class="btn btn-gray btn-sm" style="margin-left:4px;">조 편성</button> <button class="btn btn-primary btn-sm" style="margin-left:4px;" onclick="showPage('result-manage')">결과보기</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- PAGE 2: 리그 정책 관리 -->
    <!-- ══════════════════════════════════════════════ -->
    <div id="page-league-detail" class="page-section">
      <div class="page-header">
        <div class="page-title">리그 정책 관리</div>
        <div class="breadcrumb">🏠 > 써밋 리그 관리 > <span id="detail-breadcrumb">리그 정책 관리</span></div>
      </div>

      <!-- 리그 선택 -->
      <div class="card" style="margin-bottom:12px; padding:14px 20px;">
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
          <label class="form-label" style="margin:0; white-space:nowrap;">리그 선택</label>
          <select id="detail-league-select" class="form-select" style="width:260px;" onchange="loadLeagueDetail(this.value)">
            <option value="2026_winter">2026 윈터 리그오브매스</option>
            <option value="2025_summer">2025 서머 리그오브매스</option>
            <option value="2025_winter">2025 윈터 리그오브매스</option>
            <option value="2024_summer">2024 서머 리그오브매스</option>
            <option value="2024_winter">2024 윈터 리그오브매스</option>
            <option value="2023_summer">2023 서머 리그오브매스</option>
            <option value="2023_winter">2023 윈터 리그오브매스</option>
          </select>
          <span id="detail-status-badge" class="badge badge-green" style="font-size:13px;">진행중</span>
        </div>
      </div>

      <div class="tabs">
        <div class="tab active" onclick="switchDetailTab('schedule', this)">리그 일정 관리</div>
        <div class="tab" onclick="switchDetailTab('result-doc', this)">학습결과서 관리</div>
        <div class="tab" onclick="switchDetailTab('league-rules', this)">리그 규칙 등록관리</div>
      </div>

      <!-- 탭1: 리그 일정 관리 -->
      <div id="detail-tab-schedule">
        <!-- 기본정보 -->
        <div class="card">
          <div class="card-title">리그 기본 정보</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">리그명 *</label>
              <input id="detail-name" class="form-input" type="text" value="2026 윈터 리그오브매스" placeholder="리그명 입력">
            </div>
            <div class="form-group">
              <label class="form-label">시즌 구분 *</label>
              <select id="detail-season" class="form-select">
                <option value="윈터리그" selected>윈터리그</option>
                <option value="서머리그">서머리그</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">상태</label>
              <select id="detail-status" class="form-select">
                <option value="예정">예정</option>
                <option value="진행중" selected>진행중</option>
                <option value="종료">종료</option>
              </select>
            </div>
          </div>
          <div class="form-row" style="margin-top:12px;">
            <div class="form-group">
              <label class="form-label">운영 시작일 *</label>
              <input id="detail-start" class="form-input" type="date" value="2026-01-12">
            </div>
            <div class="form-group">
              <label class="form-label">운영 종료일 *</label>
              <input id="detail-end" class="form-input" type="date" value="2026-03-01">
            </div>
            <div class="form-group"></div>
          </div>
        </div>

        <!-- 주차 일정 -->
        <div class="card schedule-table">
          <div class="card-title">주차별 일정 입력</div>
          <div class="notice info">ℹ 결과 발표 일시가 되면 스마트코칭 LMS에 해당 주차 결과가 자동으로 노출됩니다. 1~6주차는 각 1회만 등록 가능하며, 리그 미진행 기간은 여러 번 추가할 수 있습니다.</div>

          <table id="schedule-table">
            <thead>
              <tr>
                <th style="width:160px;">구분</th>
                <th>학습 시작일</th>
                <th>학습 종료일</th>
                <th>결과 발표 일시</th>
                <th style="width:44px;"></th>
              </tr>
            </thead>
            <tbody id="schedule-tbody">
              <!-- 기본 1개 row: JS로 렌더 -->
            </tbody>
          </table>

          <div style="margin-top:12px;">
            <button class="btn btn-secondary" onclick="addScheduleRow()" id="btn-add-row">+ 항목 추가</button>
            <span style="font-size:11.5px; color:#999; margin-left:10px;">1~6주차는 중복 선택 불가 / 리그 미진행 기간은 복수 추가 가능</span>
          </div>

          <!-- 고정 하단: 최종결과발표 / 선물선택기간 / 선물발송기간 -->
          <div style="margin-top:20px; border-top:2px dashed #dde3ea; padding-top:16px;">
            <table>
              <thead>
                <tr style="background:#5ba3c9;">
                  <th style="width:160px;">구분</th>
                  <th>날짜 / 기간 시작</th>
                  <th>날짜 / 기간 종료</th>
                  <th>비고</th>
                  <th style="width:44px;"></th>
                </tr>
              </thead>
              <tbody>
                <tr style="background:#fff3f3;">
                  <td><b style="color:#e74c3c;">최종 결과 발표</b></td>
                  <td colspan="2" style="text-align:center;">
                    <input type="date" value="2026-03-16" style="margin-right:6px;">
                    <input type="time" value="15:00">
                  </td>
                  <td style="font-size:11px; color:#e74c3c;">결과 발표 시 스마트코칭에 결과 노출<br>학습결과서 열람 가능</td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>선물 선택 기간</b></td>
                  <td><input type="date" value="2026-03-17"></td>
                  <td><input type="date" value="2026-03-27"></td>
                  <td style="color:#999; font-size:11px;">— 해당 없음 —</td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>선물 발송 기간</b></td>
                  <td>
                    <span style="font-size:11px; color:#555; display:block; margin-bottom:3px;">📱 모바일 발송</span>
                    <input type="date" value="2026-03-31">
                  </td>
                  <td>
                    <span style="font-size:11px; color:#555; display:block; margin-bottom:3px;">📦 현물 발송</span>
                    <input type="date" value="2026-04-15">
                  </td>
                  <td style="color:#999; font-size:11px;">— 해당 없음 —</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="action-footer">
            <button class="btn btn-gray">임시저장</button>
            <button class="btn btn-primary">저장하기</button>
          </div>
        </div>

<style>
  .schedule-select {
    border: 1px solid #cdd5de; border-radius: 5px; padding: 7px 8px;
    font-size: 12.5px; font-family: inherit; width: 100%; color: #333;
  }
  .schedule-select:focus { outline: none; border-color: #4a90b8; }
  .row-noleague { background: #edf6ff !important; }
  .row-noleague td { color: #4a90b8; }
  .del-row-btn {
    width: 26px; height: 26px; border-radius: 50%; border: 1px solid #e0e0e0;
    background: #fff; cursor: pointer; font-size: 15px; color: #e74c3c;
    display: inline-flex; align-items: center; justify-content: center;
    transition: all .2s;
  }
  .del-row-btn:hover { background: #fde8e8; border-color: #e74c3c; }
  .notice-dup { color: #e74c3c; font-size: 11px; margin-top: 3px; display: none; }
</style>

<script>
  // 1~6주차 사용 여부 추적
  var usedWeeks = {};
  var rowCount = 0;

  var WEEK_OPTIONS = [
    { val: '1', label: '1주차' },
    { val: '2', label: '2주차' },
    { val: '3', label: '3주차' },
    { val: '4', label: '4주차' },
    { val: '5', label: '5주차' },
    { val: '6', label: '6주차' },
    { val: 'noleague', label: '리그 미진행 기간' },
  ];

  function buildSelect(rowId, selectedVal) {
    var html = '<select class="schedule-select" id="sel-' + rowId + '" onchange="onWeekChange(' + rowId + ', this)">';
    WEEK_OPTIONS.forEach(function(opt) {
      var disabled = (opt.val !== 'noleague' && usedWeeks[opt.val] && usedWeeks[opt.val] !== rowId) ? 'disabled' : '';
      var sel = (opt.val === selectedVal) ? 'selected' : '';
      html += '<option value="' + opt.val + '" ' + disabled + ' ' + sel + '>' + opt.label + '</option>';
    });
    html += '</select>';
    html += '<div class="notice-dup" id="dup-' + rowId + '">이미 등록된 주차입니다.</div>';
    return html;
  }

  function isNoleague(val) { return val === 'noleague'; }

  function addScheduleRow(selectedVal, startDate, endDate, resultDate, resultTime) {
    rowCount++;
    var id = rowCount;
    var val = selectedVal || '';

    // 선택값 없으면 사용 안된 주차 중 첫번째 자동 선택
    if (!val) {
      for (var i = 1; i <= 6; i++) {
        if (!usedWeeks[String(i)]) { val = String(i); break; }
      }
      if (!val) val = 'noleague';
    }

    if (val !== 'noleague') usedWeeks[val] = id;

    var isHL = isNoleague(val);
    var rowClass = isHL ? 'row-noleague' : '';

    var noResultCell = isHL
      ? '<td colspan="1" style="color:#999; font-size:11px; text-align:center;">— 결과 발표 없음 —</td>'
      : '<td><input type="date" id="rdate-'+id+'" value="'+(resultDate||'')+'"> <input type="time" id="rtime-'+id+'" value="'+(resultTime||'15:00')+'"><div style="font-size:10.5px; color:#4a90b8; margin-top:3px;">결과 발표 시 스마트코칭에 결과 노출</div></td>';

    var tr = document.createElement('tr');
    tr.className = rowClass;
    tr.id = 'row-' + id;
    tr.innerHTML =
      '<td>' + buildSelect(id, val) + '</td>' +
      '<td><input type="date" id="sdate-'+id+'" value="'+(startDate||'')+'"></td>' +
      '<td><input type="date" id="edate-'+id+'" value="'+(endDate||'')+'"></td>' +
      noResultCell +
      '<td><button class="del-row-btn" onclick="removeRow('+id+')" title="삭제">✕</button></td>';

    document.getElementById('schedule-tbody').appendChild(tr);
    refreshAllSelects();
  }

  function onWeekChange(rowId, sel) {
    var newVal = sel.value;
    // 기존 등록된 week 해제
    for (var k in usedWeeks) {
      if (usedWeeks[k] === rowId) { delete usedWeeks[k]; break; }
    }
    if (newVal !== 'noleague') usedWeeks[newVal] = rowId;

    var row = document.getElementById('row-' + rowId);
    var isHL = (newVal === 'noleague');
    row.className = isHL ? 'row-noleague' : '';

    // result cell: 4th td
    var tds = row.querySelectorAll('td');
    if (isHL) {
      tds[3].colSpan = 1;
      tds[3].innerHTML = '<span style="color:#999; font-size:11px;">— 결과 발표 없음 —</span>';
    } else {
      tds[3].innerHTML = '<input type="date" id="rdate-'+rowId+'"> <input type="time" id="rtime-'+rowId+'" value="15:00"><div style="font-size:10.5px; color:#4a90b8; margin-top:3px;">결과 발표 시 스마트코칭에 결과 노출</div>';
    }
    refreshAllSelects();
  }

  function removeRow(rowId) {
    for (var k in usedWeeks) {
      if (usedWeeks[k] === rowId) { delete usedWeeks[k]; break; }
    }
    var row = document.getElementById('row-' + rowId);
    if (row) row.parentNode.removeChild(row);
    refreshAllSelects();
  }

  function refreshAllSelects() {
    // 모든 select를 순회하며 disabled 갱신
    document.querySelectorAll('[id^="sel-"]').forEach(function(sel) {
      var rowId = parseInt(sel.id.replace('sel-', ''));
      var currentVal = sel.value;
      Array.from(sel.options).forEach(function(opt) {
        if (opt.value === 'noleague') { opt.disabled = false; return; }
        opt.disabled = !!(usedWeeks[opt.value] && usedWeeks[opt.value] !== rowId);
      });
    });
  }

  // 초기 1개 row 생성
  addScheduleRow('1');
</script>
      </div>

      <!-- 탭2: 학습결과서 관리 -->
      <div id="detail-tab-result-doc" style="display:none;">
        <div class="notice">⚠ 최종 결과 발표일 (2026년 03월 16일 15:00) 이전까지 수정 가능합니다.</div>

        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div class="card-title" style="margin:0; border:none; padding:0;">학습 분석 멘트 관리</div>
            <button class="btn btn-primary" onclick="openResultAdd()">+ 추가</button>
          </div>
          <div class="notice info" style="margin-bottom:16px;">ℹ 멘트 내 <b>OOO</b>는 LMS에서 학생 실명으로 자동 치환됩니다. 성취율 범위는 전국 등수 기준 상위 % 입니다.</div>

          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>성취율 범위 (상위 %)</th>
                <th>학습 분석 멘트</th>
                <th style="width:100px;">관리</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><span class="badge badge-blue">상위 1% ~ 5%</span></td>
                <td class="left" style="font-size:12px; line-height:1.6;">
                  OOO 학생은 이번 써밋 리그에서 최상위 레벨에 해당하는 뛰어난 성과를 보였습니다.<br>
                  어려운 문제에서도 흔들리지 않고 끝까지 밀어붙이는 힘이 돋보였습니다...
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="openResultEdit(0)">수정</button>
                  <button class="btn btn-danger btn-sm" style="margin-top:3px;">삭제</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td><span class="badge badge-green">상위 6% ~ 15%</span></td>
                <td class="left" style="font-size:12px; line-height:1.6;">
                  OOO 학생은 이번 리그에서 안정적인 상위권 성과를 기록했습니다.<br>
                  개념은 비교적 잘 정리되어 있고, 문제를 풀어가는 흐름도 자연스럽습니다...
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="openResultEdit(1)">수정</button>
                  <button class="btn btn-danger btn-sm" style="margin-top:3px;">삭제</button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td><span class="badge badge-orange">상위 16% ~ 30%</span></td>
                <td class="left" style="font-size:12px; line-height:1.6;">
                  OOO 학생은 이번 리그에서 중상위권의 탄탄한 성과를 보였습니다.<br>
                  기본 개념은 잘 잡혀 있고, 수업과 리그에 성실히 참여하는 모습도 꾸준히 이어지고 있습니다...
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="openResultEdit(2)">수정</button>
                  <button class="btn btn-danger btn-sm" style="margin-top:3px;">삭제</button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td><span class="badge badge-gray">상위 31% ~ 50%</span></td>
                <td class="left" style="font-size:12px; line-height:1.6;">
                  OOO 학생은 이번 리그를 통해 자신의 현재 위치를 파악하고 학습 수준을 점검해보는 시간을 가졌습니다...
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="openResultEdit(3)">수정</button>
                  <button class="btn btn-danger btn-sm" style="margin-top:3px;">삭제</button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td><span class="badge badge-gray">50% ~ 70%</span></td>
                <td class="left" style="font-size:12px; line-height:1.6;">
                  OOO 학생은 이번 리그를 통해 학습 기반을 점검하는 시간을 가졌습니다...
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="openResultEdit(4)">수정</button>
                  <button class="btn btn-danger btn-sm" style="margin-top:3px;">삭제</button>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td><span class="badge badge-red">70% 이하</span></td>
                <td class="left" style="font-size:12px; line-height:1.6;">
                  OOO 학생은 이번 리그를 통해 현재의 기초 학습 상태를 확인했습니다...
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="openResultEdit(5)">수정</button>
                  <button class="btn btn-danger btn-sm" style="margin-top:3px;">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 탭3: 리그 규칙 등록관리 -->
      <div id="detail-tab-league-rules" style="display:none;">
        <div class="notice info">ℹ 리그당 1개의 규칙 게시글이 등록됩니다. 최종 결과 발표일 전까지 수정 가능합니다.</div>

        <div class="card" style="padding:0; overflow:hidden;">
          <div class="card-title" style="padding:16px 20px; margin:0;">리그 규칙 등록 / 수정</div>

          <style>
            .rules-table { width:100%; border-collapse:collapse; font-size:12.5px; }
            .rules-table th {
              background:#4a90b8; color:#fff; padding:10px 14px;
              text-align:center; font-weight:600; border:1px solid #3a7aa8;
            }
            .rules-table td {
              padding:10px 14px; border:1px solid #dde3ea;
              vertical-align:top;
            }
            .rules-table td.depth1 {
              font-weight:700; background:#e8f2fa; color:#2c5f7a;
              text-align:center; vertical-align:middle; font-size:13px;
              white-space:nowrap;
            }
            .rules-table td.depth2 {
              font-weight:600; background:#f5f9fd; text-align:center;
              vertical-align:middle; white-space:nowrap; color:#2c5f7a;
              width:110px;
            }
            .rules-table td.detail-cell { min-width:320px; }
            .rules-table td.note-cell { width:200px; }
            .rules-table textarea {
              width:100%; border:1px solid #d0dae4; border-radius:5px;
              padding:8px 10px; font-size:12.5px; font-family:inherit;
              resize:vertical; line-height:1.7; color:#333;
              min-height:90px; background:#fff;
            }
            .rules-table textarea:focus { outline:none; border-color:#4a90b8; background:#fafcff; }
            .rules-table textarea.note-ta { min-height:90px; color:#e74c3c; font-weight:500; }

            /* 포인트기준 중첩 테이블 */
            .inner-table { width:100%; border-collapse:collapse; font-size:12px; margin-top:8px; }
            .inner-table th { background:#ddeaf5; color:#2c5f7a; padding:6px 10px; border:1px solid #c5d9e8; text-align:center; }
            .inner-table td { padding:6px 10px; border:1px solid #dde3ea; text-align:center; vertical-align:middle; }
            .inner-table td.inner-label { background:#f5f9fd; font-weight:600; text-align:left; }
          </style>

          <table class="rules-table">
            <thead>
              <tr>
                <th style="width:90px;">구분</th>
                <th style="width:110px;">내용</th>
                <th>세부 내용</th>
                <th style="width:200px;">비고</th>
              </tr>
            </thead>
            <tbody>

              <!-- ── 운영기준 ── -->
              <tr>
                <td class="depth1" rowspan="3">운영기준</td>
                <td class="depth2">조 운영기준</td>
                <td class="detail-cell">
                  <textarea>• 학년별 전체 채널 통합 조 편성
• 최하 고정은 별도 조 편성
• 최하고정은 별도 조 편성 (Grand Master / Master 수상 제외)</textarea>
                </td>
                <td class="note-cell">
                  <textarea class="note-ta">실제 학습 학년 기준으로 1개조의 약 180~200명 배정</textarea>
                </td>
              </tr>
              <tr>
                <td class="depth2">탈락 기준</td>
                <td class="detail-cell">
                  <textarea style="min-height:110px;">• 리그 운영 기간(약 6~7주) 써밋 스코어수학을 퇴회하는 경우
• 리그 참여 도중, 자동 맞춤 → 최하고정으로 진도를 변경하는 경우
• 리그 운영 기간(약 6~7주) 뉴드림스 학년을 수정하는 경우
• 리그 중도 탈락 시 기존의 학습 / 포인트 이력은 모두 초기화됩니다. (누적 포인트 '0' 처리)</textarea>
                </td>
                <td class="note-cell"><textarea></textarea></td>
              </tr>
              <tr>
                <td class="depth2">포상기준</td>
                <td class="detail-cell">
                  <textarea style="min-height:120px;">• Grand Master(학년 1위), Master(학년 2위) 및 조 별 순위포상(조 1~3위) 및 포인트 포상 운영
• 리그 명예의 전당
- 2023 써밋 윈터리그 운영부터 2회 Grand Master / Master 수상 회원은 명예의 전당으로 이동하여 향후 써밋 리그 포상 제외
- 명예의 전당 회원 포상 : 방학 리그 참여 시 마다 10,000포인트 지급 (단, 리그 평균 학습점수 90점 달성 시 지급)</textarea>
                </td>
                <td class="note-cell"><textarea></textarea></td>
              </tr>

              <!-- ── 점수기준 ── -->
              <tr>
                <td class="depth1" rowspan="3">점수기준</td>
                <td class="depth2">학습 점수</td>
                <td class="detail-cell">
                  <textarea style="min-height:150px;">• 해당 주차 학습 점수를 뜻하며, 해당 일에 풀이한 레슨 학습의 평균 점수
• 리셋은 일별 4회까지만 인정하며, 이후부터는 시행 시 마다 감점 (-3점)
• 리셋 후 당일 학습 결과가 없는 경우는 0점
• 실제 학습 학년과 학습 과정이 다를 경우, 탈락 되지 않으며 가/감점 제도 적용
  - 학년 상위 진도는 +10점 × 상위 GAP 가점 (최대 20점)
  - 학년 하위 진도는 -10점 감점
• 단위 레슨 가산점
  - 1주 4개 단위 레슨 학습 완료 시 매주 +1점 가점</textarea>
                </td>
                <td class="note-cell">
                  <textarea class="note-ta">운영 기간 내 명절 연휴 및 하계 휴가 기간은 점수 산정에서 제외</textarea>
                </td>
              </tr>
              <tr>
                <td class="depth2">시간 점수</td>
                <td class="detail-cell">
                  <textarea style="min-height:100px;">• 전체 시간 중 문제 풀이 시간을 뺀 나머지 20% 반영
  (초등 60분 / 중등 80분 / 고등 100분 _ 기본 또는 과제 단독 풀이 시 기준 시간 ¼ 반영 후 점수 계산)
• 해당 주차 시간 점수를 뜻하며, 해당 주차에 산출된 풀이 시간 점수의 평균 점수 반영</textarea>
                </td>
                <td class="note-cell"><textarea></textarea></td>
              </tr>
              <tr>
                <td class="depth2">출결 점수</td>
                <td class="detail-cell">
                  <textarea>• 전체 학년 출결 점수 1주 2회 학습 시 10점 가산 / 1회 학습시 8점 가산 / 미출석시 해당 주차 추가 가산 없음(0점)</textarea>
                </td>
                <td class="note-cell"><textarea></textarea></td>
              </tr>

              <!-- ── 포인트기준 ── -->
              <tr>
                <td class="depth1">포인트기준</td>
                <td class="depth2">포상 포인트</td>
                <td class="detail-cell">
                  <textarea style="min-height:200px;">• 최종 조별 순위(1~3위)에 따른 순위 구간별 포인트 지급
  - 조 1위 : 4,000포인트
  - 조 2위 : 3,000포인트
  - 조 3위 : 2,000포인트

• 학습 포인트
  - 매주 출결 기준(2회) 충족 시, 해당 주차별 평균 학습 점수를 포인트로 지급

• 출석 포인트
  - 1주 2회 출석 완료 시마다 10포인트 획득</textarea>
                </td>
                <td class="note-cell">
                  <textarea class="note-ta">잔여/미사용 포인트 100% 이월 진행 (스코어수학 학습 유지 시)</textarea>
                </td>
              </tr>

            </tbody>
          </table>

          <div class="action-footer" style="padding:16px 20px;">
            <button class="btn btn-gray">임시저장</button>
            <button class="btn btn-primary">저장하기</button>
          </div>
        </div>
      </div>

    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- PAGE 3: 조 편성 -->
    <!-- ══════════════════════════════════════════════ -->
    <div id="page-group-assign" class="page-section">
      <div class="page-header">
        <div class="page-title">써밋 리그 조 편성</div>
        <div class="breadcrumb">🏠 > 써밋 리그 관리 > <span>써밋 리그 조 편성</span></div>
      </div>

      <div class="card">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
          <label class="form-label">리그 선택</label>
          <select class="form-select" style="width:200px;">
            <option>2026 윈터 리그오브매스</option>
            <option>2025 서머 리그오브매스</option>
          </select>
          <button class="btn btn-primary btn-sm" onclick="autoAssign()">🔄 자동 배정 실행</button>
          <span style="font-size:11.5px; color:#999;">(기준: 학년별 조인원 180~210명)</span>
        </div>

        <div id="ga-count-badge" class="count-badge" style="margin-bottom:12px;"></div>

        <div style="overflow-x:auto;">
          <table id="ga-table" style="min-width:900px;">
            <thead>
              <tr>
                <th rowspan="2" style="min-width:48px;"></th>
                <th colspan="4" style="border-right:2px solid #5ba3c9; background:#4a7fa0; color:#fff;">기본 현황</th>
                <th style="background:#fff; border:none; width:8px;"></th>
                <th colspan="3" style="border-right:2px solid #5ba3c9; background:#e6a817; color:#fff;">일반 조편성</th>
                <th colspan="3" style="border-right:2px solid #5ba3c9; background:#c0962a; color:#fff;">최하 조편성</th>
                <th colspan="3" style="background:#2c6e8a; color:#fff;">최종 합계</th>
              </tr>
              <tr>
                <th>LC</th><th>YC</th><th>HL</th>
                <th style="border-right:2px solid #5ba3c9;">합계</th>
                <th style="background:#fff; border:none;"></th>
                <th>LC/YC/HL</th>
                <th>조인원</th>
                <th style="border-right:2px solid #5ba3c9; background:#fff3c4; color:#333;">조 수</th>
                <th>LC/YC/HL</th>
                <th>조인원</th>
                <th style="border-right:2px solid #5ba3c9; background:#fff3c4; color:#333;">조 수</th>
                <th>합계</th>
                <th id="ga-th-groups" style="color:#ffcc00; white-space:nowrap;">총 조 그룹<br><span id="ga-total-groups">0</span></th>
                <th id="ga-th-members" style="color:#ffcc00; white-space:nowrap;">총 인원수<br><span id="ga-total-members">0</span></th>
              </tr>
            </thead>
            <tbody id="ga-tbody">
            </tbody>
          </table>
        </div>
      </div>

      <div class="action-footer">
        <button class="btn btn-gray" onclick="alert('임시저장되었습니다.')">임시저장</button>
        <button class="btn btn-primary" onclick="alert('저장되었습니다.')">저장하기</button>
      </div>

      <script>
      (function(){
        // ── 학년별 원본 데이터 ──────────────────────────────────────────────
        // grade, lc, yc, hl, includedIn(null=독립 행), stdStudents, stdGroups, botStudents, botGroups
        var ROWS = [
          { grade:'유아',  lc:373,  yc:54,   hl:2,   includedIn:'초1', std:null,  bot:null },
          { grade:'초1',   lc:2191, yc:380,  hl:10,  includedIn:null,  std:{s:2505,g:13}, bot:{s:505,g:3}  },
          { grade:'초2',   lc:4495, yc:846,  hl:17,  includedIn:null,  std:{s:4413,g:23}, bot:{s:945,g:5}  },
          { grade:'초3',   lc:5801, yc:1202, hl:31,  includedIn:null,  std:{s:5537,g:28}, bot:{s:1497,g:8} },
          { grade:'초4',   lc:6009, yc:1316, hl:71,  includedIn:null,  std:{s:5787,g:29}, bot:{s:1609,g:8} },
          { grade:'초5',   lc:5204, yc:1267, hl:78,  includedIn:null,  std:{s:5172,g:26}, bot:{s:1377,g:7} },
          { grade:'초6',   lc:4290, yc:1036, hl:108, includedIn:null,  std:{s:3870,g:20}, bot:{s:1564,g:8} },
          { grade:'중1',   lc:3257, yc:693,  hl:70,  includedIn:null,  std:{s:2658,g:14}, bot:{s:1362,g:7} },
          { grade:'중2',   lc:2296, yc:529,  hl:63,  includedIn:null,  std:{s:2015,g:10}, bot:{s:873,g:4}  },
          { grade:'중3',   lc:984,  yc:212,  hl:38,  includedIn:null,  std:{s:790,g:4},   bot:{s:444,g:2}  },
          { grade:'고1',   lc:284,  yc:56,   hl:25,  includedIn:null,  std:{s:317,g:2},   bot:{s:188,g:1}  },
          { grade:'고2',   lc:105,  yc:13,   hl:8,   includedIn:'고1', std:null,  bot:null },
          { grade:'고3',   lc:4,    yc:2,    hl:1,   includedIn:'고1', std:null,  bot:null },
          { grade:'성인',  lc:4,    yc:3,    hl:0,   includedIn:'고1', std:null,  bot:null },
        ];

        // 합산 계산: included 학년의 합계를 parent에 더함
        function getGrandTotal(row) {
          var own = row.lc + row.yc + row.hl;
          var extra = 0;
          ROWS.forEach(function(r) {
            if (r.includedIn === row.grade) extra += r.lc + r.yc + r.hl;
          });
          return own + extra;
        }

        // 조인원 계산 (올림)
        function calcPer(students, groups) {
          if (!groups || groups <= 0) return 0;
          return Math.ceil(students / groups);
        }

        // 조인원 색상 클래스
        function perClass(per) {
          return (per > 0 && (per < 180 || per > 210)) ? 'adj-warn' : '';
        }

        // ── 테이블 렌더 ────────────────────────────────────────────────────
        function render() {
          var tbody = document.getElementById('ga-tbody');
          if (!tbody) return;
          tbody.innerHTML = '';

          var totalLc = 0, totalYc = 0, totalHl = 0, totalAll = 0;
          var totalStdS = 0, totalStdG = 0, totalBotS = 0, totalBotG = 0, totalGrand = 0;

          ROWS.forEach(function(row, idx) {
            var lc = row.lc, yc = row.yc, hl = row.hl;
            var own = lc + yc + hl;
            var tr = document.createElement('tr');

            if (row.includedIn) {
              // 포함된 행 (유아, 고2, 고3, 성인) - 연회색 표시
              tr.style.cssText = 'background:#f9f9f9; color:#aaa; font-size:12px;';
              tr.innerHTML =
                '<td style="padding-left:18px; font-style:italic;">' + row.grade + '<span style="font-size:10px; color:#bbb; margin-left:4px;">(→' + row.includedIn + ')</span></td>' +
                '<td>' + lc.toLocaleString() + '</td>' +
                '<td>' + yc.toLocaleString() + '</td>' +
                '<td>' + hl.toLocaleString() + '</td>' +
                '<td style="border-right:2px solid #ddd;">' + own.toLocaleString() + '</td>' +
                '<td></td>' +
                '<td colspan="3" style="color:#ccc; font-size:11px; border-right:2px solid #ddd;">(' + row.includedIn + '에 포함)</td>' +
                '<td colspan="3" style="border-right:2px solid #ddd;"></td>' +
                '<td colspan="3"></td>';
              totalLc += lc; totalYc += yc; totalHl += hl;
            } else {
              // 독립 행 - 실제 조편성 적용
              var grand = getGrandTotal(row);
              var stdS = row.std ? row.std.s : 0;
              var stdG = row.std ? row.std.g : 0;
              var botS = row.bot ? row.bot.s : 0;
              var botG = row.bot ? row.bot.g : 0;
              var stdPer = calcPer(stdS, stdG);
              var botPer = calcPer(botS, botG);

              totalLc += lc; totalYc += yc; totalHl += hl;
              totalStdS += stdS; totalStdG += stdG;
              totalBotS += botS; totalBotG += botG;
              totalGrand += grand;

              var stdPerClass = perClass(stdPer);
              var botPerClass = perClass(botPer);

              tr.innerHTML =
                '<td style="font-weight:600;">' + row.grade + '</td>' +
                '<td>' + lc.toLocaleString() + '</td>' +
                '<td>' + yc.toLocaleString() + '</td>' +
                '<td>' + hl.toLocaleString() + '</td>' +
                '<td style="border-right:2px solid #ddd;">' + own.toLocaleString() + '</td>' +
                '<td></td>' +
                '<td>' + stdS.toLocaleString() + '</td>' +
                '<td id="ga-std-per-' + idx + '" class="' + stdPerClass + '">' + stdPer + '</td>' +
                '<td class="adj-highlight" style="border-right:2px solid #ddd;">' +
                  '<button class="adj-btn" onclick="changeGroups(' + idx + ',\'std\',-1)">−</button>' +
                  ' <span id="ga-std-g-' + idx + '">' + stdG + '</span> ' +
                  '<button class="adj-btn" onclick="changeGroups(' + idx + ',\'std\',1)">+</button>' +
                '</td>' +
                '<td>' + botS.toLocaleString() + '</td>' +
                '<td id="ga-bot-per-' + idx + '" class="' + botPerClass + '">' + botPer + '</td>' +
                '<td class="adj-highlight" style="border-right:2px solid #ddd;">' +
                  '<button class="adj-btn" onclick="changeGroups(' + idx + ',\'bot\',-1)">−</button>' +
                  ' <span id="ga-bot-g-' + idx + '">' + botG + '</span> ' +
                  '<button class="adj-btn" onclick="changeGroups(' + idx + ',\'bot\',1)">+</button>' +
                '</td>' +
                '<td style="font-weight:700;">' + grand.toLocaleString() + '</td>' +
                '<td></td>' +
                '<td></td>';
            }
            tbody.appendChild(tr);
          });

          // 합계 행
          totalAll = totalLc + totalYc + totalHl;
          var totalGroups = totalStdG + totalBotG;
          var tr2 = document.createElement('tr');
          tr2.className = 'total-row';
          tr2.innerHTML =
            '<td>총 합계</td>' +
            '<td>' + totalLc.toLocaleString() + '</td>' +
            '<td>' + totalYc.toLocaleString() + '</td>' +
            '<td>' + totalHl.toLocaleString() + '</td>' +
            '<td style="border-right:2px solid #ddd;">' + totalAll.toLocaleString() + '</td>' +
            '<td></td>' +
            '<td>' + totalStdS.toLocaleString() + '</td>' +
            '<td></td>' +
            '<td class="adj-highlight" style="border-right:2px solid #ddd;">' + totalStdG + '</td>' +
            '<td>' + totalBotS.toLocaleString() + '</td>' +
            '<td></td>' +
            '<td class="adj-highlight" style="border-right:2px solid #ddd;">' + totalBotG + '</td>' +
            '<td style="font-weight:700;">' + totalAll.toLocaleString() + '</td>' +
            '<td></td>' +
            '<td></td>';
          tbody.appendChild(tr2);

          // 헤더 총합 업데이트
          var elG = document.getElementById('ga-total-groups');
          var elM = document.getElementById('ga-total-members');
          if (elG) elG.textContent = totalGroups.toLocaleString();
          if (elM) elM.textContent = totalAll.toLocaleString();

          // 건수 배지
          var badge = document.getElementById('ga-count-badge');
          if (badge) badge.textContent = '총 ' + totalAll.toLocaleString() + '건';
        }

        // ── 조 수 변경 ─────────────────────────────────────────────────────
        function changeGroups(rowIdx, type, delta) {
          var row = ROWS[rowIdx];
          if (!row || row.includedIn) return;

          if (type === 'std' && row.std) {
            row.std.g = Math.max(1, row.std.g + delta);
            // 조인원 업데이트 (부분 갱신)
            var per = calcPer(row.std.s, row.std.g);
            var gEl = document.getElementById('ga-std-g-' + rowIdx);
            var pEl = document.getElementById('ga-std-per-' + rowIdx);
            if (gEl) gEl.textContent = row.std.g;
            if (pEl) { pEl.textContent = per; pEl.className = perClass(per); }
          } else if (type === 'bot' && row.bot) {
            row.bot.g = Math.max(1, row.bot.g + delta);
            var per = calcPer(row.bot.s, row.bot.g);
            var gEl = document.getElementById('ga-bot-g-' + rowIdx);
            var pEl = document.getElementById('ga-bot-per-' + rowIdx);
            if (gEl) gEl.textContent = row.bot.g;
            if (pEl) { pEl.textContent = per; pEl.className = perClass(per); }
          }

          // 총계 행 갱신
          updateTotals();
        }
        window.changeGroups = changeGroups;

        // ── 총계 갱신 (전체 re-render 없이 빠르게) ─────────────────────────
        function updateTotals() {
          var totalStdG = 0, totalBotG = 0, totalAll = 0;
          ROWS.forEach(function(r) {
            if (!r.includedIn) {
              if (r.std) totalStdG += r.std.g;
              if (r.bot) totalBotG += r.bot.g;
            }
            totalAll += r.lc + r.yc + r.hl;
          });
          var totalGroups = totalStdG + totalBotG;

          // tbody 마지막 행(total-row) 업데이트
          var totRow = document.querySelector('#ga-tbody .total-row');
          if (totRow) {
            var cells = totRow.querySelectorAll('td');
            // 일반 조수 (index 8), 최하 조수 (index 11)
            if (cells[8]) cells[8].textContent = totalStdG;
            if (cells[11]) cells[11].textContent = totalBotG;
          }
          var elG = document.getElementById('ga-total-groups');
          var elM = document.getElementById('ga-total-members');
          if (elG) elG.textContent = totalGroups.toLocaleString();
          if (elM) elM.textContent = totalAll.toLocaleString();
        }

        // ── 자동 배정 ──────────────────────────────────────────────────────
        function autoAssign() {
          var TARGET = 195; // 목표 조인원
          ROWS.forEach(function(row) {
            if (row.includedIn) return;
            if (row.std) row.std.g = Math.max(1, Math.round(row.std.s / TARGET));
            if (row.bot) row.bot.g = Math.max(1, Math.round(row.bot.s / TARGET));
          });
          render();
        }
        window.autoAssign = autoAssign;

        // 초기 렌더
        render();
      })();
      </script>
    </div>


    <!-- ══════════════════════════════════════════════ -->
    <!-- PAGE 4: 회원 관리 -->
    <!-- ══════════════════════════════════════════════ -->
    <div id="page-member-manage" class="page-section">
      <div class="page-header">
        <div class="page-title">써밋 리그 회원 관리</div>
        <div class="breadcrumb">🏠 > 써밋 리그 관리 > <span>써밋 리그 회원 관리</span></div>
      </div>

      <div class="search-box">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div class="search-title" style="margin:0;">검색 조건</div>
          <button class="btn btn-sm" style="background:#27ae60; color:#fff; border:none; font-size:11px; padding:6px 18px; border-radius:5px; font-weight:600;">엑셀 다운로드</button>
        </div>
        <div class="search-grid">
          <div class="search-row"><span class="search-label">리그명</span><select class="form-select" style="flex:1;"><option>2026 윈터 리그오브매스</option><option>2025 서머 리그오브매스</option></select></div>
          <div class="search-row"><span class="search-label">본부</span><select class="form-select" style="flex:1;"><option>전체 학년</option></select></div>
          <div class="search-row"><span class="search-label">지점</span><input class="form-input" style="flex:1;" placeholder="검색어 입력"></div>
          <div class="search-row"><span class="search-label">센터</span><input class="form-input" style="flex:1;" placeholder="센터명 입력"></div>
          <div class="search-row"><span class="search-label">회원명</span><input class="form-input" style="flex:1;" placeholder="회원명 입력"></div>
          <div class="search-row"><span class="search-label">회원번호</span><input class="form-input" style="flex:1;" placeholder="회원번호 입력"></div>
        </div>
        <div style="text-align:center;"><button class="btn btn-primary" style="padding:8px 40px;">검색</button></div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <div class="count-badge" style="margin:0;">총 43,428건</div>
      </div>

      <div class="card" style="padding:0; overflow:hidden;">
        <table id="member-table">
          <thead>
            <tr>
              <th>No</th><th>교사</th><th>이름</th><th>학년</th><th>조 이름</th>
              <th>누적 점수</th><th>누적 포인트</th><th>현재 등수</th>
              <th>자세히보기</th><th>리그 탈락 여부</th><th>관리</th>
            </tr>
          </thead>
          <tbody id="member-tbody"></tbody>
        </table>
        <div class="stats-paging" id="member-paging"></div>
        <div style="height:12px;"></div>
      </div>

      <script>
      (function(){
        var MEMBERS_DATA = [
          {teacher:'정미정', name:'권도윤', grade:'중2', team:'– –', score:'625.27', point:'605.84', rank:0, dropout:false,
           detail:{name:'권도윤',team:'– –',score:'625.27',rank:'-',point:'605.84',message:'-',event:'-',
             weeks:[{w:6,study:84.17,time:2.02,attend:10,bonus:1,reset:0,total:97.19,points:94.17},{w:5,study:94.83,time:.72,attend:10,bonus:1,reset:0,total:106.55,points:104.83},{w:4,study:91.75,time:.87,attend:10,bonus:1,reset:0,total:103.62,points:101.75},{w:3,study:85.67,time:1.86,attend:10,bonus:1,reset:0,total:98.53,points:95.67},{w:2,study:96.75,time:4.14,attend:10,bonus:1,reset:0,total:111.89,points:106.75},{w:1,study:92.67,time:3.82,attend:10,bonus:1,reset:0,total:107.49,points:102.67}],
             history:[{no:12,league:'2025 Summer League',score:100.45,rank:0,point:488,used:1500,remain:1367,gift:'롯데리아 더블 한국불고기버거 세트'},{no:11,league:'2025 Winter League',score:104.6,rank:0,point:10595,used:10000,remain:2379,gift:'네이버페이 포인트 10만원'},{no:10,league:'2024 Summer League',score:121.87,rank:1,point:1000,used:4000,remain:1784,gift:'스탠리 퀜처 H2.0 텀블러'},{no:9,league:'2024 Winter League',score:121.18,rank:1,point:100,used:0,remain:4784,gift:'-'},{no:8,league:'2023 Summer League',score:119.82,rank:1,point:4660,used:0,remain:4684,gift:'-'},{no:7,league:'2023 Winter League',score:117.06,rank:7,point:656,used:1000,remain:24,gift:'스타벅스 뱅스 어 라떼 세트'},{no:6,league:'2022 Summer League',score:115.51,rank:7,point:658,used:1500,remain:368,gift:'스타벅스 행복한 기운'},{no:5,league:'2022 Winter League',score:115.88,rank:5,point:1160,used:1500,remain:1210,gift:'스타벅스 아메리카노 2잔+치즈케이크'},{no:4,league:'2021 Summer League',score:116.08,rank:4,point:1550,used:0,remain:1550,gift:'-'},{no:3,league:'2021 Winter League',score:115.93,rank:2,point:770,used:0,remain:0,gift:'문화상품권 3만원권'},{no:2,league:'2020 Summer League',score:119.13,rank:3,point:751.75,used:0,remain:0,gift:'모바일문화상품권 20,000원'},{no:1,league:'2020 Winter League',score:119.81,rank:4,point:0,used:0,remain:0,gift:'-'}]}},
          {teacher:'김완기', name:'박시연', grade:'초4', team:'– –', score:'681.29', point:'660', rank:0, dropout:false,
           detail:{name:'박시연',team:'– –',score:'681.29',rank:'-',point:'660',message:'-',event:'-',
             weeks:[{w:6,study:90,time:3.1,attend:10,bonus:1,reset:0,total:104.1,points:101},{w:5,study:95,time:2.8,attend:10,bonus:1,reset:0,total:108.8,points:106},{w:4,study:100,time:3.5,attend:10,bonus:1,reset:0,total:114.5,points:111},{w:3,study:98,time:2.9,attend:10,bonus:1,reset:0,total:111.9,points:109},{w:2,study:97,time:3.2,attend:10,bonus:1,reset:0,total:111.2,points:108},{w:1,study:100,time:3.8,attend:10,bonus:1,reset:0,total:114.8,points:111}],
             history:[{no:3,league:'2025 Winter League',score:113.6,rank:2,point:2000,used:1000,remain:1000,gift:'스타벅스 쿠폰'},{no:2,league:'2025 Summer League',score:111.4,rank:3,point:1500,used:500,remain:1000,gift:'-'},{no:1,league:'2024 Winter League',score:109.8,rank:5,point:800,used:0,remain:800,gift:'-'}]}},
          {teacher:'김완기', name:'남태석', grade:'초3', team:'– –', score:'695.49', point:'660', rank:0, dropout:false,
           detail:{name:'남태석',team:'– –',score:'695.49',rank:'-',point:'660',message:'-',event:'-',
             weeks:[{w:6,study:88,time:3.5,attend:10,bonus:1,reset:0,total:102.5,points:99},{w:5,study:92,time:4.1,attend:10,bonus:1,reset:0,total:107.1,points:103},{w:4,study:95,time:3.8,attend:10,bonus:1,reset:0,total:109.8,points:106},{w:3,study:90,time:3.2,attend:10,bonus:1,reset:0,total:104.2,points:101},{w:2,study:96,time:4.5,attend:10,bonus:1,reset:0,total:110.5,points:107},{w:1,study:100,time:4.2,attend:10,bonus:1,reset:0,total:114.2,points:111}],
             history:[{no:2,league:'2025 Winter League',score:112.3,rank:3,point:1500,used:1000,remain:500,gift:'문화상품권'},{no:1,league:'2025 Summer League',score:110.5,rank:4,point:1200,used:0,remain:1200,gift:'-'}]}},
          {teacher:'최효진', name:'김세혁', grade:'중1', team:'– –', score:'569.37', point:'542', rank:0, dropout:false,
           detail:{name:'김세혁',team:'– –',score:'569.37',rank:'-',point:'542',message:'-',event:'-',
             weeks:[{w:6,study:80,time:2.1,attend:10,bonus:1,reset:0,total:93.1,points:91},{w:5,study:85,time:2.5,attend:10,bonus:1,reset:0,total:98.5,points:96},{w:4,study:82,time:2.3,attend:8,bonus:1,reset:0,total:93.3,points:91},{w:3,study:78,time:2.0,attend:10,bonus:1,reset:0,total:91,points:89},{w:2,study:88,time:3.1,attend:10,bonus:1,reset:0,total:102.1,points:99},{w:1,study:84,time:2.8,attend:10,bonus:1,reset:0,total:97.8,points:95}],
             history:[{no:1,league:'2025 Winter League',score:95.2,rank:8,point:400,used:0,remain:400,gift:'-'}]}},
          {teacher:'김완기', name:'이태근', grade:'초5', team:'초5-A조', score:'720.78', point:'660', rank:1, dropout:false,
           detail:{name:'이태근',team:'초5-A조',score:'720.78',rank:'1',point:'660',message:'최우수 학습자',event:'-',
             weeks:[{w:6,study:98,time:5.1,attend:10,bonus:1,reset:0,total:114.1,points:109},{w:5,study:100,time:6.2,attend:10,bonus:1,reset:0,total:117.2,points:111},{w:4,study:100,time:5.8,attend:10,bonus:1,reset:0,total:115.8,points:110},{w:3,study:97,time:6.5,attend:10,bonus:1,reset:0,total:114.5,points:108},{w:2,study:100,time:5.9,attend:10,bonus:1,reset:0,total:115.9,points:111},{w:1,study:100,time:7.3,attend:10,bonus:1,reset:0,total:117.3,points:112}],
             history:[{no:2,league:'2025 Winter League',score:118.4,rank:2,point:3000,used:2000,remain:1000,gift:'네이버페이 5만원'},{no:1,league:'2025 Summer League',score:116.2,rank:3,point:2000,used:1000,remain:1000,gift:'스타벅스 쿠폰'}]}},
          {teacher:'이주영', name:'김나경', grade:'초1', team:'초1-B조', score:'703.55', point:'660', rank:2, dropout:false,
           detail:{name:'김나경',team:'초1-B조',score:'703.55',rank:'2',point:'660',message:'-',event:'-',
             weeks:[{w:6,study:95,time:4.5,attend:10,bonus:1,reset:0,total:110.5,points:106},{w:5,study:97,time:4.8,attend:10,bonus:1,reset:0,total:112.8,points:108},{w:4,study:100,time:5.0,attend:10,bonus:1,reset:0,total:116,points:111},{w:3,study:98,time:4.2,attend:10,bonus:1,reset:0,total:113.2,points:109},{w:2,study:100,time:4.9,attend:10,bonus:1,reset:0,total:114.9,points:110},{w:1,study:96,time:4.1,attend:10,bonus:1,reset:0,total:111.1,points:107}],
             history:[{no:1,league:'2025 Winter League',score:109.3,rank:5,point:1500,used:500,remain:1000,gift:'리그 노트'}]}},
          {teacher:'정한나', name:'홍지율', grade:'초1', team:'초1-A조', score:'709.88', point:'660', rank:3, dropout:false,
           detail:{name:'홍지율',team:'초1-A조',score:'709.88',rank:'3',point:'660',message:'-',event:'-',
             weeks:[{w:6,study:94,time:5.2,attend:10,bonus:1,reset:0,total:110.2,points:105},{w:5,study:96,time:5.5,attend:10,bonus:1,reset:0,total:112.5,points:107},{w:4,study:100,time:5.1,attend:10,bonus:1,reset:0,total:116.1,points:111},{w:3,study:100,time:5.0,attend:10,bonus:1,reset:0,total:116,points:110},{w:2,study:98,time:5.3,attend:10,bonus:1,reset:0,total:114.3,points:109},{w:1,study:100,time:5.6,attend:10,bonus:1,reset:0,total:115.6,points:110}],
             history:[{no:2,league:'2025 Summer League',score:112.1,rank:4,point:1800,used:800,remain:1000,gift:'-'},{no:1,league:'2024 Winter League',score:108.5,rank:6,point:900,used:0,remain:900,gift:'-'}]}},
          {teacher:'정한나', name:'강용호', grade:'초1', team:'초1-A조', score:'709.64', point:'660', rank:4, dropout:false,
           detail:{name:'강용호',team:'초1-A조',score:'709.64',rank:'4',point:'660',message:'-',event:'-',
             weeks:[{w:6,study:93,time:4.9,attend:10,bonus:1,reset:0,total:109.9,points:104},{w:5,study:96,time:5.2,attend:10,bonus:1,reset:0,total:112.2,points:107},{w:4,study:100,time:5.0,attend:10,bonus:1,reset:0,total:116,points:111},{w:3,study:99,time:4.8,attend:10,bonus:1,reset:0,total:114.8,points:110},{w:2,study:97,time:5.1,attend:10,bonus:1,reset:0,total:113.1,points:108},{w:1,study:100,time:5.3,attend:10,bonus:1,reset:0,total:115.3,points:110}],
             history:[{no:1,league:'2025 Summer League',score:110.8,rank:5,point:1400,used:400,remain:1000,gift:'-'}]}},
          {teacher:'정한나', name:'문채아', grade:'초1', team:'초1-A조', score:'709.09', point:'660', rank:5, dropout:false,
           detail:{name:'문채아',team:'초1-A조',score:'709.09',rank:'5',point:'660',message:'-',event:'-',
             weeks:[{w:6,study:93,time:5.1,attend:10,bonus:1,reset:0,total:109.1,points:103},{w:5,study:95,time:5.3,attend:10,bonus:1,reset:0,total:111.3,points:106},{w:4,study:100,time:5.0,attend:10,bonus:1,reset:0,total:116,points:111},{w:3,study:98,time:4.8,attend:10,bonus:1,reset:0,total:113.8,points:109},{w:2,study:97,time:5.2,attend:10,bonus:1,reset:0,total:113.2,points:108},{w:1,study:100,time:5.7,attend:10,bonus:1,reset:0,total:115.7,points:110}],
             history:[{no:1,league:'2025 Summer League',score:108.2,rank:6,point:1100,used:100,remain:1000,gift:'-'}]}},
          {teacher:'최경애', name:'박시아', grade:'초1', team:'초1-C조', score:'705.85', point:'657.5', rank:6, dropout:false,
           detail:{name:'박시아',team:'초1-C조',score:'705.85',rank:'6',point:'657.5',message:'-',event:'-',
             weeks:[{w:6,study:91,time:4.8,attend:10,bonus:1,reset:0,total:107.8,points:102},{w:5,study:93,time:5.0,attend:10,bonus:1,reset:0,total:109,points:104},{w:4,study:98,time:5.1,attend:10,bonus:1,reset:0,total:114.1,points:109},{w:3,study:96,time:4.7,attend:10,bonus:1,reset:0,total:111.7,points:107},{w:2,study:95,time:4.9,attend:10,bonus:1,reset:0,total:110.9,points:106},{w:1,study:100,time:5.1,attend:10,bonus:1,reset:0,total:116.1,points:111}],
             history:[{no:1,league:'2025 Summer League',score:107.5,rank:8,point:700,used:0,remain:700,gift:'-'}]}},
          {teacher:'강희영', name:'조현우', grade:'초1', team:'초1-D조', score:'680.91', point:'660', rank:7, dropout:false,
           detail:{name:'조현우',team:'초1-D조',score:'680.91',rank:'7',point:'660',message:'-',event:'-',
             weeks:[{w:6,study:88,time:0.7,attend:10,bonus:1,reset:0,total:100.7,points:99},{w:5,study:90,time:0.8,attend:10,bonus:1,reset:0,total:101.8,points:100},{w:4,study:95,time:0.9,attend:10,bonus:1,reset:0,total:106.9,points:105},{w:3,study:92,time:0.7,attend:10,bonus:1,reset:0,total:103.7,points:102},{w:2,study:96,time:0.8,attend:10,bonus:1,reset:0,total:107.8,points:106},{w:1,study:100,time:0.9,attend:10,bonus:1,reset:0,total:111.9,points:110}],
             history:[]}},
          {teacher:'유영선', name:'선시우', grade:'초1', team:'초1-E조', score:'671.67', point:'522.67', rank:8, dropout:false,
           detail:{name:'선시우',team:'초1-E조',score:'671.67',rank:'8',point:'522.67',message:'-',event:'-',
             weeks:[{w:6,study:85,time:4.5,attend:9,bonus:0,reset:0,total:98.5,points:94},{w:5,study:88,time:5.0,attend:10,bonus:0,reset:0,total:103,points:98},{w:4,study:90,time:4.8,attend:9,bonus:0,reset:0,total:103.8,points:99},{w:3,study:87,time:4.6,attend:10,bonus:0,reset:0,total:101.6,points:97},{w:2,study:92,time:5.1,attend:10,bonus:1,reset:0,total:108.1,points:103},{w:1,study:100,time:5.0,attend:10,bonus:0,reset:0,total:115,points:110}],
             history:[]}},
          {teacher:'박은경', name:'현승빈', grade:'초1', team:'초1-F조', score:'670.69', point:'629', rank:9, dropout:false,
           detail:{name:'현승빈',team:'초1-F조',score:'670.69',rank:'9',point:'629',message:'-',event:'-',
             weeks:[{w:6,study:83,time:3.8,attend:10,bonus:1,reset:0,total:97.8,points:94},{w:5,study:86,time:4.1,attend:10,bonus:1,reset:0,total:101.1,points:97},{w:4,study:89,time:4.0,attend:10,bonus:1,reset:0,total:104,points:100},{w:3,study:87,time:3.9,attend:10,bonus:1,reset:0,total:101.9,points:98},{w:2,study:90,time:4.3,attend:10,bonus:1,reset:0,total:105.3,points:101},{w:1,study:95,time:4.2,attend:10,bonus:1,reset:0,total:110.2,points:106}],
             history:[]}},
          {teacher:'이민경', name:'길민호', grade:'초1', team:'초1-A조', score:'666.31', point:'518.83', rank:11, dropout:false,
           detail:{name:'길민호',team:'초1-A조',score:'666.31',rank:'11',point:'518.83',message:'-',event:'-',
             weeks:[{w:6,study:80,time:3.5,attend:9,bonus:0,reset:0,total:92.5,points:89},{w:5,study:83,time:3.8,attend:9,bonus:0,reset:0,total:95.8,points:92},{w:4,study:86,time:4.0,attend:10,bonus:0,reset:0,total:100,points:97},{w:3,study:84,time:3.6,attend:10,bonus:0,reset:0,total:97.6,points:94},{w:2,study:88,time:3.9,attend:9,bonus:1,reset:0,total:101.9,points:98},{w:1,study:90,time:4.1,attend:10,bonus:0,reset:0,total:104.1,points:100}],
             history:[]}},
          {teacher:'문인숙', name:'권시완', grade:'초1', team:'초1-C조', score:'662.5', point:'641', rank:13, dropout:false,
           detail:{name:'권시완',team:'초1-C조',score:'662.5',rank:'13',point:'641',message:'-',event:'-',
             weeks:[{w:6,study:78,time:2.9,attend:10,bonus:0,reset:0,total:90.9,points:88},{w:5,study:82,time:3.2,attend:10,bonus:0,reset:0,total:95.2,points:93},{w:4,study:85,time:3.0,attend:10,bonus:0,reset:0,total:98,points:96},{w:3,study:83,time:2.8,attend:10,bonus:0,reset:0,total:95.8,points:94},{w:2,study:87,time:3.5,attend:10,bonus:1,reset:0,total:101.5,points:99},{w:1,study:92,time:3.3,attend:10,bonus:0,reset:0,total:105.3,points:103}],
             history:[]}},
          {teacher:'윤희순', name:'김하민', grade:'초1', team:'초1-D조', score:'660.44', point:'622.17', rank:14, dropout:false,
           detail:{name:'김하민',team:'초1-D조',score:'660.44',rank:'14',point:'622.17',message:'-',event:'-',
             weeks:[{w:6,study:76,time:3.1,attend:10,bonus:1,reset:0,total:90.1,points:87},{w:5,study:80,time:3.4,attend:10,bonus:1,reset:0,total:94.4,points:91},{w:4,study:83,time:3.2,attend:10,bonus:1,reset:0,total:97.2,points:94},{w:3,study:81,time:3.0,attend:10,bonus:1,reset:0,total:95,points:92},{w:2,study:86,time:3.6,attend:10,bonus:1,reset:0,total:100.6,points:97},{w:1,study:90,time:3.5,attend:10,bonus:1,reset:0,total:104.5,points:101}],
             history:[]}},
          {teacher:'한수정', name:'장수연', grade:'중2', team:'– –', score:'353.01', point:'330', rank:0, dropout:true, detail:null},
          {teacher:'이수지', name:'오민준', grade:'초3', team:'초3-B조', score:'488.50', point:'460', rank:0, dropout:true, detail:null},
          {teacher:'박재원', name:'나지원', grade:'초3', team:'초3-A조', score:'312.80', point:'290', rank:0, dropout:true, detail:null},
        ];

        var PAGE_SIZE = 10;
        var curMemberPage = 1;
        var filteredMembers = MEMBERS_DATA.slice();

        function renderMembers() {
          var tbody = document.getElementById('member-tbody');
          if (!tbody) return;
          tbody.innerHTML = '';
          var start = (curMemberPage - 1) * PAGE_SIZE;
          var end = Math.min(start + PAGE_SIZE, filteredMembers.length);
          window.__memberDetails = window.__memberDetails || [];
          for (var i = start; i < end; i++) {
            var r = filteredMembers[i];
            var rankCell = r.rank > 0 ? r.rank : '–';
            // Store detail for popup access
            window.__memberDetails[i] = r.detail;
            // 자세히보기 column: blank (detail accessed via 관리 column)
            var detailCell = '–';
            // 리그 탈락 여부: green "진행중" badge for active, red "탈락" for eliminated
            var dropoutCell = r.dropout
              ? '<span class="badge badge-red">탈락</span>'
              : '<span class="badge badge-green" style="font-size:11px;">진행중</span>';
            // 관리 column: blue button (differentiated from green badge above)
            var manageCell;
            if (r.dropout) {
              manageCell = '–';
            } else if (r.detail) {
              if (r.team && r.team !== '– –') {
                manageCell = '<button class="btn btn-primary btn-sm" style="min-width:68px;" onclick="openMemberDetail(window.__memberDetails[' + i + '])">진행중</button>';
              } else {
                manageCell = '<button class="btn btn-secondary btn-sm" onclick="openMemberDetail(window.__memberDetails[' + i + '])">상세보기</button>';
              }
            } else {
              manageCell = '–';
            }
            var tr = document.createElement('tr');
            tr.innerHTML =
              '<td>' + (i + 1) + '</td>' +
              '<td>' + r.teacher + '</td>' +
              '<td><b>' + r.name + '</b></td>' +
              '<td>' + r.grade + '</td>' +
              '<td>' + r.team + '</td>' +
              '<td>' + r.score + '</td>' +
              '<td>' + r.point + '</td>' +
              '<td>' + rankCell + '</td>' +
              '<td>' + detailCell + '</td>' +
              '<td>' + dropoutCell + '</td>' +
              '<td>' + manageCell + '</td>';
            tbody.appendChild(tr);
          }
          renderMemberPaging();
        }

        function renderMemberPaging() {
          var total = Math.ceil(filteredMembers.length / PAGE_SIZE);
          var pg = document.getElementById('member-paging');
          if (!pg) return;
          pg.innerHTML = '';
          var prev = document.createElement('button');
          prev.textContent = '◀'; prev.disabled = (curMemberPage === 1);
          prev.onclick = function(){ if(curMemberPage > 1){ curMemberPage--; renderMembers(); } };
          pg.appendChild(prev);
          var sp = Math.max(1, curMemberPage - 4), ep = Math.min(total, sp + 9);
          for (var p = sp; p <= ep; p++) {
            (function(pp){
              var btn = document.createElement('button');
              btn.textContent = pp;
              if (pp === curMemberPage) btn.className = 'active';
              btn.onclick = function(){ curMemberPage = pp; renderMembers(); };
              pg.appendChild(btn);
            })(p);
          }
          var next = document.createElement('button');
          next.textContent = '▶'; next.disabled = (curMemberPage === total || total === 0);
          next.onclick = function(){ if(curMemberPage < total){ curMemberPage++; renderMembers(); } };
          pg.appendChild(next);
          var info = document.createElement('span');
          info.style.cssText = 'font-size:12px;color:#888;margin-left:8px;';
          info.textContent = curMemberPage + ' / ' + (total || 1) + ' 페이지  (총 ' + filteredMembers.length + '명)';
          pg.appendChild(info);
        }

        window._renderMembers = renderMembers;
        renderMembers();
      })();
      </script>
    </div>

    <!-- 자세히보기 팝업 모달 -->
    <div id="modal-member-detail" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,.45); z-index:9000; overflow-y:auto;">
      <div style="background:#fff; border-radius:10px; width:960px; max-width:96vw; margin:40px auto; padding:0; position:relative; box-shadow:0 8px 40px rgba(0,0,0,.25);">
        <!-- 닫기 -->
        <button onclick="closeMemberDetail()" style="position:absolute; top:16px; right:20px; background:none; border:none; font-size:22px; cursor:pointer; color:#888; z-index:10;">✕</button>

        <div style="padding:32px 36px 24px;">

          <!-- 상단 2열: 리그 정보 + 주차별 점수 변화 -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px;">

            <!-- 리그 정보 -->
            <div>
              <div style="font-size:15px; font-weight:700; color:#2c5f7a; margin-bottom:14px;">
                🎓 리그 정보
              </div>
              <table style="width:100%; border-collapse:collapse; font-size:13px; border:1px solid #dde3ea;">
                <tbody id="md-info-table">
                </tbody>
              </table>
            </div>

            <!-- 주차별 점수 변화 차트 -->
            <div>
              <div style="font-size:15px; font-weight:700; color:#2c5f7a; margin-bottom:14px;">
                📈 주차별 점수 변화
              </div>
              <canvas id="md-chart" style="width:100%; height:200px;"></canvas>
            </div>
          </div>

          <!-- 주차별 점수 리스트 -->
          <div style="margin-bottom:28px;">
            <div style="font-size:15px; font-weight:700; color:#2c5f7a; margin-bottom:12px;">📋 주차별 점수 리스트</div>
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:12.5px; white-space:nowrap;">
                <thead>
                  <tr style="background:#4a90b8; color:#fff;">
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">주차</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">학습 점수</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">시간 점수</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">출결 점수</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">단위레슨 가산점</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">리셋 감점</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">총 점수</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">총 포인트</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">조 등수 / 조 인원</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">전국 등수 / 전국 참여 인원(학년별)</th>
                  </tr>
                </thead>
                <tbody id="md-week-tbody" style="font-size:12.5px;"></tbody>
              </table>
            </div>
          </div>

          <!-- 포인트 추가 지급 -->
          <div style="margin-bottom:28px;">
            <div style="font-size:15px; font-weight:700; color:#2c5f7a; margin-bottom:12px;">💰 포인트 추가 지급</div>
            <div style="background:#f7fbfe; border:1px solid #dde3ea; border-radius:8px; padding:18px 20px;">
              <!-- 현재 누적 포인트 표시 -->
              <div style="display:flex; align-items:center; gap:20px; margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid #e0e9f2;">
                <span style="font-size:13px; color:#555; font-weight:600;">현재 누적 포인트</span>
                <span id="md-current-point" style="font-size:20px; font-weight:800; color:#2c5f7a;">0</span>
                <span style="font-size:13px; color:#888;">P</span>
              </div>
              <!-- 지급 폼 -->
              <div style="display:grid; grid-template-columns:1fr 1fr 2fr auto; gap:12px; align-items:end;">
                <div>
                  <div style="font-size:12px; font-weight:600; color:#555; margin-bottom:5px;">지급 포인트 <span style="color:#e74c3c;">*</span></div>
                  <input type="number" id="md-add-point" class="form-input" placeholder="숫자 입력 (음수 가능)" style="width:100%; box-sizing:border-box; text-align:right;">
                </div>
                <div>
                  <div style="font-size:12px; font-weight:600; color:#555; margin-bottom:5px;">지급 사유 <span style="color:#e74c3c;">*</span></div>
                  <select id="md-point-reason" class="form-select" style="width:100%;">
                    <option value="">사유 선택</option>
                    <option>관리자 수동 지급</option>
                    <option>이벤트 보상</option>
                    <option>오류 수정</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <div style="font-size:12px; font-weight:600; color:#555; margin-bottom:5px;">메모</div>
                  <input type="text" id="md-point-memo" class="form-input" placeholder="상세 메모 입력 (선택)" style="width:100%; box-sizing:border-box;">
                </div>
                <div>
                  <button class="btn btn-primary" style="white-space:nowrap; padding:8px 20px;" onclick="addMemberPoint()">지급</button>
                </div>
              </div>
              <!-- 지급 내역 -->
              <div style="margin-top:16px;" id="md-point-log-wrap">
                <div style="font-size:12.5px; font-weight:600; color:#555; margin-bottom:8px;">지급 내역</div>
                <table style="width:100%; border-collapse:collapse; font-size:12px;" id="md-point-log-table">
                  <thead>
                    <tr style="background:#e8f4fb;">
                      <th style="padding:7px 12px; border:1px solid #dde3ea; text-align:center; color:#2c5f7a;">일시</th>
                      <th style="padding:7px 12px; border:1px solid #dde3ea; text-align:center; color:#2c5f7a;">지급 포인트</th>
                      <th style="padding:7px 12px; border:1px solid #dde3ea; text-align:center; color:#2c5f7a;">사유</th>
                      <th style="padding:7px 12px; border:1px solid #dde3ea; text-align:center; color:#2c5f7a;">메모</th>
                      <th style="padding:7px 12px; border:1px solid #dde3ea; text-align:center; color:#2c5f7a;">관리자ID</th>
                      <th style="padding:7px 12px; border:1px solid #dde3ea; text-align:center; color:#2c5f7a;">지급 후 누적</th>
                    </tr>
                  </thead>
                  <tbody id="md-point-log-tbody">
                    <tr>
                      <td colspan="6" style="padding:14px; text-align:center; color:#aaa; border:1px solid #eef2f7; font-size:12px;">추가 지급 내역이 없습니다.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 참여 리그 기록 -->
          <div>
            <div style="font-size:15px; font-weight:700; color:#2c5f7a; margin-bottom:12px;">🏆 참여 리그 기록</div>
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:12.5px;">
                <thead>
                  <tr style="background:#4a90b8; color:#fff;">
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">구분</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">리그명</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">총 점수</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">등수</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">총 포인트</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">사용포인트</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">잔여포인트</th>
                    <th style="padding:9px 14px; border:1px solid #3a7aa8;">포상품</th>
                  </tr>
                </thead>
                <tbody id="md-history-tbody" style="font-size:12.5px;"></tbody>
              </table>
            </div>
          </div>

        </div>
        <!-- 하단 닫기 -->
        <div style="text-align:center; padding:16px 0 24px; border-top:1px solid #eef2f7;">
          <button onclick="closeMemberDetail()" class="btn btn-gray" style="padding:8px 40px;">닫기</button>
        </div>
      </div>
    </div>

    <script>
    var _mdCurrentPoint = 0;
    var _mdPointLogs = [];

    function openMemberDetail(data) {
      // 현재 포인트 저장 + 초기화
      _mdCurrentPoint = parseFloat(data.point) || 0;
      _mdPointLogs = [];
      document.getElementById('md-current-point').textContent = _mdCurrentPoint.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:2});
      document.getElementById('md-add-point').value = '';
      document.getElementById('md-point-reason').value = '';
      document.getElementById('md-point-memo').value = '';
      renderPointLog();

      // 리그 정보 테이블
      var infoRows = [
        ['이름', data.name, '회원번호', data.memberNo || data['회원번호'] || '—'],
        ['학년', data.grade || '—', '현재 등수', data.rank],
        ['조이름', data.team, '누적 점수', data.score],
        ['포춘메시지', data.message, '누적 포인트', data.point],
        ['이벤트선물', data.event, '', ''],
      ];
      var infoTbody = document.getElementById('md-info-table');
      infoTbody.innerHTML = '';
      infoRows.forEach(function(row) {
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td style="padding:9px 14px; font-weight:600; color:#555; background:#f7fbfe; border:1px solid #dde3ea; width:80px;">'+row[0]+'</td>'+
          '<td style="padding:9px 14px; border:1px solid #dde3ea; color:#333;">'+row[1]+'</td>'+
          (row[2] ? '<td style="padding:9px 14px; font-weight:600; color:#555; background:#f7fbfe; border:1px solid #dde3ea; width:80px;">'+row[2]+'</td>' : '<td style="border:1px solid #dde3ea;"></td>')+
          (row[3] ? '<td style="padding:9px 14px; border:1px solid #dde3ea; font-weight:700; color:#2c5f7a;">'+row[3]+'</td>' : '<td style="border:1px solid #dde3ea;"></td>');
        infoTbody.appendChild(tr);
      });

      // 주차별 리스트
      var weekTbody = document.getElementById('md-week-tbody');
      weekTbody.innerHTML = '';
      data.weeks.forEach(function(w) {
        var tr = document.createElement('tr');
        tr.style.cssText = 'border-bottom:1px solid #eef2f7;';
        tr.innerHTML =
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7; font-weight:700;">'+w.w+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+w.study+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+w.time+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+w.attend+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+w.bonus+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+w.reset+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7; font-weight:700;">'+w.total+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+w.points+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">0 / 0</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">0 / 0</td>';
        weekTbody.appendChild(tr);
      });

      // 참여 리그 기록
      var histTbody = document.getElementById('md-history-tbody');
      histTbody.innerHTML = '';
      data.history.forEach(function(h) {
        var tr = document.createElement('tr');
        tr.style.cssText = 'border-bottom:1px solid #eef2f7;';
        tr.innerHTML =
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+h.no+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+h.league+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+h.score+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+h.rank+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+h.point+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+h.used+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7;">'+h.remain+'</td>'+
          '<td style="padding:8px 14px; text-align:center; border:1px solid #eef2f7; font-size:11.5px;">'+h.gift+'</td>';
        histTbody.appendChild(tr);
      });

      // 차트 (간단 Canvas 라인차트)
      var canvas = document.getElementById('md-chart');
      var ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth || 380;
      canvas.height = 200;
      var scores = data.weeks.slice().reverse().map(function(w){return w.total;});
      var labels = data.weeks.slice().reverse().map(function(w){return w.w+'주';});
      var minV = Math.min.apply(null,scores)-20;
      var maxV = Math.max.apply(null,scores)+20;
      var W=canvas.width, H=canvas.height;
      var padL=36,padR=16,padT=14,padB=28;
      ctx.clearRect(0,0,W,H);
      // grid lines
      ctx.strokeStyle='#e0e0e0'; ctx.lineWidth=1;
      [0,30,60,90,120,150].forEach(function(v){
        var y=padT+(H-padT-padB)*(1-(v-0)/(150-0));
        if(y>padT && y<H-padB){
          ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(W-padR,y); ctx.stroke();
          ctx.fillStyle='#999'; ctx.font='10px sans-serif'; ctx.textAlign='right';
          ctx.fillText(v, padL-4, y+4);
        }
      });
      // x labels
      ctx.fillStyle='#999'; ctx.font='11px sans-serif'; ctx.textAlign='center';
      var step=(W-padL-padR)/(scores.length-1);
      labels.forEach(function(l,i){
        ctx.fillText(l, padL+i*step, H-padB+16);
      });
      // line
      ctx.strokeStyle='#27ae60'; ctx.lineWidth=2.5; ctx.lineJoin='round';
      ctx.beginPath();
      scores.forEach(function(v,i){
        var x=padL+i*step;
        var y=padT+(H-padT-padB)*(1-(v-0)/(150-0));
        i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      });
      ctx.stroke();
      // dots
      ctx.fillStyle='#27ae60';
      scores.forEach(function(v,i){
        var x=padL+i*step;
        var y=padT+(H-padT-padB)*(1-(v-0)/(150-0));
        ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fill();
      });

      document.getElementById('modal-member-detail').style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    function addMemberPoint() {
      var pts = parseFloat(document.getElementById('md-add-point').value);
      var reason = document.getElementById('md-point-reason').value;
      if(isNaN(pts) || pts === 0) { alert('지급 포인트를 입력해주세요.'); return; }
      if(!reason) { alert('지급 사유를 선택해주세요.'); return; }
      var memo = document.getElementById('md-point-memo').value.trim();
      _mdCurrentPoint = Math.round((_mdCurrentPoint + pts) * 100) / 100;
      var now = new Date();
      var ts = now.getFullYear()+'-'
        +String(now.getMonth()+1).padStart(2,'0')+'-'
        +String(now.getDate()).padStart(2,'0')+' '
        +String(now.getHours()).padStart(2,'0')+':'
        +String(now.getMinutes()).padStart(2,'0');
      _mdPointLogs.unshift({ ts:ts, pts:pts, reason:reason, memo:memo||'-', after:_mdCurrentPoint, adminId:'admin_' + (Math.floor(Math.random()*9000)+1001) });
      document.getElementById('md-current-point').textContent = _mdCurrentPoint.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:2});
      document.getElementById('md-add-point').value = '';
      document.getElementById('md-point-reason').value = '';
      document.getElementById('md-point-memo').value = '';
      renderPointLog();
    }

    function renderPointLog() {
      var tbody = document.getElementById('md-point-log-tbody');
      if(!_mdPointLogs.length) {
        tbody.innerHTML = '<tr><td colspan="6" style="padding:14px; text-align:center; color:#aaa; border:1px solid #eef2f7; font-size:12px;">추가 지급 내역이 없습니다.</td></tr>';
        return;
      }
      tbody.innerHTML = '';
      _mdPointLogs.forEach(function(log) {
        var ptsColor = log.pts > 0 ? '#27ae60' : '#e74c3c';
        var ptsText  = log.pts > 0 ? '+'+log.pts : String(log.pts);
        var tr = document.createElement('tr');
        tr.style.cssText = 'border-bottom:1px solid #eef2f7;';
        tr.innerHTML =
          '<td style="padding:7px 12px; text-align:center; border:1px solid #eef2f7; color:#888;">'+log.ts+'</td>'+
          '<td style="padding:7px 12px; text-align:center; border:1px solid #eef2f7; font-weight:700; color:'+ptsColor+';">'+ptsText+' P</td>'+
          '<td style="padding:7px 12px; text-align:center; border:1px solid #eef2f7;">'+log.reason+'</td>'+
          '<td style="padding:7px 12px; text-align:center; border:1px solid #eef2f7; color:#666;">'+log.memo+'</td>'+
          '<td style="padding:7px 12px; text-align:center; border:1px solid #eef2f7; color:#888; font-size:11px;">'+(log.adminId||'—')+'</td>'+
          '<td style="padding:7px 12px; text-align:center; border:1px solid #eef2f7; font-weight:700; color:#2c5f7a;">'+log.after.toLocaleString()+'</td>';
        tbody.appendChild(tr);
      });
    }

    function closeMemberDetail() {
      document.getElementById('modal-member-detail').style.display = 'none';
      document.body.style.overflow = '';
    }
    </script>

    <!-- ══════════════════════════════════════════════ -->
    <!-- PAGE 5: 신청 통계 -->
    <!-- ══════════════════════════════════════════════ -->
    <div id="page-apply-stats" class="page-section">
      <div class="page-header">
        <div class="page-title">써밋 리그 신청 통계</div>
        <div class="breadcrumb">🏠 > 써밋 리그 관리 > <span>써밋 리그 신청 통계</span></div>
      </div>

      <style>
        /* ── 신청 통계 ── */
        .stats-sum-cards { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:14px; }
        .stats-sum-card { background:#fff; border:1px solid #dde3ea; border-radius:10px; padding:18px 18px 14px; }
        .stats-sum-card .sc-label { font-size:12px; color:#888; margin-bottom:8px; }
        .stats-sum-card .sc-value { font-size:28px; font-weight:700; line-height:1.15; }
        .stats-charts-row { display:grid; grid-template-columns:62fr 38fr; gap:14px; margin-bottom:14px; }
        .stats-chart-panel { background:#fff; border:1px solid #dde3ea; border-radius:10px; padding:18px 18px 12px; position:relative; }
        .stats-chart-title { font-size:14px; font-weight:700; color:#2c4f6c; margin-bottom:14px; }
        .stats-bar-area { display:flex; align-items:flex-end; height:280px; width:100%; padding-bottom:26px; border-bottom:1px solid #dde3ea; position:relative; }
        .stats-bar-item { display:flex; flex-direction:column; align-items:center; flex:1; }
        .stats-bar-value { font-size:10px; font-weight:600; color:#2c4f6c; margin-bottom:3px; }
        .stats-bar-col { border-radius:4px 4px 0 0; width:56px; }
        .stats-bar-label { font-size:10px; color:#888; margin-top:5px; }
        .stats-empty-overlay { position:absolute; inset:0; background:rgba(255,255,255,0.88); display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:8px; }
        .stats-empty-icon { font-size:40px; margin-bottom:10px; }
        .stats-empty-title { font-size:16px; font-weight:700; color:#2c4f6c; margin-bottom:5px; }
        .stats-empty-sub { font-size:13px; color:#888; }
        .stats-info-banner { background:#e3f2fd; border:1px solid #90caf9; border-radius:10px; padding:14px 20px; margin-bottom:14px; font-size:13px; color:#1665c0; }
        .stats-dday-pill { display:flex; align-items:center; justify-content:center; background:#e3f2fd; border-radius:26px; padding:14px 28px; font-size:14px; font-weight:700; color:#1665c0; margin:20px auto 0; width:fit-content; }
        #stats-search-bar { background:#f7f9fb; border:1px solid #dde5ee; border-radius:8px; padding:10px 14px 10px; margin-bottom:12px; display:flex; align-items:center; gap:12px; }
        #stats-search-bar .sf-group { display:flex; flex-direction:column; gap:3px; flex:1; }
        #stats-search-bar .sf-label { font-size:10.5px; font-weight:500; color:#556; }
        .stats-count-pill { display:inline-flex; align-items:center; background:#faa523; color:#fff; font-weight:700; font-size:11px; padding:4px 14px; border-radius:13px; }
        #stats-table { width:100%; border-collapse:collapse; font-size:11px; white-space:nowrap; }
        #stats-table thead tr { background:#4a90b9; color:#fff; }
        #stats-table thead th { padding:9px 10px; text-align:center; font-weight:600; border:1px solid #3b7aa8; font-size:11px; }
        #stats-table tbody tr:nth-child(even) { background:#f7fafe; }
        #stats-table tbody td { padding:8px 10px; text-align:center; border:1px solid #e5ecf2; vertical-align:middle; }
        #stats-table tbody td.td-left { text-align:left; font-size:10px; }
        #stats-table tfoot tr { background:#e8f4fb; }
        #stats-table tfoot td { padding:9px 10px; border:1px solid #ccd9e5; font-weight:700; color:#2c5f7a; font-size:11px; }
        .stats-rate-wrap { display:flex; align-items:center; gap:7px; }
        .stats-rate-track { flex:1; height:12px; border-radius:4px; background:#e5ecf2; min-width:60px; }
        .stats-rate-fill { height:12px; border-radius:4px; }
        .stats-paging { display:flex; gap:4px; align-items:center; justify-content:center; margin-top:14px; }
        .stats-paging button { min-width:30px; height:30px; border:1px solid #dde3ea; border-radius:4px; background:#fff; cursor:pointer; font-size:12px; color:#555; }
        .stats-paging button.active { background:#4a90b8; color:#fff; border-color:#4a90b8; font-weight:700; }
        .stats-paging button:hover:not(.active) { background:#e8f4fb; }
        .zero-red { color:#e74c3c; font-weight:700; }
      </style>

      <!-- ── 데이터 없음 상태 ── -->
      <div id="stats-empty-state" style="display:none;">
        <div class="stats-info-banner">ℹ&nbsp; 신청 기간(2025.12.01 ~ 2025.12.31) 시작 후 통계가 집계됩니다. 현재는 통계 데이터가 없습니다.</div>
        <div class="stats-sum-cards">
          <div class="stats-sum-card" style="background:#f2f3f4;text-align:center;"><div class="sc-label">총 신청 인원</div><div class="sc-value" style="color:#c7ccd1;">0명</div><div style="font-size:11px;color:#b2b8bd;margin-top:6px;">신청 기간 전</div></div>
          <div class="stats-sum-card" style="background:#f2f3f4;text-align:center;"><div class="sc-label">윈터리그 신청</div><div class="sc-value" style="color:#c7ccd1;">0명</div><div style="font-size:11px;color:#b2b8bd;margin-top:6px;">신청 기간 전</div></div>
          <div class="stats-sum-card" style="background:#f2f3f4;text-align:center;"><div class="sc-label">완료 인원</div><div class="sc-value" style="color:#c7ccd1;">0명</div><div style="font-size:11px;color:#b2b8bd;margin-top:6px;">신청 기간 전</div></div>
          <div class="stats-sum-card" style="background:#f2f3f4;text-align:center;"><div class="sc-label">탈락 인원</div><div class="sc-value" style="color:#c7ccd1;">0명</div><div style="font-size:11px;color:#b2b8bd;margin-top:6px;">신청 기간 전</div></div>
        </div>
        <div class="stats-charts-row">
          <div class="stats-chart-panel" style="min-height:340px;"><div class="stats-chart-title">학년별 신청 인원</div><div class="stats-empty-overlay"><div class="stats-empty-icon">📊</div><div class="stats-empty-title">데이터 없음</div><div class="stats-empty-sub">신청 기간이 시작되면 학년별 통계가 자동으로 표시됩니다.</div></div></div>
          <div class="stats-chart-panel" style="min-height:340px;"><div class="stats-chart-title">월별 신청 추이</div><div class="stats-empty-overlay"><div class="stats-empty-icon">📈</div><div class="stats-empty-title">데이터 없음</div><div class="stats-empty-sub">신청 시작 후 추이가 표시됩니다.</div></div></div>
        </div>
        <div class="stats-dday-pill">📅&nbsp; 신청 기간 시작까지&nbsp; D-60</div>
      </div>

      <!-- ── 데이터 있음 상태 ── -->
      <div id="stats-data-state">
        <!-- 요약 카드 -->
        <div class="stats-sum-cards">
          <div class="stats-sum-card"><div class="sc-label">총 신청 인원</div><div class="sc-value" style="color:#2c4f6c;">43,428명</div></div>
          <div class="stats-sum-card"><div class="sc-label">윈터리그 신청</div><div class="sc-value" style="color:#4a90b8;">43,428명</div></div>
          <div class="stats-sum-card"><div class="sc-label">완료 인원</div><div class="sc-value" style="color:#27ae60;">41,205명</div></div>
          <div class="stats-sum-card"><div class="sc-label">탈락 인원</div><div class="sc-value" style="color:#e74c3c;">2,223명</div></div>
        </div>

        <!-- 차트 패널 -->
        <div class="stats-charts-row">
          <div class="stats-chart-panel">
            <div class="stats-chart-title">학년별 신청 인원</div>
            <div class="stats-bar-area" id="stats-bar-chart"></div>
          </div>
          <div class="stats-chart-panel">
            <div class="stats-chart-title">월별 신청 추이</div>
            <svg id="stats-line-svg" width="100%" style="overflow:visible;display:block;"></svg>
          </div>
        </div>

        <!-- 검색 -->
        <div id="stats-search-bar">
          <div style="font-size:11px;font-weight:600;color:#2c5f7a;white-space:nowrap;">🔍 검색</div>
          <div class="sf-group">
            <label class="sf-label">본부</label>
            <input class="form-input" id="st-bonbu" placeholder="전체 본부" style="height:30px;font-size:11px;border:1px solid #ccd1d9;border-radius:4px;padding:0 9px;background:#fff;">
          </div>
          <div class="sf-group">
            <label class="sf-label">지점</label>
            <input class="form-input" id="st-jijum" placeholder="전체 지점" style="height:30px;font-size:11px;border:1px solid #ccd1d9;border-radius:4px;padding:0 9px;background:#fff;">
          </div>
          <div class="sf-group">
            <label class="sf-label">팀/센터</label>
            <input class="form-input" id="st-center" placeholder="팀/센터명 입력" style="height:30px;font-size:11px;border:1px solid #ccd1d9;border-radius:4px;padding:0 9px;background:#fff;">
          </div>
          <button style="background:#4a90b9;color:#fff;border:none;height:30px;padding:0 18px;border-radius:4px;font-size:11px;font-weight:600;cursor:pointer;margin-top:14px;" onclick="doStatsSearch()">검색</button>
          <button style="background:#eaedf2;color:#4d4d59;border:1px solid #ccd1d9;height:30px;padding:0 14px;border-radius:4px;font-size:11px;cursor:pointer;margin-top:14px;" onclick="resetStatsSearch()">초기화</button>
        </div>

        <!-- 건수 + 엑셀 -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div class="stats-count-pill">총 <span id="stats-count">2,621</span>건</div>
          <button style="background:#eaedf2;color:#333340;border:1px solid #ccd1d9;height:28px;padding:0 14px;border-radius:4px;font-size:11px;cursor:pointer;" onclick="downloadStatsExcel()">📥 엑셀 다운로드</button>
        </div>

        <!-- 테이블 -->
        <div class="card" style="padding:0; overflow:hidden;">
          <table id="stats-table">
            <thead>
              <tr>
                <th>지점</th><th>팀/센터명</th><th>교사명</th>
                <th>총 학생 수</th><th>신청완료</th><th>신청대기</th><th>미신청</th><th>신청율</th>
              </tr>
            </thead>
            <tbody id="stats-tbody"></tbody>
            <tfoot>
              <tr>
                <td colspan="3">전체 합계</td>
                <td id="st-tot-total">-</td><td id="st-tot-done">-</td>
                <td id="st-tot-wait">-</td><td id="st-tot-none">-</td><td id="st-tot-rate">-</td>
              </tr>
            </tfoot>
          </table>
          <div class="stats-paging" id="stats-paging"></div>
          <div style="height:12px;"></div>
        </div>
      </div>

      <script>
      (function(){
        // ── 데이터 없음 / 있음 상태 전환 ──
        var HAS_DATA = true;
        document.getElementById('stats-empty-state').style.display = HAS_DATA ? 'none' : 'block';
        document.getElementById('stats-data-state').style.display  = HAS_DATA ? 'block' : 'none';

        // ── 학년별 막대 차트 ──
        var GRADE_DATA = [
          {grade:'초1', count:2581}, {grade:'초2', count:5358},
          {grade:'초3', count:7034}, {grade:'초4', count:7396},
          {grade:'초5', count:6549}, {grade:'초6', count:5434},
          {grade:'중1', count:4020}, {grade:'중2', count:2888},
          {grade:'중3', count:1860}
        ];
        var barColors = ['#4a90b8','#4f90b3','#5490ae','#5990a9','#5e90a4','#63909f','#69909a','#6e9094','#73908f'];
        function renderBarChart() {
          var container = document.getElementById('stats-bar-chart');
          if (!container) return;
          var maxV = Math.max.apply(null, GRADE_DATA.map(function(d){ return d.count; }));
          var maxH = 230;
          container.innerHTML = '';
          GRADE_DATA.forEach(function(d, i) {
            var h = Math.round(d.count / maxV * maxH);
            var item = document.createElement('div');
            item.className = 'stats-bar-item';
            item.innerHTML =
              '<div class="stats-bar-value">' + d.count.toLocaleString() + '</div>' +
              '<div class="stats-bar-col" style="height:' + h + 'px;background:' + barColors[i] + ';"></div>' +
              '<div class="stats-bar-label">' + d.grade + '</div>';
            container.appendChild(item);
          });
        }
        if (HAS_DATA) renderBarChart();

        // ── 월별 선 차트 ──
        var MONTHLY_DATA = [
          {m:'1',  v:500},  {m:'2',  v:1200}, {m:'3',  v:2800},
          {m:'4',  v:5500}, {m:'5',  v:9800}, {m:'6',  v:15200},
          {m:'7',  v:22000},{m:'8',  v:29500},{m:'9',  v:35200},
          {m:'10', v:39500},{m:'11', v:42000},{m:'12', v:43428}
        ];
        function renderLineChart() {
          var svg = document.getElementById('stats-line-svg');
          if (!svg) return;
          var W = 540, H = 300, pL=36, pR=16, pT=20, pB=32;
          var cw = W-pL-pR, ch = H-pT-pB;
          var maxV = Math.max.apply(null, MONTHLY_DATA.map(function(d){ return d.v; }));
          var pts = MONTHLY_DATA.map(function(d, i) {
            return {
              x: (pL + (i/(MONTHLY_DATA.length-1))*cw).toFixed(1),
              y: (pT + ch - (d.v/maxV)*ch).toFixed(1),
              m: d.m
            };
          });
          var hlines = '';
          for (var g=0; g<=4; g++) {
            var gy = (pT + (ch/4)*g).toFixed(1);
            hlines += '<line x1="'+pL+'" y1="'+gy+'" x2="'+(pL+cw)+'" y2="'+gy+'" stroke="#e5ecf2" stroke-width="1"/>';
          }
          svg.setAttribute('viewBox','0 0 '+W+' '+H);
          svg.setAttribute('height', H);
          svg.innerHTML = hlines +
            '<polyline points="'+pts.map(function(p){return p.x+','+p.y;}).join(' ')+
            '" fill="none" stroke="#4a90b9" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' +
            pts.map(function(p){
              return '<circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="#4a90b9" stroke="#fff" stroke-width="1.5"/>';
            }).join('') +
            pts.map(function(p){
              return '<text x="'+p.x+'" y="'+(H-6)+'" font-size="10" fill="#888" text-anchor="middle">'+p.m+'월</text>';
            }).join('');
        }
        if (HAS_DATA) renderLineChart();

        var STATS_DATA = [
          {bonbu:'대교 경기본부',    jijum:'대교 군포산본 Hive',    center:'대교 군포산본 Hive 001팀',    teacher:'송자영', total:18, done:18, wait:0, none:0},
          {bonbu:'대교 경기본부',    jijum:'대교 군포산본 Hive',    center:'대교 군포산본 Hive 002팀',    teacher:'한미정', total:22, done:20, wait:1, none:1},
          {bonbu:'대교 경기본부',    jijum:'대교 안양만안 Hive',    center:'대교 안양만안 Hive 001팀',    teacher:'박동영', total:15, done:11, wait:0, none:4},
          {bonbu:'대교 경기본부',    jijum:'대교 안양만안 Hive',    center:'대교 안양만안 Hive 002팀',    teacher:'조현정', total:19, done:17, wait:2, none:0},
          {bonbu:'대교 경기본부',    jijum:'대교 경기평택 Hive',    center:'[HI]비전',                    teacher:'김소미', total:24, done:23, wait:0, none:1},
          {bonbu:'대교 경기본부',    jijum:'대교 경기평택 Hive',    center:'[LC]서정',                    teacher:'이진아', total:17, done:16, wait:1, none:0},
          {bonbu:'대교 경산본부',    jijum:'대교 대구월성 Hive',    center:'대교 대구월성 Hive 001팀',    teacher:'박정락', total:21, done:20, wait:0, none:1},
          {bonbu:'대교 경산본부',    jijum:'대교 대구월성 Hive',    center:'대교 대구월성 Hive 002팀',    teacher:'박미나', total:16, done:16, wait:0, none:0},
          {bonbu:'대교 경산본부',    jijum:'대교 울산북구 Hive',    center:'[LC]블루마',                  teacher:'김완기', total:28, done:27, wait:1, none:0},
          {bonbu:'대교 경산본부',    jijum:'대교 울산북구 Hive',    center:'[LC]울산호계',                teacher:'박진영', total:19, done:18, wait:0, none:1},
          {bonbu:'대교 경산본부',    jijum:'대교 구미서부 Hive',    center:'[LC]문성',                    teacher:'최경애', total:23, done:22, wait:0, none:1},
          {bonbu:'대교 경산본부',    jijum:'대교 동대구 Hive',      center:'[YC]대산',                    teacher:'윤희순', total:18, done:15, wait:2, none:1},
          {bonbu:'대교 경산본부',    jijum:'대교 대구남부 Hive',    center:'[LC]중리',                    teacher:'문인숙', total:25, done:25, wait:0, none:0},
          {bonbu:'대교 경산본부',    jijum:'대교 대구남부 Hive',    center:'[LC]중리',                    teacher:'이주영', total:20, done:20, wait:0, none:0},
          {bonbu:'대교 경산본부',    jijum:'대구강북 교육국',       center:'대구강북 교육국 001팀',        teacher:'이효진', total:12, done:11, wait:0, none:1},
          {bonbu:'대교 경산본부',    jijum:'영주 교육국',           center:'영주 교육국 001팀',            teacher:'김민성', total:8,  done:8,  wait:0, none:0},
          {bonbu:'대교 경인본부',    jijum:'대교 부천북부 Hive',    center:'[LC]오정',                    teacher:'강희영', total:26, done:24, wait:1, none:1},
          {bonbu:'대교 경인본부',    jijum:'대교 부천북부 Hive',    center:'[YC]부평',                    teacher:'노수민', total:18, done:17, wait:0, none:1},
          {bonbu:'대교 경인본부',    jijum:'대교 김포한강 Hive',    center:'[LC]북변',                    teacher:'유영선', total:22, done:21, wait:1, none:0},
          {bonbu:'대교 경인본부',    jijum:'대교 인천서부 Hive',    center:'[LC]검단',                    teacher:'이수민', total:31, done:29, wait:2, none:0},
          {bonbu:'대교 경인본부',    jijum:'대교 인천서부 Hive',    center:'[YC]청라',                    teacher:'한정아', total:19, done:17, wait:0, none:2},
          {bonbu:'대교 부경본부',    jijum:'대교 부산강서 Hive',    center:'[LC]을숙도',                  teacher:'유경아', total:24, done:24, wait:0, none:0},
          {bonbu:'대교 부경본부',    jijum:'대교 부산강서 Hive',    center:'[LC]명지국제',                teacher:'이수지', total:20, done:20, wait:0, none:0},
          {bonbu:'대교 부경본부',    jijum:'대교 부산연제 Hive',    center:'대교 부산연제 Hive 001팀',    teacher:'이시윤', total:15, done:14, wait:1, none:0},
          {bonbu:'대교 부경본부',    jijum:'대교 양산 Hive',        center:'[YC]양산 신대동',             teacher:'박은경', total:22, done:21, wait:0, none:1},
          {bonbu:'대교 부경본부',    jijum:'대교 거제 Hive',        center:'[YC]국산',                    teacher:'박수정', total:17, done:16, wait:1, none:0},
          {bonbu:'대교 부경본부',    jijum:'서진주 교육국',         center:'서진주 교육국 001팀',          teacher:'류영상', total:11, done:10, wait:0, none:1},
          {bonbu:'대교 서울강원본부',jijum:'성동광진 교육국',       center:'[YC]중곡',                    teacher:'이민경', total:20, done:19, wait:1, none:0},
          {bonbu:'대교 서울강원본부',jijum:'강원 교육국',           center:'[LC]춘천',                    teacher:'김대교', total:14, done:13, wait:0, none:1},
          {bonbu:'대교 서울강원본부',jijum:'강원 교육국',           center:'[YC]원주',                    teacher:'최은아', total:10, done:9,  wait:1, none:0},
          {bonbu:'대교 서울남동본부',jijum:'대교 용인 Hive',        center:'대교 용인 Hive 001팀',        teacher:'유하나', total:28, done:25, wait:0, none:3},
          {bonbu:'대교 서울남동본부',jijum:'대교 용인 Hive',        center:'대교 용인 Hive 002팀',        teacher:'권민정', total:22, done:20, wait:1, none:1},
          {bonbu:'대교 서울남동본부',jijum:'대교 하남 Hive',        center:'대교 하남 Hive 001팀',        teacher:'윤희경', total:16, done:14, wait:0, none:2},
          {bonbu:'대교 서울남동본부',jijum:'대교 하남 Hive',        center:'대교 하남 Hive 002팀',        teacher:'오지은', total:19, done:18, wait:1, none:0},
          {bonbu:'대교 서울북부본부',jijum:'대교 창원 Hive',        center:'[LC]해운대',                  teacher:'한대교', total:24, done:23, wait:0, none:1},
          {bonbu:'대교 서울북부본부',jijum:'대교 부산남부 Hive',    center:'[LC]도담',                    teacher:'강대교', total:20, done:18, wait:2, none:0},
          {bonbu:'대교 서울서북본부',jijum:'대교 은평 Hive',        center:'대교 은평 Hive 001팀',        teacher:'김지현', total:21, done:21, wait:0, none:0},
          {bonbu:'대교 서울서북본부',jijum:'대교 은평 Hive',        center:'대교 은평 Hive 002팀',        teacher:'오선화', total:17, done:15, wait:1, none:1},
          {bonbu:'대교 서울서북본부',jijum:'대교 고양 Hive',        center:'[LC]원흥',                    teacher:'박서연', total:26, done:25, wait:0, none:1},
          {bonbu:'대교 충남본부',    jijum:'대교 세종 Hive',        center:'[LC]권선',                    teacher:'이대교', total:18, done:17, wait:0, none:1},
          {bonbu:'대교 충남본부',    jijum:'대교 세종 Hive',        center:'[대]세종',                    teacher:'임대교', total:15, done:14, wait:1, none:0},
          {bonbu:'대교 충남본부',    jijum:'대교 수원남부 Hive',    center:'[대]아라',                    teacher:'최대교', total:22, done:20, wait:0, none:2},
          {bonbu:'대교 충청본부',    jijum:'대교 천안 Hive',        center:'[LC]천안신방',                teacher:'박대교', total:19, done:18, wait:0, none:1},
          {bonbu:'대교 충청본부',    jijum:'대교 청주 Hive',        center:'[YC]청주봉명',                teacher:'오대교', total:23, done:22, wait:1, none:0},
          {bonbu:'대교 충청본부',    jijum:'대교 천안 Hive',        center:'대교 천안 Hive 001팀',        teacher:'이정민', total:16, done:14, wait:2, none:0},
          {bonbu:'대교 호남본부',    jijum:'대교 광주북부 Hive',    center:'[LC]광주매곡',                teacher:'정한나', total:30, done:29, wait:0, none:1},
          {bonbu:'대교 호남본부',    jijum:'대교 광주수완 Hive',    center:'[LC]산월',                    teacher:'최효진', total:21, done:20, wait:1, none:0},
          {bonbu:'대교 호남본부',    jijum:'대교 광주상무 Hive',    center:'[YC]내방',                    teacher:'정미정', total:18, done:17, wait:0, none:1},
          {bonbu:'대교 호남본부',    jijum:'군산 교육국',           center:'군산 교육국 001팀',            teacher:'이경헌', total:9,  done:9,  wait:0, none:0},
          {bonbu:'대교 중장본부',    jijum:'대교 부산남부 Hive',    center:'[대]강남',                    teacher:'조대교', total:22, done:20, wait:1, none:1},
          {bonbu:'대교 중장본부',    jijum:'대교 세종 Hive',        center:'[대]아라',                    teacher:'임미나', total:15, done:13, wait:0, none:2},
          {bonbu:'대교 중장본부',    jijum:'강원 교육국',           center:'중장 강원 001팀',              teacher:'정수현', total:12, done:11, wait:1, none:0},
          {bonbu:'대교 제주본부',    jijum:'대교 제주북부 Hive',    center:'[대]강남',                    teacher:'강대교', total:14, done:13, wait:0, none:1},
          {bonbu:'대교 제주본부',    jijum:'대교 제주북부 Hive',    center:'[LC]제주중앙',                teacher:'현미라', total:11, done:10, wait:1, none:0},
          {bonbu:'대교 충북본부',    jijum:'대교 청주 Hive',        center:'[LC]청주성화',                teacher:'신은주', total:18, done:17, wait:0, none:1},
          {bonbu:'대교 충북본부',    jijum:'대교 충주 Hive',        center:'충주 교육국 001팀',            teacher:'곽재현', total:13, done:12, wait:0, none:1},
          {bonbu:'대교 충북본부',    jijum:'대교 제천 Hive',        center:'제천 교육국 001팀',            teacher:'마지혜', total:9,  done:8,  wait:1, none:0},
          {bonbu:'대교 경기본부',    jijum:'대교 광명 Hive',        center:'[LC]광명하안',                teacher:'최민호', total:20, done:19, wait:0, none:1},
          {bonbu:'대교 경기본부',    jijum:'대교 광명 Hive',        center:'[YC]광명철산',                teacher:'이가람', total:15, done:13, wait:2, none:0},
          {bonbu:'대교 서울남동본부',jijum:'대교 성남 Hive',        center:'[LC]서현',                    teacher:'박윤미', total:27, done:26, wait:1, none:0},
          {bonbu:'대교 서울남동본부',jijum:'대교 성남 Hive',        center:'[YC]정자',                    teacher:'윤진아', total:21, done:20, wait:0, none:1},
        ];

        var PAGE_SIZE = 10;
        var curPage = 1;
        var filteredStats = STATS_DATA.slice();

        function doStatsSearch(){
          var bonbu  = document.getElementById('st-bonbu').value;
          var jijum  = document.getElementById('st-jijum').value;
          var center = document.getElementById('st-center').value;
          filteredStats = STATS_DATA.filter(function(r){
            if(bonbu  && r.bonbu.indexOf(bonbu)<0)   return false;
            if(jijum  && r.jijum.indexOf(jijum)<0)   return false;
            if(center && r.center.indexOf(center)<0) return false;
            return true;
          });
          curPage=1; renderStats();
        }
        window.doStatsSearch = doStatsSearch;
        // ── 회원 목록 팝업 ────────────────────────────────────────────────
        var MEMBER_NAMES = ['김민준','이서연','박지호','최예린','정수빈','강도윤','윤하은','임채원',
          '조민서','한지우','송예진','오서준','신채원','홍지율','전민재','권나연',
          '류하준','남도현','허서아','문지우','안예원','배수현','노민준','심지원',
          '고은채','백지호','손채원','원민서','진예빈','천수아','표지우','현도윤',
          '황민재','기예원','마서진','로민서','유채원'];

        function genMemberList(r) {
          var members = [];
          var base = 0;
          for(var ci=0; ci<r.teacher.length; ci++) base += r.teacher.charCodeAt(ci);
          base = base % 9000 + 1000;
          for(var i=0; i<r.total; i++){
            var ni = (base + i * 7) % MEMBER_NAMES.length;
            var no = '000S-' + String(base * 100 + i * 13 + 5000000).padStart(10,'0').slice(0,10);
            var status = i < r.done ? '신청완료' : (i < r.done + r.wait ? '신청대기' : '미신청');
            members.push({ name: MEMBER_NAMES[ni], no: no, status: status });
          }
          return members;
        }

        function openStatsMembersModal(rowIdx, type) {
          var r = STATS_DATA[rowIdx];
          if (!r) return;

          var allMembers = genMemberList(r);
          var typeMap = { total:'전체', done:'신청완료', wait:'신청대기', none:'미신청' };
          var colorMap = { total:'#2c5f7a', done:'#27ae60', wait:'#e67e22', none:'#e74c3c' };

          var filtered = type === 'total' ? allMembers : allMembers.filter(function(m){ return m.status === typeMap[type]; });

          var title = '써밋리그 ' + typeMap[type] + ' 회원리스트';
          var subtitle = r.center + ' · ' + r.teacher + ' 교사 (' + filtered.length + '명)';

          var rows = filtered.map(function(m, idx){
            var statusColor = m.status==='신청완료' ? '#27ae60' : m.status==='신청대기' ? '#e67e22' : '#e74c3c';
            return '<tr>' +
              '<td style="padding:8px 14px; border-bottom:1px solid #f0f0f0; text-align:center; color:#999;">' + (idx+1) + '</td>' +
              (type==='total' ? '<td style="padding:8px 14px; border-bottom:1px solid #f0f0f0; text-align:center;"><span style="padding:2px 8px; border-radius:10px; font-size:11.5px; font-weight:600; background:' + (m.status==='신청완료'?'#e8f5e9':m.status==='신청대기'?'#fff3e0':'#fdecea') + '; color:' + statusColor + ';">' + m.status + '</span></td>' : '') +
              '<td style="padding:8px 14px; border-bottom:1px solid #f0f0f0; text-align:center; font-weight:600;">' + m.name + '</td>' +
              '<td style="padding:8px 14px; border-bottom:1px solid #f0f0f0; text-align:center; color:#888; font-size:12px;">' + m.no + '</td>' +
              '</tr>';
          }).join('');

          var colHeaders = type==='total'
            ? '<th style="padding:9px 14px; background:#3a7fa0; color:#fff;">구분</th><th style="padding:9px 14px; background:#3a7fa0; color:#fff;">신청상태</th><th style="padding:9px 14px; background:#3a7fa0; color:#fff;">회원명</th><th style="padding:9px 14px; background:#3a7fa0; color:#fff;">회원번호</th>'
            : '<th style="padding:9px 14px; background:#3a7fa0; color:#fff;">구분</th><th style="padding:9px 14px; background:#3a7fa0; color:#fff;">회원명</th><th style="padding:9px 14px; background:#3a7fa0; color:#fff;">회원번호</th>';

          var modal = document.getElementById('modal-stats-members');
          modal.innerHTML = '' +
            '<div style="position:fixed; inset:0; background:rgba(0,0,0,.45); z-index:9100; display:flex; align-items:center; justify-content:center; padding:20px;" onclick="if(event.target===this) closeStatsMembersModal()">' +
              '<div style="background:#fff; border-radius:10px; width:520px; max-width:96vw; max-height:80vh; display:flex; flex-direction:column; box-shadow:0 8px 40px rgba(0,0,0,.25);">' +
                '<div style="padding:22px 28px 16px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:flex-start;">' +
                  '<div>' +
                    '<div style="font-size:17px; font-weight:700; color:#2c5f7a; margin-bottom:4px;">' + title + '</div>' +
                    '<div style="font-size:12px; color:#888;">' + subtitle + '</div>' +
                  '</div>' +
                  '<button onclick="closeStatsMembersModal()" style="background:none; border:none; font-size:22px; cursor:pointer; color:#aaa; line-height:1; padding:0; margin-top:-2px;">✕</button>' +
                '</div>' +
                '<div style="overflow-y:auto; flex:1;">' +
                  '<table style="width:100%; border-collapse:collapse;">' +
                    '<thead><tr>' + colHeaders + '</tr></thead>' +
                    '<tbody>' + (rows || '<tr><td colspan="4" style="padding:24px; text-align:center; color:#bbb;">해당 회원이 없습니다.</td></tr>') + '</tbody>' +
                  '</table>' +
                '</div>' +
              '</div>' +
            '</div>';

          modal.style.display = 'block';
        }
        window.openStatsMembersModal = openStatsMembersModal;

        function closeStatsMembersModal() {
          var modal = document.getElementById('modal-stats-members');
          if (modal) modal.style.display = 'none';
        }
        window.closeStatsMembersModal = closeStatsMembersModal;

        window._renderStats = renderStats;

        function resetStatsSearch(){
          ['st-bonbu','st-jijum','st-center'].forEach(function(id){
            var el=document.getElementById(id); if(el) el.value='';
          });
          filteredStats=STATS_DATA.slice(); curPage=1; renderStats();
        }
        window.resetStatsSearch = resetStatsSearch;

        function renderStats(){
          var tbody=document.getElementById('stats-tbody');
          tbody.innerHTML='';
          document.getElementById('stats-count').textContent=filteredStats.length.toLocaleString();

          var totTotal=0,totDone=0,totWait=0,totNone=0;
          filteredStats.forEach(function(r){
            totTotal+=r.total; totDone+=r.done; totWait+=r.wait; totNone+=r.none;
          });
          document.getElementById('st-tot-total').textContent=totTotal.toLocaleString();
          document.getElementById('st-tot-done').textContent=totDone.toLocaleString();
          document.getElementById('st-tot-wait').textContent=totWait.toLocaleString();
          document.getElementById('st-tot-none').innerHTML='<span class="zero-red">'+totNone.toLocaleString()+'</span>';
          var totalRate = totTotal>0 ? (totDone/totTotal*100).toFixed(1)+'%' : '-';
          document.getElementById('st-tot-rate').textContent=totalRate;

          var start=(curPage-1)*PAGE_SIZE, end=Math.min(start+PAGE_SIZE,filteredStats.length);
          for(var i=start;i<end;i++){
            var r=filteredStats[i];
            var rate=r.total>0?(r.done/r.total*100).toFixed(1)+'%':'0%';
            var rateNum=r.total>0?r.done/r.total*100:0;
            var fillColor=rateNum>=90?'#27ae60':rateNum>=70?'#4a90b9':'#e67e22';
            var fillW=Math.min(100,rateNum).toFixed(1);
            var noneHtml=r.none===0
              ?'<span class="zero-red">0</span>'
              :'<span class="zero-red">'+r.none+'</span>';
            var rowIdx = filteredStats.indexOf(r);
            var clickable = 'style="cursor:pointer;text-decoration:underline dotted;color:#2c5f7a;font-weight:700;"';
            var noneClickable = r.none===0
              ? '<span class="zero-red">0</span>'
              : '<span class="zero-red" ' + clickable + ' onclick="openStatsMembersModal(' + rowIdx + ',\'none\')">'+r.none+'</span>';
            var tr=document.createElement('tr');
            tr.innerHTML=
              '<td class="td-left">'+r.bonbu+' '+r.jijum+'</td>'+
              '<td class="td-left">'+r.center+'</td>'+
              '<td>'+r.teacher+'</td>'+
              '<td><span ' + clickable + ' onclick="openStatsMembersModal(' + rowIdx + ',\'total\')">'+r.total+'</span></td>'+
              '<td><span ' + clickable + ' onclick="openStatsMembersModal(' + rowIdx + ',\'done\')">'+r.done+'</span></td>'+
              '<td><span ' + (r.wait>0 ? clickable : '') + ' onclick="openStatsMembersModal(' + rowIdx + ',\'wait\')">'+r.wait+'</span></td>'+
              '<td>'+noneClickable+'</td>'+
              '<td><div class="stats-rate-wrap"><div class="stats-rate-track"><div class="stats-rate-fill" style="width:'+fillW+'%;background:'+fillColor+';"></div></div><span style="font-size:10px;font-weight:600;color:'+fillColor+';min-width:36px;">'+rate+'</span></div></td>';
            tbody.appendChild(tr);
          }
          renderStatsPaging();
        }

        function renderStatsPaging(){
          var total=Math.ceil(filteredStats.length/PAGE_SIZE);
          var pg=document.getElementById('stats-paging');
          pg.innerHTML='';
          var prev=document.createElement('button');
          prev.textContent='◀'; prev.disabled=(curPage===1);
          prev.onclick=function(){if(curPage>1){curPage--;renderStats();}};
          pg.appendChild(prev);
          var sp=Math.max(1,curPage-4),ep=Math.min(total,sp+9);
          for(var p=sp;p<=ep;p++){
            (function(pp){
              var btn=document.createElement('button');
              btn.textContent=pp;
              if(pp===curPage) btn.className='active';
              btn.onclick=function(){curPage=pp;renderStats();};
              pg.appendChild(btn);
            })(p);
          }
          var next=document.createElement('button');
          next.textContent='▶'; next.disabled=(curPage===total||total===0);
          next.onclick=function(){if(curPage<total){curPage++;renderStats();}};
          pg.appendChild(next);
          var info=document.createElement('span');
          info.style.cssText='font-size:12px;color:#888;margin-left:8px;';
          info.textContent=curPage+' / '+(total||1)+' 페이지';
          pg.appendChild(info);
        }

        function downloadStatsExcel(){
          var headers=['지점','팀/센터명','교사명','총 학생 수','신청완료','신청대기','미신청','신청율'];
          var rows=[headers.join('	')];
          filteredStats.forEach(function(r){
            var rate=r.total>0?(r.done/r.total*100).toFixed(1)+'%':'0%';
            rows.push([r.bonbu+' '+r.jijum, r.center, r.teacher, r.total, r.done, r.wait, r.none, rate].join('	'));
          });
          var blob=new Blob(['﻿'+rows.join('\n')],{type:'text/plain;charset=utf-8'});
          var a=document.createElement('a'); a.href=URL.createObjectURL(blob);
          a.download='리그신청통계_'+new Date().toISOString().slice(0,10)+'.xls'; a.click();
        }
        window.downloadStatsExcel = downloadStatsExcel;

        renderStats();
      })();
      </script>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- PAGE 6: 신청 현황 -->
    <!-- ══════════════════════════════════════════════ -->
    <div id="page-apply-status" class="page-section">
      <div class="page-header">
        <div class="page-title">써밋 리그 신청 현황</div>
        <div class="breadcrumb">🏠 > 써밋 리그 관리 > <span>써밋 리그 신청 현황</span></div>
      </div>

      <style>
        #status-table { width:100%; border-collapse:collapse; font-size:12.5px; }
        #status-table thead tr { background:#4a90b8; color:#fff; }
        #status-table thead th { padding:10px 14px; text-align:center; font-weight:600; border:1px solid #3a7aa8; }
        #status-table tbody tr { border-bottom:1px solid #eef2f7; }
        #status-table tbody tr:hover { background:#f7fbfe; }
        #status-table tbody td { padding:9px 14px; text-align:center; border:1px solid #eef2f7; vertical-align:middle; }
        .status-paging { display:flex; gap:4px; align-items:center; justify-content:center; margin-top:14px; }
        .status-paging button {
          min-width:30px; height:30px; border:1px solid #dde3ea; border-radius:4px;
          background:#fff; cursor:pointer; font-size:12px; color:#555; transition:all .15s;
        }
        .status-paging button.active { background:#4a90b8; color:#fff; border-color:#4a90b8; font-weight:700; }
        .status-paging button:hover:not(.active) { background:#e8f4fb; }
        .alarm-red { color:#e74c3c; font-weight:700; cursor:pointer; text-decoration:underline; }
        .alarm-blue { color:#4a90b8; font-weight:700; cursor:pointer; text-decoration:underline; }
        #status-search-wrap .row1 { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:10px; }
        #status-search-wrap .row2 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:12px; }
        #status-search-wrap .s-item { display:flex; align-items:center; gap:8px; }
        #status-search-wrap .s-lbl { font-size:12.5px; font-weight:600; color:#555; min-width:56px; white-space:nowrap; }
      </style>

      <!-- 검색 -->
      <div class="search-box" id="status-search-wrap">
        <div style="font-weight:700; color:#4a90b8; margin-bottom:12px; font-size:13px;">🔍 검색</div>
        <div class="row1">
          <div class="s-item">
            <span class="s-lbl">본부선택</span>
            <select class="form-select" id="ss-bonbu" style="flex:1;">
              <option value="">전체</option>
              <option>대교 경기본부</option><option>대교 경산본부</option><option>대교 경인본부</option>
              <option>대교 부경본부</option><option>대교 서울강원본부</option><option>대교 서울남동본부</option>
              <option>대교 서울서북본부</option><option>대교 충청본부</option><option>대교 호남본부</option>
            </select>
          </div>
          <div class="s-item">
            <span class="s-lbl">지점선택</span>
            <select class="form-select" id="ss-jijum" style="flex:1;">
              <option value="">전체</option>
              <option>대교 군포산본 Hive</option><option>대교 안양만안 Hive</option>
              <option>대교 부산강서 Hive</option><option>대교 양산 Hive</option>
            </select>
          </div>
          <div class="s-item">
            <span class="s-lbl">센터선택</span>
            <select class="form-select" id="ss-center" style="flex:1;">
              <option value="">전체</option>
              <option>[LC]명지국제</option><option>[YC]양산 신대동</option><option>[LC]오정</option>
            </select>
          </div>
        </div>
        <div class="row2">
          <div class="s-item">
            <span class="s-lbl">리그명</span>
            <span style="font-size:13px; color:#333; font-weight:600;">2026 윈터리그</span>
          </div>
          <div class="s-item">
            <span class="s-lbl">회원명</span>
            <input class="form-input" id="ss-name" style="flex:1;" placeholder="회원명 입력">
          </div>
          <div class="s-item">
            <span class="s-lbl">회원번호</span>
            <input class="form-input" id="ss-memno" style="flex:1;" placeholder="회원번호 입력">
          </div>
        </div>
        <div style="text-align:center;">
          <button class="btn btn-primary" style="padding:8px 40px;" onclick="doStatusSearch()">검색</button>
          <button class="btn btn-gray" style="padding:8px 20px; margin-left:6px;" onclick="resetStatusSearch()">초기화</button>
        </div>
      </div>

      <!-- 건수 -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <div style="font-size:13px; color:#e74c3c; font-weight:700;">총 <span id="status-count">47,089</span>건</div>
      </div>

      <!-- 테이블 -->
      <div class="card" style="padding:0; overflow:hidden;">
        <table id="status-table">
          <thead>
            <tr>
              <th style="width:60px;">번호</th>
              <th>이름</th>
              <th>학년</th>
              <th>신청 여부</th>
              <th>알림톡 발송 내역</th>
              <th>기존 리그 참여현황</th>
            </tr>
          </thead>
          <tbody id="status-tbody"></tbody>
        </table>
        <div class="status-paging" id="status-paging"></div>
        <div style="height:12px;"></div>
      </div>

      <script>
      (function(){
        var STATUS_DATA = [
          {no:1, name:'황준서', grade:'초3', status:'신청완료', alarm:2, participated:false, alarmHistory:[{sender:'교사',count:2,time:'2025-12-27 11:50:30',phone:'01098765432'},{sender:'본부 관리자',count:1,time:'2025-12-24 09:44:30',phone:'01055556666'}]},
          {no:2, name:'김지엽', grade:'중3', status:'신청완료', alarm:1, participated:true, alarmHistory:[{sender:'교사',count:1,time:'2025-12-26 06:47:30',phone:'01011112222'}]},
          {no:3, name:'김무경', grade:'초4', status:'신청완료', alarm:0, participated:true, alarmHistory:[]},
          {no:4, name:'곽민성', grade:'초3', status:'신청완료', alarm:3, participated:false, alarmHistory:[{sender:'회원 본인',count:3,time:'2025-12-29 11:26:30',phone:'01037752341'},{sender:'교사',count:2,time:'2025-12-26 09:56:30',phone:'01098765432'},{sender:'본부 관리자',count:1,time:'2025-12-23 07:26:30',phone:'01055556666'}]},
          {no:5, name:'박범준', grade:'초5', status:'미신청', alarm:0, participated:false, alarmHistory:[]},
          {no:6, name:'신민정', grade:'초5', status:'미신청', alarm:0, participated:false, alarmHistory:[]},
          {no:7, name:'양시우', grade:'중1', status:'신청완료', alarm:1, participated:true, alarmHistory:[{sender:'회원 본인',count:1,time:'2025-12-29 13:56:30',phone:'01037752341'}]},
          {no:8, name:'김승엽', grade:'초6', status:'신청완료', alarm:0, participated:true, alarmHistory:[]},
          {no:9, name:'이찬빈', grade:'초5', status:'신청완료', alarm:2, participated:false, alarmHistory:[{sender:'교사',count:2,time:'2025-12-29 13:56:30',phone:'01037752341'},{sender:'본부 관리자',count:1,time:'2025-12-26 13:56:30',phone:'01098765432'}]},
          {no:10, name:'이소민', grade:'중3', status:'신청완료', alarm:1, participated:true, alarmHistory:[{sender:'교사',count:1,time:'2025-12-27 09:20:30',phone:'01098765432'}]},
          {no:11, name:'김동하', grade:'초5', status:'미신청', alarm:3, participated:false, alarmHistory:[{sender:'회원 본인',count:3,time:'2025-12-29 09:56:30',phone:'01037752341'},{sender:'교사',count:2,time:'2025-12-26 13:56:30',phone:'01098765432'},{sender:'본부 관리자',count:1,time:'2025-12-23 09:56:30',phone:'01055556666'}]},
          {no:12, name:'박은수', grade:'초2', status:'신청완료', alarm:1, participated:true, alarmHistory:[{sender:'교사',count:1,time:'2025-12-29 12:41:30',phone:'01037752341'}]},
          {no:13, name:'최진아', grade:'중2', status:'신청완료', alarm:0, participated:true, alarmHistory:[]},
          {no:14, name:'이준호', grade:'초6', status:'미신청', alarm:0, participated:false, alarmHistory:[]},
          {no:15, name:'강서연', grade:'초1', status:'신청완료', alarm:2, participated:false, alarmHistory:[{sender:'회원 본인',count:2,time:'2025-12-28 13:08:30',phone:'01023456789'},{sender:'교사',count:1,time:'2025-12-25 13:20:30',phone:'01011112222'}]},
          {no:16, name:'윤태현', grade:'초4', status:'신청완료', alarm:0, participated:true, alarmHistory:[]},
          {no:17, name:'정수빈', grade:'중1', status:'미신청', alarm:1, participated:false, alarmHistory:[{sender:'교사',count:1,time:'2025-12-26 11:02:30',phone:'01011112222'}]},
          {no:18, name:'오민준', grade:'초3', status:'신청완료', alarm:0, participated:false, alarmHistory:[]},
          {no:19, name:'한지원', grade:'초5', status:'신청완료', alarm:0, participated:true, alarmHistory:[]},
          {no:20, name:'서채원', grade:'초2', status:'미신청', alarm:0, participated:false, alarmHistory:[]},
          {no:21, name:'권도윤', grade:'중2', status:'신청완료', alarm:1, participated:true, alarmHistory:[{sender:'본부 관리자',count:1,time:'2025-12-28 13:08:30',phone:'01023456789'}]},
          {no:22, name:'박시연', grade:'초4', status:'신청완료', alarm:2, participated:true, alarmHistory:[{sender:'본부 관리자',count:2,time:'2025-12-29 06:11:30',phone:'01037752341'},{sender:'회원 본인',count:1,time:'2025-12-26 07:26:30',phone:'01098765432'}]},
          {no:23, name:'남태석', grade:'초3', status:'신청완료', alarm:1, participated:true, alarmHistory:[{sender:'회원 본인',count:1,time:'2025-12-28 13:08:30',phone:'01023456789'}]},
          {no:24, name:'김세혁', grade:'중1', status:'신청완료', alarm:0, participated:true, alarmHistory:[]},
          {no:25, name:'이태근', grade:'초5', status:'신청완료', alarm:3, participated:true, alarmHistory:[{sender:'회원 본인',count:3,time:'2025-12-26 13:32:30',phone:'01011112222'},{sender:'교사',count:2,time:'2025-12-23 13:08:30',phone:'01037752341'},{sender:'본부 관리자',count:1,time:'2025-12-20 13:44:30',phone:'01098765432'}]},
          {no:26, name:'김나경', grade:'초1', status:'신청완료', alarm:2, participated:true, alarmHistory:[{sender:'회원 본인',count:2,time:'2025-12-25 05:59:30',phone:'01055556666'},{sender:'교사',count:1,time:'2025-12-22 07:02:30',phone:'01023456789'}]},
          {no:27, name:'홍지율', grade:'초1', status:'신청완료', alarm:1, participated:true, alarmHistory:[{sender:'회원 본인',count:1,time:'2025-12-25 09:44:30',phone:'01055556666'}]},
          {no:28, name:'강용호', grade:'초1', status:'신청완료', alarm:2, participated:true, alarmHistory:[{sender:'회원 본인',count:2,time:'2025-12-29 07:26:30',phone:'01037752341'},{sender:'교사',count:1,time:'2025-12-26 09:56:30',phone:'01098765432'}]},
          {no:29, name:'문채아', grade:'초1', status:'신청완료', alarm:1, participated:true, alarmHistory:[{sender:'회원 본인',count:1,time:'2025-12-29 13:56:30',phone:'01037752341'}]},
          {no:30, name:'박시아', grade:'초1', status:'신청완료', alarm:0, participated:true, alarmHistory:[]},
          {no:31, name:'조현우', grade:'초1', status:'미신청', alarm:0, participated:false, alarmHistory:[]},
          {no:32, name:'선시우', grade:'초1', status:'신청완료', alarm:1, participated:false, alarmHistory:[{sender:'회원 본인',count:1,time:'2025-12-25 09:44:30',phone:'01055556666'}]},
          {no:33, name:'현승빈', grade:'초1', status:'신청완료', alarm:2, participated:false, alarmHistory:[{sender:'본부 관리자',count:2,time:'2025-12-28 11:38:30',phone:'01023456789'},{sender:'회원 본인',count:1,time:'2025-12-25 09:20:30',phone:'01011112222'}]},
          {no:34, name:'길민호', grade:'초1', status:'신청완료', alarm:1, participated:false, alarmHistory:[{sender:'본부 관리자',count:1,time:'2025-12-29 09:56:30',phone:'01037752341'}]},
          {no:35, name:'권시완', grade:'초1', status:'미신청', alarm:0, participated:false, alarmHistory:[]},
          {no:36, name:'김하민', grade:'초1', status:'신청완료', alarm:0, participated:false, alarmHistory:[]},
          {no:37, name:'유지안', grade:'초1', status:'신청완료', alarm:3, participated:false, alarmHistory:[{sender:'회원 본인',count:3,time:'2025-12-25 13:44:30',phone:'01055556666'},{sender:'교사',count:2,time:'2025-12-22 13:32:30',phone:'01023456789'},{sender:'본부 관리자',count:1,time:'2025-12-19 13:20:30',phone:'01011112222'}]},
          {no:38, name:'진시우', grade:'초1', status:'신청완료', alarm:2, participated:true, alarmHistory:[{sender:'회원 본인',count:2,time:'2025-12-29 13:56:30',phone:'01037752341'},{sender:'교사',count:1,time:'2025-12-26 13:56:30',phone:'01098765432'}]},
          {no:39, name:'임채윤', grade:'초1', status:'신청완료', alarm:1, participated:false, alarmHistory:[{sender:'본부 관리자',count:1,time:'2025-12-29 13:56:30',phone:'01037752341'}]},
          {no:40, name:'정하진', grade:'초1', status:'신청완료', alarm:0, participated:false, alarmHistory:[]},
          {no:41, name:'나지원', grade:'초3', status:'미신청', alarm:0, participated:false, alarmHistory:[]},
          {no:42, name:'장수연', grade:'중2', status:'신청완료', alarm:1, participated:true, alarmHistory:[{sender:'본부 관리자',count:1,time:'2025-12-27 06:35:30',phone:'01098765432'}]},
          {no:43, name:'박서준', grade:'초4', status:'미신청', alarm:2, participated:false, alarmHistory:[{sender:'회원 본인',count:2,time:'2025-12-25 09:44:30',phone:'01055556666'},{sender:'교사',count:1,time:'2025-12-22 13:32:30',phone:'01023456789'}]},
          {no:44, name:'배지유', grade:'초4', status:'신청완료', alarm:1, participated:false, alarmHistory:[{sender:'회원 본인',count:1,time:'2025-12-29 13:56:30',phone:'01037752341'}]},
          {no:45, name:'문지호', grade:'초2', status:'신청완료', alarm:0, participated:false, alarmHistory:[]},
          {no:46, name:'최수아', grade:'초6', status:'신청완료', alarm:3, participated:true, alarmHistory:[{sender:'회원 본인',count:3,time:'2025-12-29 13:56:30',phone:'01037752341'},{sender:'교사',count:2,time:'2025-12-26 13:56:30',phone:'01098765432'},{sender:'본부 관리자',count:1,time:'2025-12-23 13:56:30',phone:'01055556666'}]},
          {no:47, name:'심예림', grade:'초3', status:'미신청', alarm:0, participated:false, alarmHistory:[]},
          {no:48, name:'손준혁', grade:'초4', status:'신청완료', alarm:2, participated:true, alarmHistory:[{sender:'본부 관리자',count:2,time:'2025-12-27 12:05:30',phone:'01098765432'},{sender:'회원 본인',count:1,time:'2025-12-24 11:14:30',phone:'01055556666'}]},
          {no:49, name:'홍서우', grade:'초1', status:'미신청', alarm:0, participated:false, alarmHistory:[]},
          {no:50, name:'고은채', grade:'초3', status:'신청완료', alarm:1, participated:true, alarmHistory:[{sender:'본부 관리자',count:1,time:'2025-12-28 09:08:30',phone:'01023456789'}]}
        ]

        var PAGE_SIZE = 10;
        var curPage = 1;
        var filteredData = STATUS_DATA.slice();

        function doStatusSearch(){
          var name  = document.getElementById('ss-name').value.trim();
          var memno = document.getElementById('ss-memno').value.trim();
          filteredData = STATUS_DATA.filter(function(r){
            if(name  && r.name.indexOf(name)<0)   return false;
            if(memno) return false; // memno는 샘플이므로 빈값 처리
            return true;
          });
          curPage=1; renderStatus();
        }
        window.doStatusSearch = doStatusSearch;
        // ── 알림톡 발송 이력 팝업 ────────────────────────────────────────
        function openAlarmHistoryModal(rowIdx) {
          var r = STATUS_DATA[rowIdx];
          if (!r) return;
          var rows = '';
          if (!r.alarmHistory || r.alarmHistory.length === 0) {
            rows = '<tr><td colspan="4" style="padding:24px;text-align:center;color:#bbb;">발송 이력이 없습니다.</td></tr>';
          } else {
            r.alarmHistory.forEach(function(h, idx) {
              var bg = idx%2===0 ? '#fff' : '#f7fafe';
              rows +=
                '<tr style="background:'+bg+';border-bottom:1px solid #e5ecf2;">' +
                '<td style="padding:9px 12px;text-align:center;border:1px solid #e5ecf2;">' + h.sender + '</td>' +
                '<td style="padding:9px 12px;text-align:center;border:1px solid #e5ecf2;font-weight:700;color:#4a90b9;">' + h.count + '</td>' +
                '<td style="padding:9px 12px;text-align:center;border:1px solid #e5ecf2;color:#555;">' + h.time + '</td>' +
                '<td style="padding:9px 12px;text-align:center;border:1px solid #e5ecf2;color:#888;font-size:11px;">' + h.phone + '</td>' +
                '</tr>';
            });
          }
          var modal = document.getElementById('modal-alarm-history');
          modal.innerHTML =
            '<div style="position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9200;display:flex;align-items:center;justify-content:center;padding:20px;" onclick="if(event.target===this)closeAlarmHistoryModal()">' +
              '<div style="background:#fff;border-radius:10px;width:560px;max-width:96vw;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 8px 40px rgba(0,0,0,.25);overflow:hidden;">' +
                '<div style="padding:18px 24px 14px;border-bottom:1px solid #eef2f7;display:flex;justify-content:space-between;align-items:center;">' +
                  '<div style="font-size:16px;font-weight:700;color:#2c4f6c;">알림톡 발송 이력</div>' +
                  '<button onclick="closeAlarmHistoryModal()" style="background:none;border:none;font-size:20px;cursor:pointer;color:#aaa;line-height:1;padding:0;">✕</button>' +
                '</div>' +
                '<div style="padding:8px 24px 6px;font-size:12px;color:#888;background:#f7fbfe;border-bottom:1px solid #eef2f7;">' +
                  '<span style="font-weight:600;color:#2c4f6c;">' + r.name + '</span> · ' + r.grade +
                  ' · 총 <span style="font-weight:700;color:#4a90b9;">' + r.alarm + '회</span> 발송' +
                '</div>' +
                '<div style="overflow-y:auto;flex:1;">' +
                  '<table style="width:100%;border-collapse:collapse;font-size:12px;">' +
                    '<thead>' +
                      '<tr style="background:#4a90b9;">' +
                        '<th style="padding:9px 14px;color:#fff;font-weight:600;text-align:center;border:1px solid #3b7aa8;">발송자</th>' +
                        '<th style="padding:9px 14px;color:#fff;font-weight:600;text-align:center;border:1px solid #3b7aa8;">회수</th>' +
                        '<th style="padding:9px 14px;color:#fff;font-weight:600;text-align:center;border:1px solid #3b7aa8;">최근 발송 시간</th>' +
                        '<th style="padding:9px 14px;color:#fff;font-weight:600;text-align:center;border:1px solid #3b7aa8;">발송 번호</th>' +
                      '</tr>' +
                    '</thead>' +
                    '<tbody>' + rows + '</tbody>' +
                  '</table>' +
                '</div>' +
              '</div>' +
            '</div>';
          modal.style.display = 'block';
        }
        window.openAlarmHistoryModal = openAlarmHistoryModal;

        function closeAlarmHistoryModal() {
          var el = document.getElementById('modal-alarm-history');
          if (el) el.style.display = 'none';
        }
        window.closeAlarmHistoryModal = closeAlarmHistoryModal;

        window._renderStatus = renderStatus;

        function resetStatusSearch(){
          ['ss-bonbu','ss-jijum','ss-center'].forEach(function(id){
            document.getElementById(id).value='';
          });
          document.getElementById('ss-name').value='';
          document.getElementById('ss-memno').value='';
          filteredData=STATUS_DATA.slice(); curPage=1; renderStatus();
        }
        window.resetStatusSearch = resetStatusSearch;

        function renderStatus(){
          var tbody = document.getElementById('status-tbody');
          tbody.innerHTML = '';
          document.getElementById('status-count').textContent = (47089 - (STATUS_DATA.length - filteredData.length)).toLocaleString();

          var start=(curPage-1)*PAGE_SIZE, end=Math.min(start+PAGE_SIZE,filteredData.length);
          for(var i=start;i<end;i++){
            var r=filteredData[i];
            var statusHtml = r.status==='신청완료'
              ? '<span style="color:#333;">신청완료</span>'
              : '<span style="color:#e74c3c;">미신청</span>';
            var rowIdx = STATUS_DATA.indexOf(r);
            var alarmHtml = r.alarm===0
              ? '<span class="alarm-red">0회</span>'
              : '<span class="alarm-blue" style="cursor:pointer; text-decoration:underline dotted;" onclick="openAlarmHistoryModal(' + rowIdx + ')">' + r.alarm + '회</span>';
            var prevHtml = r.participated
              ? '<span style="color:#27ae60; font-weight:700; font-size:15px;">O</span>'
              : '<span style="color:#e74c3c; font-weight:700; font-size:15px;">X</span>';
            var tr = document.createElement('tr');
            tr.innerHTML =
              '<td>'+r.no+'</td>'+
              '<td><b>'+r.name+'</b></td>'+
              '<td>'+r.grade+'</td>'+
              '<td>'+statusHtml+'</td>'+
              '<td>'+alarmHtml+'</td>'+
              '<td>'+prevHtml+'</td>';
            tbody.appendChild(tr);
          }
          renderStatusPaging();
        }

        function renderStatusPaging(){
          var total = Math.ceil(filteredData.length/PAGE_SIZE);
          var pg = document.getElementById('status-paging');
          pg.innerHTML='';
          var prev=document.createElement('button');
          prev.textContent='◀'; prev.disabled=(curPage===1);
          prev.onclick=function(){if(curPage>1){curPage--;renderStatus();}};
          pg.appendChild(prev);
          var sp=Math.max(1,curPage-4), ep=Math.min(total,sp+9);
          for(var p=sp;p<=ep;p++){
            (function(pp){
              var btn=document.createElement('button');
              btn.textContent=pp;
              if(pp===curPage) btn.className='active';
              btn.onclick=function(){curPage=pp;renderStatus();};
              pg.appendChild(btn);
            })(p);
          }
          var next=document.createElement('button');
          next.textContent='▶'; next.disabled=(curPage===total||total===0);
          next.onclick=function(){if(curPage<total){curPage++;renderStatus();}};
          pg.appendChild(next);
          var info=document.createElement('span');
          info.style.cssText='font-size:12px;color:#888;margin-left:8px;';
          info.textContent=curPage+' / '+(total||1)+' 페이지';
          pg.appendChild(info);
        }

        renderStatus();
      })();
      </script>
    </div>

    <!-- ══════════════════════════════════════════════ -->
    <!-- PAGE 7: 선물 관리 -->
    <!-- ══════════════════════════════════════════════ -->
    <div id="page-gift-manage" class="page-section">
      <div class="page-header">
        <div class="page-title">선물 관리</div>
        <div class="breadcrumb">🏠 > 써밋 리그 관리 > <span>선물 관리</span></div>
      </div>
      <div style="display:flex; gap:8px; align-items:center; margin-bottom:16px;">
        <label class="form-label">리그 선택</label>
        <select class="form-select" style="width:220px;"><option>2026 윈터 리그오브매스</option><option>2025 서머 리그오브매스</option></select>
      </div>
      <div class="sub-tabs">
        <div class="sub-tab active" onclick="switchGiftTab('gift-list', this)">선물 목록 관리</div>
        <div class="sub-tab" onclick="switchGiftTab('gift-choice', this)">선물 선택 현황</div>
      </div>

      <!-- 선물 목록 관리 -->
      <div id="gift-tab-gift-list">
        <div style="display:flex; justify-content:flex-end; margin-bottom:10px;">
          <button class="btn btn-primary">+ 선물 등록</button>
        </div>
        <div class="card" style="padding:0; overflow:hidden;">
          <table><thead><tr><th>No</th><th>선물명</th><th>선물 유형</th><th>등급 기준</th><th>재고 수량</th><th>상태</th><th>관리</th></tr></thead>
            <tbody>
              <tr><td>5</td><td>신세계 상품권 50만원권</td><td><span class="badge badge-green">현물</span></td><td><span class="badge badge-orange">Grand Master</span></td><td>500</td><td><span class="badge badge-green">활성</span></td><td><button class="btn btn-secondary btn-sm">수정</button> <button class="btn btn-danger btn-sm">삭제</button></td></tr>
              <tr><td>4</td><td>신세계 상품권 30만원권</td><td><span class="badge badge-green">현물</span></td><td><span class="badge badge-blue">Master</span></td><td>800</td><td><span class="badge badge-green">활성</span></td><td><button class="btn btn-secondary btn-sm">수정</button> <button class="btn btn-danger btn-sm">삭제</button></td></tr>
              <tr><td>3</td><td>메가MGC커피 모바일금액권 3천원권</td><td><span class="badge badge-blue">모바일</span></td><td><span class="badge badge-gray">포인트 선물</span></td><td>15,000</td><td><span class="badge badge-green">활성</span></td><td><button class="btn btn-secondary btn-sm">수정</button> <button class="btn btn-danger btn-sm">삭제</button></td></tr>
              <tr><td>2</td><td>스크래치 경품권</td><td><span class="badge badge-green">현물</span></td><td><span class="badge badge-gray">스크래치</span></td><td>200</td><td><span class="badge badge-green">활성</span></td><td><button class="btn btn-secondary btn-sm">수정</button> <button class="btn btn-danger btn-sm">삭제</button></td></tr>
              <tr><td>1</td><td>[BOSE] QC 헤드폰 화이트스모크</td><td><span class="badge badge-green">현물</span></td><td><span class="badge badge-blue">Master (특별)</span></td><td>10</td><td><span class="badge badge-green">활성</span></td><td><button class="btn btn-secondary btn-sm">수정</button> <button class="btn btn-danger btn-sm">삭제</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 선물 선택 현황 -->
      <div id="gift-tab-gift-choice" style="display:none;">
        <div class="tabs">
          <div id="gct-point" class="tab active" onclick="switchGiftChoiceTab('point')">포인트 선물</div>
          <div id="gct-grandmaster" class="tab" onclick="switchGiftChoiceTab('grandmaster')">Grand Master / Master</div>
          <div id="gct-scratch" class="tab" onclick="switchGiftChoiceTab('scratch')">스크래치</div>
        </div>

        <!-- ①포인트 선물 -->
        <div id="gcp-point">
          <div class="search-box" style="margin-bottom:16px;">
            <div class="search-grid">
              <div class="search-row"><span class="search-label">본부</span><select class="form-select" style="flex:1;" id="ps-bonbu"><option>전체</option><option>대교 경산본부</option><option>대교 부경본부</option><option>대교 호남본부</option><option>대교 경기본부</option><option>대교 서울남동본부</option><option>대교 서울강원본부</option><option>대교 충청본부</option><option>대교 서울서북본부</option><option>대교 경인본부</option></select></div>
              <div class="search-row"><span class="search-label">지점</span><input class="form-input" type="text" placeholder="지점명 입력" style="flex:1;" id="ps-jijum"></div>
              <div class="search-row"><span class="search-label">센터</span><input class="form-input" type="text" placeholder="센터명 입력" style="flex:1;" id="ps-center"></div>
              <div class="search-row"><span class="search-label">교사명</span><input class="form-input" type="text" placeholder="교사명 입력" style="flex:1;" id="ps-teacher"></div>
              <div class="search-row"><span class="search-label">회원명</span><input class="form-input" type="text" placeholder="회원명 입력" style="flex:1;" id="ps-member"></div>
              <div class="search-row"><span class="search-label">리그명</span><select class="form-select" style="flex:1;" id="ps-league"><option>전체</option><option>B.초1</option><option>B.초2</option><option>B.초3</option><option>B.초4</option><option>B.초5</option><option>B.초6</option><option>C.중1</option><option>C.중2</option><option>C.중3</option><option>D.고1</option></select></div>
              <div class="search-row"><span class="search-label">팀명</span><input class="form-input" type="text" placeholder="팀명 입력" style="flex:1;" id="ps-team"></div>
              <div class="search-row"><span class="search-label">선물명</span><input class="form-input" type="text" placeholder="선물명 입력" style="flex:1;" id="ps-gift"></div>
            </div>
            <div style="text-align:center; margin-top:10px;"><button class="btn btn-primary" style="padding:8px 40px;" onclick="renderPointGift(1)">검색</button></div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div class="count-badge" style="margin:0;">총 <span id="point-total-cnt">12,384</span>건</div>
            <button class="btn btn-gray btn-sm">엑셀 다운로드</button>
          </div>
          <div class="card" style="padding:0; overflow:hidden; overflow-x:auto;">
            <table style="min-width:1200px;"><thead><tr style="background:#deebff;"><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">No</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">본부명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">지점명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">센터명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">교사명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">회원번호</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">회원명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">리그명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">팀명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">등수</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">사용포인트</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">선물명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">핸드폰번호</th></tr></thead>
            <tbody id="point-tbody"></tbody></table>
          </div>
          <div id="point-pages" style="display:flex;justify-content:center;gap:4px;margin-top:14px;flex-wrap:wrap;"></div>
        </div>

        <!-- ②Grand Master / Master -->
        <div id="gcp-grandmaster" style="display:none;">
          <div class="search-box" style="margin-bottom:16px;">
            <div class="search-grid">
              <div class="search-row"><span class="search-label">본부</span><select class="form-select" style="flex:1;" id="gs-bonbu"><option>전체</option><option>대교 경산본부</option><option>대교 부경본부</option><option>대교 호남본부</option><option>대교 경기본부</option><option>대교 서울남동본부</option><option>대교 서울강원본부</option><option>대교 충청본부</option></select></div>
              <div class="search-row"><span class="search-label">지점</span><input class="form-input" type="text" placeholder="지점명 입력" style="flex:1;" id="gs-jijum"></div>
              <div class="search-row"><span class="search-label">센터</span><input class="form-input" type="text" placeholder="센터명 입력" style="flex:1;" id="gs-center"></div>
              <div class="search-row"><span class="search-label">교사명</span><input class="form-input" type="text" placeholder="교사명 입력" style="flex:1;" id="gs-teacher"></div>
              <div class="search-row"><span class="search-label">회원명</span><input class="form-input" type="text" placeholder="회원명 입력" style="flex:1;" id="gs-member"></div>
              <div class="search-row"><span class="search-label">등수</span><select class="form-select" style="flex:1;" id="gs-rank"><option>전체</option><option>Grand Master</option><option>Master</option></select></div>
              <div class="search-row"><span class="search-label">선물명</span><input class="form-input" type="text" placeholder="선물명 입력" style="flex:1;" id="gs-gift"></div>
            </div>
            <div style="text-align:center; margin-top:10px;"><button class="btn btn-primary" style="padding:8px 40px;" onclick="renderGMGift(1)">검색</button></div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div class="count-badge" style="margin:0;">총 <span id="gm-total-cnt">20</span>건</div>
            <button class="btn btn-gray btn-sm">엑셀 다운로드</button>
          </div>
          <div class="card" style="padding:0; overflow:hidden; overflow-x:auto;">
            <table style="min-width:1100px;"><thead><tr style="background:#deebff;"><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">No</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">본부명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">지점명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">센터명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">교사명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">회원번호</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">회원명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">리그명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">팀명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">등수</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">선물명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">핸드폰번호</th></tr></thead>
            <tbody id="gm-tbody"></tbody></table>
          </div>
          <div id="gm-pages" style="display:flex;justify-content:center;gap:4px;margin-top:14px;flex-wrap:wrap;"></div>
        </div>

        <!-- ③스크래치 -->
        <div id="gcp-scratch" style="display:none;">
          <div class="search-box" style="margin-bottom:16px;">
            <div class="search-grid">
              <div class="search-row"><span class="search-label">본부</span><select class="form-select" style="flex:1;" id="ss-bonbu"><option>전체</option><option>대교 경산본부</option><option>대교 부경본부</option><option>대교 호남본부</option><option>대교 경기본부</option><option>대교 서울남동본부</option><option>대교 서울강원본부</option><option>대교 충청본부</option><option>대교 경인본부</option></select></div>
              <div class="search-row"><span class="search-label">지점</span><input class="form-input" type="text" placeholder="지점명 입력" style="flex:1;" id="ss-jijum"></div>
              <div class="search-row"><span class="search-label">센터</span><input class="form-input" type="text" placeholder="센터명 입력" style="flex:1;" id="ss-center"></div>
              <div class="search-row"><span class="search-label">교사사번</span><input class="form-input" type="text" placeholder="교사사번 입력" style="flex:1;" id="ss-teachernum"></div>
              <div class="search-row"><span class="search-label">교사명</span><input class="form-input" type="text" placeholder="교사명 입력" style="flex:1;" id="ss-teacher"></div>
              <div class="search-row"><span class="search-label">회원명</span><input class="form-input" type="text" placeholder="회원명 입력" style="flex:1;" id="ss-member"></div>
              <div class="search-row"><span class="search-label">학년</span><select class="form-select" style="flex:1;" id="ss-grade"><option>전체</option><option>초1</option><option>초2</option><option>초3</option><option>초4</option><option>초5</option><option>초6</option><option>중1</option><option>중2</option><option>중3</option><option>고1</option></select></div>
              <div class="search-row"><span class="search-label">선물명</span><input class="form-input" type="text" placeholder="선물명 입력" style="flex:1;" id="ss-gift"></div>
            </div>
            <div style="text-align:center; margin-top:10px;"><button class="btn btn-primary" style="padding:8px 40px;" onclick="renderScratchGift(1)">검색</button></div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div class="count-badge" style="margin:0;">총 <span id="scratch-total-cnt">150</span>건</div>
            <button class="btn btn-gray btn-sm">엑셀 다운로드</button>
          </div>
          <div class="card" style="padding:0; overflow:hidden; overflow-x:auto;">
            <table style="min-width:1300px;"><thead><tr style="background:#deebff;"><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">No</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">본부명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">지점명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">센터명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">교사사번</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">교사명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">회원번호</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">회원명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">리그명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">팀명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">학년</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">선물명</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">비고</th><th style="background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;">핸드폰번호</th></tr></thead>
            <tbody id="scratch-tbody"></tbody></table>
          </div>
          <div id="scratch-pages" style="display:flex;justify-content:center;gap:4px;margin-top:14px;flex-wrap:wrap;"></div>
        </div>
      </div>
    </div>

    <!-- PAGE 8: 써밋 리그 결과 관리 -->
    <!-- ══════════════════════════════════════════════ -->
    <div id="page-result-manage" class="page-section">
      <div class="page-header">
        <div class="page-title">써밋 리그 결과 관리</div>
        <div class="breadcrumb">🏠 > 써밋 리그 관리 > <span>써밋 리그 결과 관리</span></div>
      </div>

      <style>
        #result-manage-wrap .search-grid-5 {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 10px;
        }
        #result-manage-wrap .search-grid-5b {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 12px;
        }
        #result-table-wrap { overflow-x: auto; }
        #result-table {
          width: 100%; border-collapse: collapse; font-size: 10.5px; white-space: nowrap;
        }
        #result-table thead tr { background: #4a90b8; color: #fff; position: sticky; top: 0; z-index: 2; }
        #result-table thead th {
          padding: 5px 4px; text-align: center; font-weight: 600;
          border: 1px solid #c7d1de; line-height: 1.3;
        }
        #result-table tbody tr { border-bottom: 1px solid #c7d1de; }
        #result-table tbody tr:nth-child(even) { background: #f7fafe; }
        #result-table tbody tr:hover { background: #e8f4fb; }
        #result-table tbody td {
          padding: 6px 4px; text-align: center; border: 1px solid #c7d1de;
          vertical-align: middle; color: #333340;
        }
        #result-table tbody td.td-left { text-align: left; }
        .final-rank-select {
          border: 1px solid #cdd5de; border-radius: 4px; padding: 4px 6px;
          font-size: 11.5px; font-family: inherit; background: #fff;
          min-width: 110px;
        }
        .final-rank-select.gm { background: #fff8e1; color: #e67e22; font-weight: 700; border-color: #e67e22; }
        .final-rank-select.master { background: #e8f4fb; color: #1565c0; font-weight: 700; border-color: #4a90b8; }
        .final-rank-select.bottom { background: #fde8e8; color: #c0392b; font-weight: 700; border-color: #e74c3c; }
        .paging { display: flex; gap: 4px; align-items: center; justify-content: center; margin-top: 14px; }
        .paging button {
          min-width: 30px; height: 30px; border: 1px solid #dde3ea; border-radius: 4px;
          background: #fff; cursor: pointer; font-size: 12px; color: #555;
          transition: all .15s;
        }
        .paging button.active { background: #4a90b8; color: #fff; border-color: #4a90b8; font-weight: 700; }
        .paging button:hover:not(.active) { background: #e8f4fb; }
        .col-group-header { background: #2c6e8a !important; }
        .col-group-score { background: #3d7fa8 !important; }
        .col-group-avg { background: #3a6e9a !important; }
        .col-group-point { background: #27ae60 !important; color: #fff !important; }
        .col-group-rank { background: #8e44ad !important; }
        .summary-bar {
          display: flex; gap: 12px; margin-bottom: 12px;
        }
        .summary-item {
          background: #fff; border: 1px solid #dde3ea; border-radius: 6px;
          padding: 10px 16px; font-size: 12px;
        }
        .summary-item b { font-size: 18px; color: #4a90b8; display: block; margin-top: 2px; }
        .summary-item.gm b { color: #e67e22; }
        .summary-item.master b { color: #1565c0; }
      </style>

      <div id="result-manage-wrap">
        <!-- 리그 선택 -->
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
          <label class="form-label">리그 선택</label>
          <select id="result-league-select" class="form-select" style="width:220px;" onchange="loadResultData()">
            <option value="2026_winter">2026 윈터 리그오브매스</option>
            <option value="2025_summer">2025 서머 리그오브매스</option>
            <option value="2025_winter">2025 윈터 리그오브매스</option>
            <option value="2024_summer">2024 서머 리그오브매스</option>
            <option value="2024_winter">2024 윈터 리그오브매스</option>
            <option value="2023_summer">2023 서머 리그오브매스</option>
            <option value="2023_winter">2023 윈터 리그오브매스</option>
          </select>
          <label class="form-label" style="margin-left:16px;">주차 선택</label>
          <select id="result-week-select" class="form-select" style="width:140px;" onchange="loadWeekData()">
            <option value="all">전체 (최종)</option>
            <option value="1">1주차</option>
            <option value="2">2주차</option>
            <option value="3">3주차</option>
            <option value="4">4주차</option>
            <option value="5">5주차</option>
            <option value="6">6주차</option>
          </select>
          <span id="result-final-status" class="badge badge-orange" style="margin-left:8px;">최종 결과 발표 전 (수정 가능)</span>
        </div>

        <!-- 탭 -->
        <div class="sub-tabs" id="result-sub-tabs">
          <div class="sub-tab active" onclick="switchResultTab('result-detail', this)">결과 상세 조회</div>
          <div class="sub-tab" onclick="switchResultTab('result-bonbu', this)">본부별 완주율</div>
          <div class="sub-tab" onclick="switchResultTab('result-dropout', this)">탈락자 관리</div>
        </div>

        <!-- 탭: 결과 상세 조회 -->
        <div id="result-tab-result-detail">

        <!-- 검색 -->
        <div class="search-box">
          <div class="search-title">🔍 검색</div>
          <div class="search-grid-5">
            <div class="search-row"><span class="search-label">본부</span><input class="form-input" id="s-bonbu" style="flex:1;" placeholder="본부명"></div>
            <div class="search-row"><span class="search-label">지점</span><input class="form-input" id="s-jijum" style="flex:1;" placeholder="지점명"></div>
            <div class="search-row"><span class="search-label">센터</span><input class="form-input" id="s-center" style="flex:1;" placeholder="센터명"></div>
            <div class="search-row"><span class="search-label">센터타입</span>
              <select class="form-select" id="s-ctype" style="flex:1;">
                <option value="">전체</option><option>LC</option><option>YC</option><option>HL</option>
              </select>
            </div>
          </div>
          <div class="search-grid-5b">
            <div class="search-row"><span class="search-label">교사명</span><input class="form-input" id="s-teacher" style="flex:1;" placeholder="교사명"></div>
            <div class="search-row"><span class="search-label">회원번호</span><input class="form-input" id="s-memno" style="flex:1;" placeholder="회원번호"></div>
            <div class="search-row"><span class="search-label">회원명</span><input class="form-input" id="s-memname" style="flex:1;" placeholder="회원명"></div>
            <div class="search-row"><span class="search-label">전국랭킹</span><input class="form-input" id="s-natrank" style="flex:1;" placeholder="예) 1"></div>
          </div>
          <div class="search-grid-5b" style="margin-top:8px;">
            <div class="search-row"><span class="search-label">학년</span>
              <select class="form-select" id="s-grade" style="flex:1;">
                <option value="">전체</option>
                <option>초1</option><option>초2</option><option>초3</option><option>초4</option><option>초5</option><option>초6</option>
                <option>중1</option><option>중2</option><option>중3</option>
                <option>고1</option><option>고2</option>
              </select>
            </div>
            <div class="search-row"><span class="search-label">조 이름</span><input class="form-input" id="s-teamname" style="flex:1;" placeholder="예) 01조"></div>
          </div>
          <div style="text-align:center;">
            <button class="btn btn-primary" style="padding:8px 36px;" onclick="doSearch()">검색</button>
            <button class="btn btn-gray" style="padding:8px 20px; margin-left:6px;" onclick="resetSearch()">초기화</button>
          </div>
        </div>

        <!-- 요약 + 액션 -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div class="summary-bar">
            <div class="summary-item" style="border-color:#2e7094; color:#2e7094; display:flex; flex-direction:column; justify-content:space-between; min-width:160px; height:38px; padding:4px 12px;">
              <span style="font-size:11px; font-weight:400;">검색 결과</span>
              <b id="result-total-count" style="font-size:16px; font-weight:700; align-self:flex-end; margin-top:-2px;">0</b>
            </div>
            <div class="summary-item gm" style="border-color:#ffbf00; display:flex; flex-direction:column; justify-content:space-between; min-width:160px; height:38px; padding:4px 12px;">
              <span style="font-size:11px; color:#996600;">Grand Master</span>
              <b id="cnt-gm" style="font-size:16px; color:#cc8000; align-self:flex-end; margin-top:-2px;">0</b>
            </div>
            <div class="summary-item master" style="border-color:#2e7094; display:flex; flex-direction:column; justify-content:space-between; min-width:160px; height:38px; padding:4px 12px;">
              <span style="font-size:11px;">Master</span>
              <b id="cnt-master" style="font-size:16px; align-self:flex-end; margin-top:-2px;">0</b>
            </div>
            <div class="summary-item" style="border-color:#e84d3d; color:#e84d3d; display:flex; flex-direction:column; justify-content:space-between; min-width:160px; height:38px; padding:4px 12px;">
              <span style="font-size:11px;">최하고정</span>
              <b id="cnt-bottom" style="font-size:16px; align-self:flex-end; margin-top:-2px;">0</b>
            </div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="btn btn-green btn-sm" style="height:34px; font-size:12px; padding:0 14px;" onclick="saveAllFinalRank()">최종랭킹 일괄저장</button>
            <button class="btn btn-gray btn-sm" style="height:34px; font-size:12px; padding:0 14px; border:1px solid #ccd1d9; color:#333340;" onclick="downloadExcel()">📥 엑셀 다운로드</button>
          </div>
        </div>

        <!-- 테이블 -->
        <div class="card" style="padding:0; overflow:hidden;">
          <div id="result-table-wrap">
            <table id="result-table">
              <thead>
                <tr>
                  <th rowspan="2" style="min-width:36px;">No</th>
                  <!-- 기본정보 -->
                  <th colspan="9" class="col-group-header">기본 정보</th>
                  <!-- 점수 -->
                  <th colspan="9" class="col-group-score">점수 정보</th>
                  <!-- 평균/상위 -->
                  <th colspan="12" class="col-group-avg">평균 / 상위</th>
                  <!-- 포인트 -->
                  <th colspan="4" class="col-group-point">포인트</th>
                  <!-- 랭킹 -->
                  <th colspan="4" class="col-group-rank">랭킹</th>
                  <!-- 최종 -->
                  <th rowspan="2" style="min-width:120px; background:#c0392b;">최종랭킹</th>
                </tr>
                <tr>
                  <th>본부</th><th>지점</th><th>센터</th><th>센터타입</th>
                  <th>교사명</th><th>회원번호</th><th>회원명</th><th>학년</th><th>조이름</th>
                  <th style="font-size:10px;">1주<br>학습</th><th style="font-size:10px;">1주<br>시간</th><th style="font-size:10px;">1주<br>출결</th>
                  <th style="font-size:10px;">2주<br>학습</th><th style="font-size:10px;">2주<br>시간</th><th style="font-size:10px;">2주<br>출결</th>
                  <th style="font-size:10px;">3주<br>학습</th><th style="font-size:10px;">3주<br>시간</th><th style="font-size:10px;">3주<br>출결</th>
                  <th style="font-size:10px;">학습<br>평균</th><th style="font-size:10px;">시간<br>평균</th><th style="font-size:10px;">출결<br>평균</th><th style="font-size:10px;">평균<br>합계</th>
                  <th style="font-size:10px;">상위<br>%</th><th style="font-size:10px;">조내<br>1위</th><th style="font-size:10px;">조내<br>2위</th><th style="font-size:10px;">조내<br>3위</th>
                  <th style="font-size:10px;">학년<br>1위</th><th style="font-size:10px;">학년<br>2위</th><th style="font-size:10px;">전국<br>상위%</th><th style="font-size:10px;">학년<br>랭킹</th>
                  <th style="font-size:10px;">출석<br>포인트</th><th style="font-size:10px;">학습<br>포인트</th><th style="font-size:10px;">순위<br>포인트</th><th style="font-size:10px;">총<br>포인트</th>
                  <th style="font-size:10px;">전국<br>랭킹</th><th style="font-size:10px;">학년<br>랭킹</th><th style="font-size:10px;">조내<br>랭킹</th><th style="font-size:10px;">조<br>랭킹</th>
                </tr>
              </thead>
              <tbody id="result-tbody"></tbody>
            </table>
          </div>
          <div class="paging" id="result-paging"></div>
          <div style="height:14px;"></div>
        </div>
      </div>

      <script>
      (function(){
  // ══════════════════════════════════════════════
  // 리그별 데이터 세트
  // ══════════════════════════════════════════════
  var LEAGUE_DATA = {};

  // ── 2026 윈터 (35건, 기존 데이터 유지)
  LEAGUE_DATA['2026_winter'] = {
    label: '2026 윈터 리그오브매스',
    finalized: false,
    totalWeeks:6,
  weeks:{  "1":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"92.24","시간점수":"2.02","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"107.26","상위가점":"0","하위감점":"0","상하위진도수":"0 / 32 / 0 / 0","총학습수":"5","가감총점":"107.26","평균":"21.45","랭킹":"0","본부랭킹":"0","학습평균":"86.19","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.09","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"105.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"83.02","출결포인트":"12","전체포인트":"95.02","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"102.36","시간점수":"2.55","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"117.91","상위가점":"0","하위감점":"0","상하위진도수":"25 / 0 / 0 / 0","총학습수":"4","가감총점":"117.91","평균":"29.48","랭킹":"0","본부랭킹":"0","학습평균":"100.92","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.33","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"116.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"92.12","출결포인트":"12","전체포인트":"104.12","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0055176248","회원명":"남태식","생년월일":"2016-08-23","리그명":"-","조명":"-","학습점수":"99.22","시간점수":"4.45","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"116.67","상위가점":"0","하위감점":"0","상하위진도수":"30 / 0 / 0 / 0","총학습수":"5","가감총점":"116.67","평균":"23.33","랭킹":"0","본부랭킹":"0","학습평균":"94.19","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.8","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"119.25","전국총점평균":"113.29","총점상위":"1%","학습포인트":"89.3","출결포인트":"12","전체포인트":"101.3","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-0055502112","회원명":"김세혁","생년월일":"2012-02-19","리그명":"-","조명":"-","학습점수":"76.53","시간점수":"3.47","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"93.0","상위가점":"0","하위감점":"0","상하위진도수":"0 / 31 / 0 / 0","총학습수":"5","가감총점":"93.0","평균":"18.6","랭킹":"0","본부랭킹":"0","학습평균":"79.12","전국학습평균":"95.66","학습상위":"1%","시간평균":"3.66","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"96.56","전국총점평균":"113.29","총점상위":"1%","학습포인트":"68.88","출결포인트":"12","전체포인트":"80.88","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대구강북 교육국","센터":"[LC]동변","센터타입":"LC","교사명":"김현자","회원번호":"000S-0055585708","회원명":"남동연","생년월일":"2016-06-03","리그명":"-","조명":"-","학습점수":"95.58","시간점수":"4.34","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"112.92","상위가점":"0","하위감점":"0","상하위진도수":"24 / 0 / 0 / 0","총학습수":"4","가감총점":"112.92","평균":"28.23","랭킹":"0","본부랭킹":"0","학습평균":"98.42","전국학습평균":"95.66","학습상위":"1%","시간평균":"3.96","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.06","전국총점평균":"113.29","총점상위":"1%","학습포인트":"86.02","출결포인트":"12","전체포인트":"98.02","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"-","조명":"-","학습점수":"103.06","시간점수":"4.78","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"120.84","상위가점":"0","하위감점":"0","상하위진도수":"0 / 27 / 0 / 0","총학습수":"4","가감총점":"120.84","평균":"30.21","랭킹":"0","본부랭킹":"0","학습평균":"95.4","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.4","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.26","전국총점평균":"113.29","총점상위":"1%","학습포인트":"92.75","출결포인트":"12","전체포인트":"104.75","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"104.57","시간점수":"5.83","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"123.4","상위가점":"0","하위감점":"0","상하위진도수":"27 / 0 / 0 / 0","총학습수":"4","가감총점":"123.4","평균":"30.85","랭킹":"0","본부랭킹":"0","학습평균":"92.93","전국학습평균":"95.66","학습상위":"1%","시간평균":"5.61","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"120.13","전국총점평균":"113.29","총점상위":"1%","학습포인트":"94.11","출결포인트":"12","전체포인트":"106.11","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-0055918887","회원명":"진시우","생년월일":"2018-06-21","리그명":"B.초1","조명":"01조","학습점수":"103.47","시간점수":"5.68","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"122.15","상위가점":"0","하위감점":"0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"5","가감총점":"122.15","평균":"24.43","랭킹":"5","본부랭킹":"0","학습평균":"99.3","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.62","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.4","전국총점평균":"90.1","총점상위":"1%","학습포인트":"93.12","출결포인트":"12","전체포인트":"105.12","복권이벤트":"-","전국랭킹":"1","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0056203858","회원명":"유지안","생년월일":"2018-06-22","리그명":"B.초1","조명":"01조","학습점수":"104.73","시간점수":"5.41","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"123.14","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"4","가감총점":"123.14","평균":"30.79","랭킹":"4","본부랭킹":"0","학습평균":"100.29","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.62","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.32","전국총점평균":"90.1","총점상위":"1%","학습포인트":"94.26","출결포인트":"12","전체포인트":"106.26","복권이벤트":"-","전국랭킹":"19","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"103.62","시간점수":"5.57","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"122.19","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"4","가감총점":"122.19","평균":"30.55","랭킹":"6","본부랭킹":"0","학습평균":"92.46","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.28","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.31","전국총점평균":"90.1","총점상위":"1%","학습포인트":"93.26","출결포인트":"12","전체포인트":"105.26","복권이벤트":"-","전국랭킹":"1","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"97.89","시간점수":"5.11","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"116.0","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"4","가감총점":"116.0","평균":"29.0","랭킹":"3","본부랭킹":"0","학습평균":"93.01","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.28","전국시간평균":"3.72","시간상위":"2%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.27","전국총점평균":"90.1","총점상위":"1%","학습포인트":"88.1","출결포인트":"12","전체포인트":"100.1","복권이벤트":"-","전국랭킹":"97","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056240381","회원명":"문채아","생년월일":"2019-07-12","리그명":"B.초1","조명":"01조","학습점수":"101.36","시간점수":"5.42","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"119.78","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"4","가감총점":"119.78","평균":"29.95","랭킹":"5","본부랭킹":"0","학습평균":"94.1","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.34","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.18","전국총점평균":"90.1","총점상위":"1%","학습포인트":"91.22","출결포인트":"12","전체포인트":"103.22","복권이벤트":"-","전국랭킹":"40","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"103.93","시간점수":"5.38","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"122.31","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"4","가감총점":"122.31","평균":"30.58","랭킹":"8","본부랭킹":"0","학습평균":"93.32","전국학습평균":"76.15","학습상위":"3%","시간평균":"5.44","전국시간평균":"3.72","시간상위":"4%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"117.64","전국총점평균":"90.1","총점상위":"2%","학습포인트":"93.54","출결포인트":"12","전체포인트":"105.54","복권이벤트":"-","전국랭킹":"97","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"96.63","시간점수":"0.78","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"110.41","상위가점":"0","하위감점":"0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"4","가감총점":"110.41","평균":"27.6","랭킹":"10","본부랭킹":"0","학습평균":"97.57","전국학습평균":"76.15","학습상위":"1%","시간평균":"0.82","전국시간평균":"3.72","시간상위":"99%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"113.49","전국총점평균":"90.1","총점상위":"4%","학습포인트":"86.97","출결포인트":"12","전체포인트":"98.97","복권이벤트":"-","전국랭킹":"166","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"98.72","시간점수":"5.08","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"115.8","상위가점":"0","하위감점":"0","상하위진도수":"0 / 16 / 0 / 0","총학습수":"3","가감총점":"115.8","평균":"38.6","랭킹":"7","본부랭킹":"0","학습평균":"88.12","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.74","전국시간평균":"3.72","시간상위":"11%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.95","전국총점평균":"90.1","총점상위":"5%","학습포인트":"88.85","출결포인트":"12","전체포인트":"100.85","복권이벤트":"-","전국랭킹":"206","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"92.63","시간점수":"3.99","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"109.62","상위가점":"0","하위감점":"0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"4","가감총점":"109.62","평균":"27.41","랭킹":"11","본부랭킹":"0","학습평균":"90.23","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.27","전국시간평균":"3.72","시간상위":"34%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.78","전국총점평균":"90.1","총점상위":"5%","학습포인트":"83.37","출결포인트":"12","전체포인트":"95.37","복권이벤트":"-","전국랭킹":"195","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 거제 Hive","센터":"[YC]국산","센터타입":"YC","교사명":"박수정","회원번호":"000S-0056157436","회원명":"정하진","생년월일":"2018-02-16","리그명":"B.초1","조명":"01조","학습점수":"93.36","시간점수":"4.75","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"111.11","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"4","가감총점":"111.11","평균":"27.78","랭킹":"11","본부랭킹":"0","학습평균":"89.3","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.29","전국시간평균":"3.72","시간상위":"24%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.09","전국총점평균":"90.1","총점상위":"6%","학습포인트":"84.02","출결포인트":"12","전체포인트":"96.02","복권이벤트":"-","전국랭킹":"135","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"95.39","시간점수":"3.83","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"112.22","상위가점":"0","하위감점":"0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"4","가감총점":"112.22","평균":"28.05","랭킹":"13","본부랭킹":"0","학습평균":"95.74","전국학습평균":"76.15","학습상위":"6%","시간평균":"3.92","전국시간평균":"3.72","시간상위":"41%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.05","전국총점평균":"90.1","총점상위":"6%","학습포인트":"85.85","출결포인트":"12","전체포인트":"97.85","복권이벤트":"-","전국랭킹":"172","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"91.2","시간점수":"5.29","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"108.49","상위가점":"0","하위감점":"0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"4","가감총점":"108.49","평균":"27.12","랭킹":"14","본부랭킹":"0","학습평균":"87.18","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.57","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"82.08","출결포인트":"12","전체포인트":"94.08","복권이벤트":"-","전국랭킹":"182","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"93.05","시간점수":"3.4","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"108.45","상위가점":"0","하위감점":"0","상하위진도수":"0 / 6 / 10 / 0","총학습수":"3","가감총점":"108.45","평균":"36.15","랭킹":"17","본부랭킹":"0","학습평균":"93.17","전국학습평균":"76.15","학습상위":"5%","시간평균":"3.11","전국시간평균":"3.72","시간상위":"63%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.42","전국총점평균":"90.1","총점상위":"6%","학습포인트":"83.75","출결포인트":"12","전체포인트":"95.75","복권이벤트":"-","전국랭킹":"220","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"92.59","시간점수":"3.9","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"109.49","상위가점":"0","하위감점":"0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"4","가감총점":"109.49","평균":"27.37","랭킹":"16","본부랭킹":"0","학습평균":"95.3","전국학습평균":"76.15","학습상위":"7%","시간평균":"3.82","전국시간평균":"3.72","시간상위":"54%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.07","전국총점평균":"90.1","총점상위":"7%","학습포인트":"83.33","출결포인트":"12","전체포인트":"95.33","복권이벤트":"-","전국랭킹":"174","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[LC]서정","센터타입":"LC","교사명":"이진아","회원번호":"000S-0056301847","회원명":"오서연","생년월일":"2019-04-11","리그명":"B.초1","조명":"02조","학습점수":"88.03","시간점수":"4.82","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"105.85","상위가점":"0","하위감점":"0","상하위진도수":"0 / 22 / 4 / 0","총학습수":"4","가감총점":"105.85","평균":"26.46","랭킹":"18","본부랭킹":"0","학습평균":"92.1","전국학습평균":"76.15","학습상위":"9%","시간평균":"4.85","전국시간평균":"3.72","시간상위":"22%","출결평균":"9.33","전국출결평균":"8.86","출결상위":"38%","총점평균":"107.5","전국총점평균":"90.1","총점상위":"9%","학습포인트":"79.23","출결포인트":"12","전체포인트":"91.23","복권이벤트":"-","전국랭킹":"250","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"92.33","시간점수":"4.76","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"109.09","상위가점":"0","하위감점":"0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"4","가감총점":"109.09","평균":"27.27","랭킹":"11","본부랭킹":"0","학습평균":"86.35","전국학습평균":"76.15","학습상위":"7%","시간평균":"5.08","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"83.1","출결포인트":"12","전체포인트":"95.1","복권이벤트":"-","전국랭킹":"177","전국회원수":"2801","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"85.85","시간점수":"3.89","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"102.74","상위가점":"0","하위감점":"0","상하위진도수":"0 / 28 / 2 / 0","총학습수":"5","가감총점":"102.74","평균":"20.55","랭킹":"0","본부랭킹":"0","학습평균":"83.68","전국학습평균":"95.66","학습상위":"18%","시간평균":"3.63","전국시간평균":"4.1","시간상위":"52%","출결평균":"9.67","전국출결평균":"10","출결상위":"35%","총점평균":"98.05","전국총점평균":"113.29","총점상위":"22%","학습포인트":"77.27","출결포인트":"12","전체포인트":"89.27","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"81.97","시간점수":"3.28","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"98.25","상위가점":"0","하위감점":"0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"5","가감총점":"98.25","평균":"19.65","랭킹":"0","본부랭킹":"0","학습평균":"85.69","전국학습평균":"95.66","학습상위":"16%","시간평균":"3.22","전국시간평균":"4.1","시간상위":"65%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"99.47","전국총점평균":"113.29","총점상위":"20%","학습포인트":"73.77","출결포인트":"12","전체포인트":"85.77","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"B.초1","조명":"03조","학습점수":"88.7","시간점수":"3.84","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"105.54","상위가점":"0","하위감점":"0","상하위진도수":"0 / 20 / 4 / 0","총학습수":"4","가감총점":"105.54","평균":"26.39","랭킹":"17","본부랭킹":"0","학습평균":"92.85","전국학습평균":"76.15","학습상위":"12%","시간평균":"4.17","전국시간평균":"3.72","시간상위":"43%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"106.13","전국총점평균":"90.1","총점상위":"10%","학습포인트":"79.83","출결포인트":"12","전체포인트":"91.83","복권이벤트":"-","전국랭킹":"292","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0055847201","회원명":"서준하","생년월일":"2018-09-15","리그명":"B.초1","조명":"02조","학습점수":"97.31","시간점수":"4.44","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"114.75","상위가점":"0","하위감점":"0","상하위진도수":"0 / 22 / 2 / 0","총학습수":"4","가감총점":"114.75","평균":"28.69","랭킹":"17","본부랭킹":"0","학습평균":"86.97","전국학습평균":"76.15","학습상위":"8%","시간평균":"4.28","전국시간평균":"3.72","시간상위":"28%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"108.38","전국총점평균":"90.1","총점상위":"8%","학습포인트":"87.58","출결포인트":"12","전체포인트":"99.58","복권이벤트":"-","전국랭킹":"200","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 인천서부 Hive","센터":"[YC]청라","센터타입":"YC","교사명":"한정아","회원번호":"000S-0056314920","회원명":"민지우","생년월일":"2019-01-05","리그명":"B.초1","조명":"04조","학습점수":"94.39","시간점수":"3.71","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"110.1","상위가점":"0","하위감점":"0","상하위진도수":"0 / 18 / 6 / 0","총학습수":"4","가감총점":"110.1","평균":"27.52","랭킹":"18","본부랭킹":"0","학습평균":"84.99","전국학습평균":"76.15","학습상위":"13%","시간평균":"3.58","전국시간평균":"3.72","시간상위":"58%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"104.15","전국총점평균":"90.1","총점상위":"12%","학습포인트":"84.95","출결포인트":"12","전체포인트":"96.95","복권이벤트":"-","전국랭킹":"278","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"83.42","시간점수":"3.38","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"99.8","상위가점":"0","하위감점":"0","상하위진도수":"0 / 30 / 0 / 0","총학습수":"5","가감총점":"99.8","평균":"19.96","랭킹":"0","본부랭킹":"0","학습평균":"87.22","전국학습평균":"95.66","학습상위":"15%","시간평균":"3.51","전국시간평균":"4.1","시간상위":"63%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"101.1","전국총점평균":"113.29","총점상위":"18%","학습포인트":"75.08","출결포인트":"12","전체포인트":"87.08","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"81.68","시간점수":"2.5","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"96.18","상위가점":"0","하위감점":"0","상하위진도수":"0 / 18 / 8 / 0","총학습수":"4","가감총점":"96.18","평균":"24.05","랭킹":"0","본부랭킹":"0","학습평균":"80.28","전국학습평균":"95.66","학습상위":"28%","시간평균":"2.83","전국시간평균":"4.1","시간상위":"78%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"89.63","전국총점평균":"113.29","총점상위":"38%","학습포인트":"73.51","출결포인트":"12","전체포인트":"85.51","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"76.68","시간점수":"2.43","출결점수":"11","학습가산점":"0","리셋감점":"0","총점":"90.11","상위가점":"0","하위감점":"0","상하위진도수":"0 / 16 / 8 / 0","총학습수":"4","가감총점":"90.11","평균":"22.53","랭킹":"0","본부랭킹":"0","학습평균":"77.8","전국학습평균":"95.66","학습상위":"32%","시간평균":"2.59","전국시간평균":"4.1","시간상위":"82%","출결평균":"9","전국출결평균":"10","출결상위":"55%","총점평균":"86.15","전국총점평균":"113.29","총점상위":"45%","학습포인트":"69.01","출결포인트":"11","전체포인트":"80.01","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 제주북부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"강대교","회원번호":"000S-0055371693","회원명":"최수아","생년월일":"2012-11-30","리그명":"-","조명":"-","학습점수":"88.65","시간점수":"3.16","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"103.81","상위가점":"0","하위감점":"0","상하위진도수":"0 / 27 / 2 / 0","총학습수":"5","가감총점":"103.81","평균":"20.76","랭킹":"0","본부랭킹":"0","학습평균":"84.06","전국학습평균":"95.66","학습상위":"17%","시간평균":"3.14","전국시간평균":"4.1","시간상위":"70%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"98.62","전국총점평균":"113.29","총점상위":"21%","학습포인트":"79.79","출결포인트":"12","전체포인트":"91.79","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 성남 Hive","센터":"[LC]서현","센터타입":"LC","교사명":"박윤미","회원번호":"000S-0056498271","회원명":"배수현","생년월일":"2019-05-19","리그명":"B.초1","조명":"05조","학습점수":"88.46","시간점수":"3.92","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"104.38","상위가점":"0","하위감점":"0","상하위진도수":"0 / 19 / 5 / 0","총학습수":"4","가감총점":"104.38","평균":"26.09","랭킹":"20","본부랭킹":"0","학습평균":"90.26","전국학습평균":"76.15","학습상위":"14%","시간평균":"3.79","전국시간평균":"3.72","시간상위":"46%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"103.62","전국총점평균":"90.1","총점상위":"13%","학습포인트":"79.61","출결포인트":"12","전체포인트":"91.61","복권이벤트":"-","전국랭킹":"344","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 고양 Hive","센터":"[LC]원흥","센터타입":"LC","교사명":"박서연","회원번호":"000S-0056382049","회원명":"이서아","생년월일":"2018-08-22","리그명":"B.초1","조명":"06조","학습점수":"85.93","시간점수":"3.91","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"102.84","상위가점":"0","하위감점":"0","상하위진도수":"0 / 20 / 3 / 0","총학습수":"4","가감총점":"102.84","평균":"25.71","랭킹":"19","본부랭킹":"0","학습평균":"85.98","전국학습평균":"76.15","학습상위":"15%","시간평균":"4.25","전국시간평균":"3.72","시간상위":"33%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"102.78","전국총점평균":"90.1","총점상위":"14%","학습포인트":"77.34","출결포인트":"12","전체포인트":"89.34","복권이벤트":"-","전국랭킹":"380","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056412093","회원명":"최하율","생년월일":"2019-09-08","리그명":"B.초1","조명":"01조","학습점수":"82.4","시간점수":"3.76","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"98.16","상위가점":"0","하위감점":"0","상하위진도수":"0 / 17 / 7 / 0","총학습수":"4","가감총점":"98.16","평균":"24.54","랭킹":"20","본부랭킹":"0","학습평균":"80.32","전국학습평균":"76.15","학습상위":"15%","시간평균":"3.37","전국시간평균":"3.72","시간상위":"52%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"100.57","전국총점평균":"90.1","총점상위":"15%","학습포인트":"74.16","출결포인트":"12","전체포인트":"86.16","복권이벤트":"-","전국랭킹":"371","전국회원수":"2801","최종랭킹":""}],
  "2":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"178.86","시간점수":"4.37","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"207.23","상위가점":"0","하위감점":"0","상하위진도수":"0 / 32 / 0 / 0","총학습수":"11","가감총점":"207.23","평균":"18.84","랭킹":"0","본부랭킹":"0","학습평균":"86.23","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.18","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"105.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"160.97","출결포인트":"22","전체포인트":"182.97","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"200.78","시간점수":"5.14","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"229.92","상위가점":"0","하위감점":"0","상하위진도수":"25 / 0 / 0 / 0","총학습수":"8","가감총점":"229.92","평균":"28.74","랭킹":"0","본부랭킹":"0","학습평균":"100.82","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.52","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"116.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"180.7","출결포인트":"22","전체포인트":"202.7","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0055176248","회원명":"남태식","생년월일":"2016-08-23","리그명":"-","조명":"-","학습점수":"194.86","시간점수":"9.54","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"228.4","상위가점":"0","하위감점":"0","상하위진도수":"30 / 0 / 0 / 0","총학습수":"10","가감총점":"228.4","평균":"22.84","랭킹":"0","본부랭킹":"0","학습평균":"96.07","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.5","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"119.25","전국총점평균":"113.29","총점상위":"1%","학습포인트":"175.37","출결포인트":"22","전체포인트":"197.37","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-0055502112","회원명":"김세혁","생년월일":"2012-02-19","리그명":"-","조명":"-","학습점수":"163.22","시간점수":"7.11","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"194.33","상위가점":"0","하위감점":"0","상하위진도수":"0 / 31 / 0 / 0","총학습수":"10","가감총점":"194.33","평균":"19.43","랭킹":"0","본부랭킹":"0","학습평균":"77.21","전국학습평균":"95.66","학습상위":"1%","시간평균":"3.84","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"96.56","전국총점평균":"113.29","총점상위":"1%","학습포인트":"146.9","출결포인트":"22","전체포인트":"168.9","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대구강북 교육국","센터":"[LC]동변","센터타입":"LC","교사명":"김현자","회원번호":"000S-0055585708","회원명":"남동연","생년월일":"2016-06-03","리그명":"-","조명":"-","학습점수":"187.9","시간점수":"8.77","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"220.67","상위가점":"0","하위감점":"0","상하위진도수":"24 / 0 / 0 / 0","총학습수":"8","가감총점":"220.67","평균":"27.58","랭킹":"0","본부랭킹":"0","학습평균":"96.82","전국학습평균":"95.66","학습상위":"1%","시간평균":"3.99","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.06","전국총점평균":"113.29","총점상위":"1%","학습포인트":"169.11","출결포인트":"22","전체포인트":"191.11","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"-","조명":"-","학습점수":"204.56","시간점수":"9.71","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"238.27","상위가점":"0","하위감점":"0","상하위진도수":"0 / 27 / 0 / 0","총학습수":"9","가감총점":"238.27","평균":"26.47","랭킹":"0","본부랭킹":"0","학습평균":"93.09","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.42","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.26","전국총점평균":"113.29","총점상위":"1%","학습포인트":"184.1","출결포인트":"22","전체포인트":"206.1","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"200.73","시간점수":"11.29","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"235.02","상위가점":"0","하위감점":"0","상하위진도수":"27 / 0 / 0 / 0","총학습수":"9","가감총점":"235.02","평균":"26.11","랭킹":"0","본부랭킹":"0","학습평균":"93.83","전국학습평균":"95.66","학습상위":"1%","시간평균":"5.94","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"120.13","전국총점평균":"113.29","총점상위":"1%","학습포인트":"180.66","출결포인트":"22","전체포인트":"202.66","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-0055918887","회원명":"진시우","생년월일":"2018-06-21","리그명":"B.초1","조명":"01조","학습점수":"207.49","시간점수":"10.45","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"241.94","상위가점":"0","하위감점":"0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"10","가감총점":"241.94","평균":"24.19","랭킹":"5","본부랭킹":"0","학습평균":"100.56","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.24","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.4","전국총점평균":"90.1","총점상위":"1%","학습포인트":"186.74","출결포인트":"22","전체포인트":"208.74","복권이벤트":"-","전국랭킹":"87","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0056203858","회원명":"유지안","생년월일":"2018-06-22","리그명":"B.초1","조명":"01조","학습점수":"203.04","시간점수":"11.1","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"238.14","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"8","가감총점":"238.14","평균":"29.77","랭킹":"1","본부랭킹":"0","학습평균":"101.26","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.81","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.32","전국총점평균":"90.1","총점상위":"1%","학습포인트":"182.74","출결포인트":"22","전체포인트":"204.74","복권이벤트":"-","전국랭킹":"1","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"193.33","시간점수":"10.99","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"228.32","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"8","가감총점":"228.32","평균":"28.54","랭킹":"2","본부랭킹":"0","학습평균":"96.01","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.13","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.31","전국총점평균":"90.1","총점상위":"1%","학습포인트":"174.0","출결포인트":"22","전체포인트":"196.0","복권이벤트":"-","전국랭킹":"94","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"197.58","시간점수":"11.75","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"233.33","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"8","가감총점":"233.33","평균":"29.17","랭킹":"4","본부랭킹":"0","학습평균":"99.85","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.29","전국시간평균":"3.72","시간상위":"2%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.27","전국총점평균":"90.1","총점상위":"1%","학습포인트":"177.82","출결포인트":"22","전체포인트":"199.82","복권이벤트":"-","전국랭킹":"87","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056240381","회원명":"문채아","생년월일":"2019-07-12","리그명":"B.초1","조명":"01조","학습점수":"203.93","시간점수":"11.47","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"239.4","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"8","가감총점":"239.4","평균":"29.93","랭킹":"9","본부랭킹":"0","학습평균":"98.62","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.53","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.18","전국총점평균":"90.1","총점상위":"1%","학습포인트":"183.54","출결포인트":"22","전체포인트":"205.54","복권이벤트":"-","전국랭킹":"66","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"192.99","시간점수":"10.06","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"227.05","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"8","가감총점":"227.05","평균":"28.38","랭킹":"4","본부랭킹":"0","학습평균":"98.94","전국학습평균":"76.15","학습상위":"3%","시간평균":"4.9","전국시간평균":"3.72","시간상위":"4%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"117.64","전국총점평균":"90.1","총점상위":"2%","학습포인트":"173.69","출결포인트":"22","전체포인트":"195.69","복권이벤트":"-","전국랭킹":"90","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"196.27","시간점수":"1.49","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"221.76","상위가점":"0","하위감점":"0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"9","가감총점":"221.76","평균":"24.64","랭킹":"8","본부랭킹":"0","학습평균":"101.19","전국학습평균":"76.15","학습상위":"1%","시간평균":"0.8","전국시간평균":"3.72","시간상위":"99%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"113.49","전국총점평균":"90.1","총점상위":"4%","학습포인트":"176.64","출결포인트":"22","전체포인트":"198.64","복권이벤트":"-","전국랭킹":"142","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"182.43","시간점수":"9.76","출결점수":"21","학습가산점":"0","리셋감점":"0","총점":"213.19","상위가점":"0","하위감점":"0","상하위진도수":"0 / 16 / 0 / 0","총학습수":"5","가감총점":"213.19","평균":"42.64","랭킹":"12","본부랭킹":"0","학습평균":"88.47","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.55","전국시간평균":"3.72","시간상위":"11%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.95","전국총점평균":"90.1","총점상위":"5%","학습포인트":"164.19","출결포인트":"21","전체포인트":"185.19","복권이벤트":"-","전국랭킹":"124","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"196.53","시간점수":"8.23","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"228.76","상위가점":"0","하위감점":"0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"8","가감총점":"228.76","평균":"28.59","랭킹":"11","본부랭킹":"0","학습평균":"92.73","전국학습평균":"76.15","학습상위":"6%","시간평균":"3.88","전국시간평균":"3.72","시간상위":"34%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.78","전국총점평균":"90.1","총점상위":"5%","학습포인트":"176.88","출결포인트":"22","전체포인트":"198.88","복권이벤트":"-","전국랭킹":"135","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 거제 Hive","센터":"[YC]국산","센터타입":"YC","교사명":"박수정","회원번호":"000S-0056157436","회원명":"정하진","생년월일":"2018-02-16","리그명":"B.초1","조명":"01조","학습점수":"180.81","시간점수":"9.14","출결점수":"21","학습가산점":"2","리셋감점":"0","총점":"212.95","상위가점":"0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"8","가감총점":"212.95","평균":"26.62","랭킹":"12","본부랭킹":"0","학습평균":"89.79","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.3","전국시간평균":"3.72","시간상위":"24%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.09","전국총점평균":"90.1","총점상위":"6%","학습포인트":"162.73","출결포인트":"21","전체포인트":"183.73","복권이벤트":"-","전국랭킹":"183","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"192.83","시간점수":"7.73","출결점수":"21","학습가산점":"2","리셋감점":"0","총점":"223.56","상위가점":"0","하위감점":"0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"8","가감총점":"223.56","평균":"27.95","랭킹":"11","본부랭킹":"0","학습평균":"88.47","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.07","전국시간평균":"3.72","시간상위":"41%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.05","전국총점평균":"90.1","총점상위":"6%","학습포인트":"173.55","출결포인트":"21","전체포인트":"194.55","복권이벤트":"-","전국랭킹":"168","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"186.86","시간점수":"10.48","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"220.34","상위가점":"0","하위감점":"0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"8","가감총점":"220.34","평균":"27.54","랭킹":"10","본부랭킹":"0","학습평균":"90.62","전국학습평균":"76.15","학습상위":"7%","시간평균":"5.29","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"168.17","출결포인트":"22","전체포인트":"190.17","복권이벤트":"-","전국랭킹":"120","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"203.27","시간점수":"6.23","출결점수":"22","학습가산점":"0","리셋감점":"0","총점":"231.5","상위가점":"0","하위감점":"0","상하위진도수":"0 / 6 / 10 / 0","총학습수":"5","가감총점":"231.5","평균":"46.3","랭킹":"12","본부랭킹":"0","학습평균":"91.65","전국학습평균":"76.15","학습상위":"5%","시간평균":"3.56","전국시간평균":"3.72","시간상위":"63%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.42","전국총점평균":"90.1","총점상위":"6%","학습포인트":"182.94","출결포인트":"22","전체포인트":"204.94","복권이벤트":"-","전국랭킹":"197","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"194.53","시간점수":"7.66","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"226.19","상위가점":"0","하위감점":"0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"9","가감총점":"226.19","평균":"25.13","랭킹":"14","본부랭킹":"0","학습평균":"87.68","전국학습평균":"76.15","학습상위":"7%","시간평균":"3.8","전국시간평균":"3.72","시간상위":"54%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.07","전국총점평균":"90.1","총점상위":"7%","학습포인트":"175.08","출결포인트":"22","전체포인트":"197.08","복권이벤트":"-","전국랭킹":"178","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[LC]서정","센터타입":"LC","교사명":"이진아","회원번호":"000S-0056301847","회원명":"오서연","생년월일":"2019-04-11","리그명":"B.초1","조명":"02조","학습점수":"188.87","시간점수":"9.49","출결점수":"21","학습가산점":"2","리셋감점":"0","총점":"221.36","상위가점":"0","하위감점":"0","상하위진도수":"0 / 22 / 4 / 0","총학습수":"9","가감총점":"221.36","평균":"24.6","랭킹":"19","본부랭킹":"0","학습평균":"90.04","전국학습평균":"76.15","학습상위":"9%","시간평균":"4.78","전국시간평균":"3.72","시간상위":"22%","출결평균":"9.33","전국출결평균":"8.86","출결상위":"38%","총점평균":"107.5","전국총점평균":"90.1","총점상위":"9%","학습포인트":"169.98","출결포인트":"21","전체포인트":"190.98","복권이벤트":"-","전국랭킹":"265","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"188.69","시간점수":"10.48","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"222.17","상위가점":"0","하위감점":"0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"8","가감총점":"222.17","평균":"27.77","랭킹":"10","본부랭킹":"0","학습평균":"88.81","전국학습평균":"76.15","학습상위":"7%","시간평균":"5.21","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"169.82","출결포인트":"22","전체포인트":"191.82","복권이벤트":"-","전국랭킹":"136","전국회원수":"2801","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"172.07","시간점수":"6.86","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"200.93","상위가점":"0","하위감점":"0","상하위진도수":"0 / 28 / 2 / 0","총학습수":"10","가감총점":"200.93","평균":"20.09","랭킹":"0","본부랭킹":"0","학습평균":"79.65","전국학습평균":"95.66","학습상위":"18%","시간평균":"3.47","전국시간평균":"4.1","시간상위":"52%","출결평균":"9.67","전국출결평균":"10","출결상위":"35%","총점평균":"98.05","전국총점평균":"113.29","총점상위":"22%","학습포인트":"154.86","출결포인트":"21","전체포인트":"175.86","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"167.99","시간점수":"6.62","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"198.61","상위가점":"0","하위감점":"0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"10","가감총점":"198.61","평균":"19.86","랭킹":"0","본부랭킹":"0","학습평균":"85.78","전국학습평균":"95.66","학습상위":"16%","시간평균":"3.22","전국시간평균":"4.1","시간상위":"65%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"99.47","전국총점평균":"113.29","총점상위":"20%","학습포인트":"151.19","출결포인트":"22","전체포인트":"173.19","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"B.초1","조명":"03조","학습점수":"178.35","시간점수":"8.32","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"209.67","상위가점":"0","하위감점":"0","상하위진도수":"0 / 20 / 4 / 0","총학습수":"8","가감총점":"209.67","평균":"26.21","랭킹":"16","본부랭킹":"0","학습평균":"89.93","전국학습평균":"76.15","학습상위":"12%","시간평균":"4.12","전국시간평균":"3.72","시간상위":"43%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"106.13","전국총점평균":"90.1","총점상위":"10%","학습포인트":"160.51","출결포인트":"22","전체포인트":"182.51","복권이벤트":"-","전국랭킹":"234","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0055847201","회원명":"서준하","생년월일":"2018-09-15","리그명":"B.초1","조명":"02조","학습점수":"178.28","시간점수":"8.52","출결점수":"21","학습가산점":"2","리셋감점":"0","총점":"209.8","상위가점":"0","하위감점":"0","상하위진도수":"0 / 22 / 2 / 0","총학습수":"8","가감총점":"209.8","평균":"26.23","랭킹":"15","본부랭킹":"0","학습평균":"95.08","전국학습평균":"76.15","학습상위":"8%","시간평균":"4.14","전국시간평균":"3.72","시간상위":"28%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"108.38","전국총점평균":"90.1","총점상위":"8%","학습포인트":"160.45","출결포인트":"21","전체포인트":"181.45","복권이벤트":"-","전국랭킹":"279","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 인천서부 Hive","센터":"[YC]청라","센터타입":"YC","교사명":"한정아","회원번호":"000S-0056314920","회원명":"민지우","생년월일":"2019-01-05","리그명":"B.초1","조명":"04조","학습점수":"178.99","시간점수":"7.31","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"209.3","상위가점":"0","하위감점":"0","상하위진도수":"0 / 18 / 6 / 0","총학습수":"8","가감총점":"209.3","평균":"26.16","랭킹":"21","본부랭킹":"0","학습평균":"83.83","전국학습평균":"76.15","학습상위":"13%","시간평균":"3.78","전국시간평균":"3.72","시간상위":"58%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"104.15","전국총점평균":"90.1","총점상위":"12%","학습포인트":"161.09","출결포인트":"22","전체포인트":"183.09","복권이벤트":"-","전국랭킹":"272","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"177.49","시간점수":"6.18","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"206.67","상위가점":"0","하위감점":"0","상하위진도수":"0 / 30 / 0 / 0","총학습수":"10","가감총점":"206.67","평균":"20.67","랭킹":"0","본부랭킹":"0","학습평균":"80.43","전국학습평균":"95.66","학습상위":"15%","시간평균":"3.2","전국시간평균":"4.1","시간상위":"63%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"101.1","전국총점평균":"113.29","총점상위":"18%","학습포인트":"159.74","출결포인트":"22","전체포인트":"181.74","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"163.69","시간점수":"5.24","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"191.93","상위가점":"0","하위감점":"0","상하위진도수":"0 / 18 / 8 / 0","총학습수":"9","가감총점":"191.93","평균":"21.33","랭킹":"0","본부랭킹":"0","학습평균":"75.25","전국학습평균":"95.66","학습상위":"28%","시간평균":"2.6","전국시간평균":"4.1","시간상위":"78%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"89.63","전국총점평균":"113.29","총점상위":"38%","학습포인트":"147.32","출결포인트":"22","전체포인트":"169.32","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"165.54","시간점수":"5.19","출결점수":"20","학습가산점":"1","리셋감점":"0","총점":"191.73","상위가점":"0","하위감점":"0","상하위진도수":"0 / 16 / 8 / 0","총학습수":"8","가감총점":"191.73","평균":"23.97","랭킹":"0","본부랭킹":"0","학습평균":"73.3","전국학습평균":"95.66","학습상위":"32%","시간평균":"2.37","전국시간평균":"4.1","시간상위":"82%","출결평균":"9","전국출결평균":"10","출결상위":"55%","총점평균":"86.15","전국총점평균":"113.29","총점상위":"45%","학습포인트":"148.99","출결포인트":"20","전체포인트":"168.99","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 제주북부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"강대교","회원번호":"000S-0055371693","회원명":"최수아","생년월일":"2012-11-30","리그명":"-","조명":"-","학습점수":"173.1","시간점수":"6.23","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"202.33","상위가점":"0","하위감점":"0","상하위진도수":"0 / 27 / 2 / 0","총학습수":"10","가감총점":"202.33","평균":"20.23","랭킹":"0","본부랭킹":"0","학습평균":"81.21","전국학습평균":"95.66","학습상위":"17%","시간평균":"3.07","전국시간평균":"4.1","시간상위":"70%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"98.62","전국총점평균":"113.29","총점상위":"21%","학습포인트":"155.79","출결포인트":"22","전체포인트":"177.79","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 성남 Hive","센터":"[LC]서현","센터타입":"LC","교사명":"박윤미","회원번호":"000S-0056498271","회원명":"배수현","생년월일":"2019-05-19","리그명":"B.초1","조명":"05조","학습점수":"185.43","시간점수":"8.19","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"216.62","상위가점":"0","하위감점":"0","상하위진도수":"0 / 19 / 5 / 0","총학습수":"8","가감총점":"216.62","평균":"27.08","랭킹":"23","본부랭킹":"0","학습평균":"90.49","전국학습평균":"76.15","학습상위":"14%","시간평균":"3.67","전국시간평균":"3.72","시간상위":"46%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"103.62","전국총점평균":"90.1","총점상위":"13%","학습포인트":"166.89","출결포인트":"22","전체포인트":"188.89","복권이벤트":"-","전국랭킹":"307","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 고양 Hive","센터":"[LC]원흥","센터타입":"LC","교사명":"박서연","회원번호":"000S-0056382049","회원명":"이서아","생년월일":"2018-08-22","리그명":"B.초1","조명":"06조","학습점수":"170.35","시간점수":"8.77","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"201.12","상위가점":"0","하위감점":"0","상하위진도수":"0 / 20 / 3 / 0","총학습수":"8","가감총점":"201.12","평균":"25.14","랭킹":"20","본부랭킹":"0","학습평균":"81.32","전국학습평균":"76.15","학습상위":"15%","시간평균":"4.35","전국시간평균":"3.72","시간상위":"33%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"102.78","전국총점평균":"90.1","총점상위":"14%","학습포인트":"153.31","출결포인트":"21","전체포인트":"174.31","복권이벤트":"-","전국랭킹":"357","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056412093","회원명":"최하율","생년월일":"2019-09-08","리그명":"B.초1","조명":"01조","학습점수":"170.42","시간점수":"7.76","출결점수":"22","학습가산점":"0","리셋감점":"0","총점":"200.18","상위가점":"0","하위감점":"0","상하위진도수":"0 / 17 / 7 / 0","총학습수":"8","가감총점":"200.18","평균":"25.02","랭킹":"26","본부랭킹":"0","학습평균":"87.23","전국학습평균":"76.15","학습상위":"15%","시간평균":"3.81","전국시간평균":"3.72","시간상위":"52%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"100.57","전국총점평균":"90.1","총점상위":"15%","학습포인트":"153.38","출결포인트":"22","전체포인트":"175.38","복권이벤트":"-","전국랭킹":"427","전국회원수":"2801","최종랭킹":""}],
  "3":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"266.56","시간점수":"6.84","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"308.4","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 32 / 0 / 0","총학습수":"16","가감총점":"318.4","평균":"19.9","랭킹":"0","본부랭킹":"0","학습평균":"84.68","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.31","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"105.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"239.9","출결포인트":"32","전체포인트":"271.9","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"310.76","시간점수":"7.14","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"352.9","상위가점":"20.0","하위감점":"0","상하위진도수":"25 / 0 / 0 / 0","총학습수":"12","가감총점":"372.9","평균":"31.07","랭킹":"0","본부랭킹":"0","학습평균":"100.17","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.47","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"116.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"279.68","출결포인트":"32","전체포인트":"311.68","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0055176248","회원명":"남태식","생년월일":"2016-08-23","리그명":"-","조명":"-","학습점수":"294.16","시간점수":"15.03","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"344.19","상위가점":"20.0","하위감점":"0","상하위진도수":"30 / 0 / 0 / 0","총학습수":"15","가감총점":"364.19","평균":"24.28","랭킹":"0","본부랭킹":"0","학습평균":"94.28","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.45","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"119.25","전국총점평균":"113.29","총점상위":"1%","학습포인트":"264.74","출결포인트":"32","전체포인트":"296.74","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-0055502112","회원명":"김세혁","생년월일":"2012-02-19","리그명":"-","조명":"-","학습점수":"233.6","시간점수":"10.62","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"278.22","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 31 / 0 / 0","총학습수":"16","가감총점":"288.22","평균":"18.01","랭킹":"0","본부랭킹":"0","학습평균":"80.85","전국학습평균":"95.66","학습상위":"1%","시간평균":"3.9","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"96.56","전국총점평균":"113.29","총점상위":"1%","학습포인트":"210.24","출결포인트":"32","전체포인트":"242.24","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대구강북 교육국","센터":"[LC]동변","센터타입":"LC","교사명":"김현자","회원번호":"000S-0055585708","회원명":"남동연","생년월일":"2016-06-03","리그명":"-","조명":"-","학습점수":"288.48","시간점수":"13.13","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"336.61","상위가점":"20.0","하위감점":"0","상하위진도수":"24 / 0 / 0 / 0","총학습수":"12","가감총점":"356.61","평균":"29.72","랭킹":"0","본부랭킹":"0","학습평균":"94.39","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.6","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.06","전국총점평균":"113.29","총점상위":"1%","학습포인트":"259.63","출결포인트":"32","전체포인트":"291.63","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"-","조명":"-","학습점수":"301.09","시간점수":"14.86","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"349.95","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 27 / 0 / 0","총학습수":"14","가감총점":"359.95","평균":"25.71","랭킹":"0","본부랭킹":"0","학습평균":"93.15","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.98","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.26","전국총점평균":"113.29","총점상위":"1%","학습포인트":"270.98","출결포인트":"32","전체포인트":"302.98","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"290.36","시간점수":"19.21","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"343.57","상위가점":"20.0","하위감점":"0","상하위진도수":"27 / 0 / 0 / 0","총학습수":"14","가감총점":"363.57","평균":"25.97","랭킹":"0","본부랭킹":"0","학습평균":"94.65","전국학습평균":"95.66","학습상위":"1%","시간평균":"5.62","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"120.13","전국총점평균":"113.29","총점상위":"1%","학습포인트":"261.32","출결포인트":"32","전체포인트":"293.32","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-0055918887","회원명":"진시우","생년월일":"2018-06-21","리그명":"B.초1","조명":"01조","학습점수":"298.04","시간점수":"17.36","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"350.4","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"14","가감총점":"360.4","평균":"25.74","랭킹":"1","본부랭킹":"0","학습평균":"98.06","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.6","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.4","전국총점평균":"90.1","총점상위":"1%","학습포인트":"268.24","출결포인트":"32","전체포인트":"300.24","복권이벤트":"-","전국랭킹":"32","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0056203858","회원명":"유지안","생년월일":"2018-06-22","리그명":"B.초1","조명":"01조","학습점수":"296.56","시간점수":"16.74","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"348.3","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"12","가감총점":"358.3","평균":"29.86","랭킹":"2","본부랭킹":"0","학습평균":"99.09","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.1","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.32","전국총점평균":"90.1","총점상위":"1%","학습포인트":"266.9","출결포인트":"32","전체포인트":"298.9","복권이벤트":"-","전국랭킹":"1","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"312.77","시간점수":"16.61","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"364.38","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"12","가감총점":"374.38","평균":"31.2","랭킹":"6","본부랭킹":"0","학습평균":"99.37","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.25","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.31","전국총점평균":"90.1","총점상위":"1%","학습포인트":"281.49","출결포인트":"32","전체포인트":"313.49","복권이벤트":"-","전국랭킹":"78","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"297.94","시간점수":"17.53","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"350.47","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"12","가감총점":"360.47","평균":"30.04","랭킹":"4","본부랭킹":"0","학습평균":"95.14","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.76","전국시간평균":"3.72","시간상위":"2%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.27","전국총점평균":"90.1","총점상위":"1%","학습포인트":"268.15","출결포인트":"32","전체포인트":"300.15","복권이벤트":"-","전국랭킹":"66","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056240381","회원명":"문채아","생년월일":"2019-07-12","리그명":"B.초1","조명":"01조","학습점수":"306.59","시간점수":"16.11","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"356.7","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"12","가감총점":"366.7","평균":"30.56","랭킹":"5","본부랭킹":"0","학습평균":"96.08","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.45","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.18","전국총점평균":"90.1","총점상위":"1%","학습포인트":"275.93","출결포인트":"32","전체포인트":"307.93","복권이벤트":"-","전국랭킹":"80","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"292.65","시간점수":"14.87","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"342.52","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"12","가감총점":"352.52","평균":"29.38","랭킹":"7","본부랭킹":"0","학습평균":"100.98","전국학습평균":"76.15","학습상위":"3%","시간평균":"5.4","전국시간평균":"3.72","시간상위":"4%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"117.64","전국총점평균":"90.1","총점상위":"2%","학습포인트":"263.38","출결포인트":"32","전체포인트":"295.38","복권이벤트":"-","전국랭킹":"101","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"312.08","시간점수":"2.44","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"349.52","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"13","가감총점":"359.52","평균":"27.66","랭킹":"7","본부랭킹":"0","학습평균":"97.48","전국학습평균":"76.15","학습상위":"1%","시간평균":"0.74","전국시간평균":"3.72","시간상위":"99%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"113.49","전국총점평균":"90.1","총점상위":"4%","학습포인트":"280.87","출결포인트":"32","전체포인트":"312.87","복권이벤트":"-","전국랭킹":"129","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"280.23","시간점수":"14.47","출결점수":"30","학습가산점":"0","리셋감점":"0","총점":"324.7","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 16 / 0 / 0","총학습수":"8","가감총점":"334.7","평균":"41.84","랭킹":"10","본부랭킹":"0","학습평균":"94.06","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.85","전국시간평균":"3.72","시간상위":"11%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.95","전국총점평균":"90.1","총점상위":"5%","학습포인트":"252.21","출결포인트":"30","전체포인트":"282.21","복권이벤트":"-","전국랭킹":"178","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"282.85","시간점수":"11.97","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"329.82","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"12","가감총점":"339.82","평균":"28.32","랭킹":"10","본부랭킹":"0","학습평균":"95.79","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.36","전국시간평균":"3.72","시간상위":"34%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.78","전국총점평균":"90.1","총점상위":"5%","학습포인트":"254.57","출결포인트":"32","전체포인트":"286.57","복권이벤트":"-","전국랭킹":"205","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 거제 Hive","센터":"[YC]국산","센터타입":"YC","교사명":"박수정","회원번호":"000S-0056157436","회원명":"정하진","생년월일":"2018-02-16","리그명":"B.초1","조명":"01조","학습점수":"273.69","시간점수":"12.54","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"318.23","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"12","가감총점":"328.23","평균":"27.35","랭킹":"12","본부랭킹":"0","학습평균":"92.77","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.35","전국시간평균":"3.72","시간상위":"24%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.09","전국총점평균":"90.1","총점상위":"6%","학습포인트":"246.32","출결포인트":"30","전체포인트":"276.32","복권이벤트":"-","전국랭킹":"201","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"293.47","시간점수":"12.4","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"337.87","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"12","가감총점":"347.87","평균":"28.99","랭킹":"14","본부랭킹":"0","학습평균":"89.36","전국학습평균":"76.15","학습상위":"6%","시간평균":"3.79","전국시간평균":"3.72","시간상위":"41%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.05","전국총점평균":"90.1","총점상위":"6%","학습포인트":"264.12","출결포인트":"30","전체포인트":"294.12","복권이벤트":"-","전국랭킹":"157","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"268.11","시간점수":"14.17","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"316.28","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"12","가감총점":"326.28","평균":"27.19","랭킹":"13","본부랭킹":"0","학습평균":"94.3","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.59","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"241.3","출결포인트":"32","전체포인트":"273.3","복권이벤트":"-","전국랭킹":"197","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"288.01","시간점수":"10.19","출결점수":"32","학습가산점":"0","리셋감점":"0","총점":"330.2","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 6 / 10 / 0","총학습수":"8","가감총점":"330.2","평균":"41.27","랭킹":"12","본부랭킹":"0","학습평균":"95.83","전국학습평균":"76.15","학습상위":"5%","시간평균":"3.33","전국시간평균":"3.72","시간상위":"63%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.42","전국총점평균":"90.1","총점상위":"6%","학습포인트":"259.21","출결포인트":"32","전체포인트":"291.21","복권이벤트":"-","전국랭킹":"224","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"273.89","시간점수":"11.12","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"320.01","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"13","가감총점":"330.01","평균":"25.39","랭킹":"12","본부랭킹":"0","학습평균":"94.27","전국학습평균":"76.15","학습상위":"7%","시간평균":"3.83","전국시간평균":"3.72","시간상위":"54%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.07","전국총점평균":"90.1","총점상위":"7%","학습포인트":"246.5","출결포인트":"32","전체포인트":"278.5","복권이벤트":"-","전국랭킹":"238","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[LC]서정","센터타입":"LC","교사명":"이진아","회원번호":"000S-0056301847","회원명":"오서연","생년월일":"2019-04-11","리그명":"B.초1","조명":"02조","학습점수":"285.38","시간점수":"13.39","출결점수":"29","학습가산점":"2","리셋감점":"0","총점":"329.77","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 22 / 4 / 0","총학습수":"13","가감총점":"329.77","평균":"25.37","랭킹":"19","본부랭킹":"0","학습평균":"89.94","전국학습평균":"76.15","학습상위":"9%","시간평균":"4.34","전국시간평균":"3.72","시간상위":"22%","출결평균":"9.33","전국출결평균":"8.86","출결상위":"38%","총점평균":"107.5","전국총점평균":"90.1","총점상위":"9%","학습포인트":"256.84","출결포인트":"29","전체포인트":"285.84","복권이벤트":"-","전국랭킹":"271","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"274.44","시간점수":"15.54","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"323.98","상위가점":"10.0","하위감점":"0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"12","가감총점":"333.98","평균":"27.83","랭킹":"13","본부랭킹":"0","학습평균":"93.84","전국학습평균":"76.15","학습상위":"7%","시간평균":"5.04","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"247.0","출결포인트":"32","전체포인트":"279.0","복권이벤트":"-","전국랭킹":"136","전국회원수":"2801","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"264.29","시간점수":"11.03","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"307.32","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 28 / 2 / 0","총학습수":"15","가감총점":"307.32","평균":"20.49","랭킹":"0","본부랭킹":"0","학습평균":"85.26","전국학습평균":"95.66","학습상위":"18%","시간평균":"3.85","전국시간평균":"4.1","시간상위":"52%","출결평균":"9.67","전국출결평균":"10","출결상위":"35%","총점평균":"98.05","전국총점평균":"113.29","총점상위":"22%","학습포인트":"237.86","출결포인트":"30","전체포인트":"267.86","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"258.88","시간점수":"9.98","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"302.86","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"14","가감총점":"302.86","평균":"21.63","랭킹":"0","본부랭킹":"0","학습평균":"82.81","전국학습평균":"95.66","학습상위":"16%","시간평균":"3.38","전국시간평균":"4.1","시간상위":"65%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"99.47","전국총점평균":"113.29","총점상위":"20%","학습포인트":"232.99","출결포인트":"32","전체포인트":"264.99","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"B.초1","조명":"03조","학습점수":"275.66","시간점수":"12.47","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"322.13","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 20 / 4 / 0","총학습수":"12","가감총점":"322.13","평균":"26.84","랭킹":"21","본부랭킹":"0","학습평균":"88.47","전국학습평균":"76.15","학습상위":"12%","시간평균":"3.77","전국시간평균":"3.72","시간상위":"43%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"106.13","전국총점평균":"90.1","총점상위":"10%","학습포인트":"248.09","출결포인트":"32","전체포인트":"280.09","복권이벤트":"-","전국랭킹":"333","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0055847201","회원명":"서준하","생년월일":"2018-09-15","리그명":"B.초1","조명":"02조","학습점수":"273.12","시간점수":"13.39","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"318.51","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 22 / 2 / 0","총학습수":"12","가감총점":"318.51","평균":"26.54","랭킹":"20","본부랭킹":"0","학습평균":"90.8","전국학습평균":"76.15","학습상위":"8%","시간평균":"4.45","전국시간평균":"3.72","시간상위":"28%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"108.38","전국총점평균":"90.1","총점상위":"8%","학습포인트":"245.81","출결포인트":"30","전체포인트":"275.81","복권이벤트":"-","전국랭킹":"297","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 인천서부 Hive","센터":"[YC]청라","센터타입":"YC","교사명":"한정아","회원번호":"000S-0056314920","회원명":"민지우","생년월일":"2019-01-05","리그명":"B.초1","조명":"04조","학습점수":"263.96","시간점수":"9.94","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"307.9","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 18 / 6 / 0","총학습수":"12","가감총점":"307.9","평균":"25.66","랭킹":"19","본부랭킹":"0","학습평균":"85.26","전국학습평균":"76.15","학습상위":"13%","시간평균":"3.44","전국시간평균":"3.72","시간상위":"58%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"104.15","전국총점평균":"90.1","총점상위":"12%","학습포인트":"237.56","출결포인트":"32","전체포인트":"269.56","복권이벤트":"-","전국랭킹":"301","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"262.3","시간점수":"9.25","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"305.55","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 30 / 0 / 0","총학습수":"15","가감총점":"305.55","평균":"20.37","랭킹":"0","본부랭킹":"0","학습평균":"82.13","전국학습평균":"95.66","학습상위":"15%","시간평균":"3.36","전국시간평균":"4.1","시간상위":"63%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"101.1","전국총점평균":"113.29","총점상위":"18%","학습포인트":"236.07","출결포인트":"32","전체포인트":"268.07","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"249.29","시간점수":"7.41","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"290.7","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 18 / 8 / 0","총학습수":"13","가감총점":"290.7","평균":"22.36","랭킹":"0","본부랭킹":"0","학습평균":"78.23","전국학습평균":"95.66","학습상위":"28%","시간평균":"2.67","전국시간평균":"4.1","시간상위":"78%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"89.63","전국총점평균":"113.29","총점상위":"38%","학습포인트":"224.36","출결포인트":"32","전체포인트":"256.36","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"236.0","시간점수":"6.94","출결점수":"28","학습가산점":"1","리셋감점":"0","총점":"271.94","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 16 / 8 / 0","총학습수":"12","가감총점":"271.94","평균":"22.66","랭킹":"0","본부랭킹":"0","학습평균":"76.32","전국학습평균":"95.66","학습상위":"32%","시간평균":"2.57","전국시간평균":"4.1","시간상위":"82%","출결평균":"9","전국출결평균":"10","출결상위":"55%","총점평균":"86.15","전국총점평균":"113.29","총점상위":"45%","학습포인트":"212.4","출결포인트":"28","전체포인트":"240.4","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 제주북부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"강대교","회원번호":"000S-0055371693","회원명":"최수아","생년월일":"2012-11-30","리그명":"-","조명":"-","학습점수":"257.14","시간점수":"9.39","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"300.53","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 27 / 2 / 0","총학습수":"14","가감총점":"300.53","평균":"21.47","랭킹":"0","본부랭킹":"0","학습평균":"85.48","전국학습평균":"95.66","학습상위":"17%","시간평균":"3.17","전국시간평균":"4.1","시간상위":"70%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"98.62","전국총점평균":"113.29","총점상위":"21%","학습포인트":"231.43","출결포인트":"32","전체포인트":"263.43","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 성남 Hive","센터":"[LC]서현","센터타입":"LC","교사명":"박윤미","회원번호":"000S-0056498271","회원명":"배수현","생년월일":"2019-05-19","리그명":"B.초1","조명":"05조","학습점수":"264.89","시간점수":"10.59","출결점수":"32","학습가산점":"1","리셋감점":"0","총점":"308.48","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 19 / 5 / 0","총학습수":"12","가감총점":"308.48","평균":"25.71","랭킹":"20","본부랭킹":"0","학습평균":"88.95","전국학습평균":"76.15","학습상위":"14%","시간평균":"4.03","전국시간평균":"3.72","시간상위":"46%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"103.62","전국총점평균":"90.1","총점상위":"13%","학습포인트":"238.4","출결포인트":"32","전체포인트":"270.4","복권이벤트":"-","전국랭킹":"326","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 고양 Hive","센터":"[LC]원흥","센터타입":"LC","교사명":"박서연","회원번호":"000S-0056382049","회원명":"이서아","생년월일":"2018-08-22","리그명":"B.초1","조명":"06조","학습점수":"276.44","시간점수":"12.42","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"320.86","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 20 / 3 / 0","총학습수":"12","가감총점":"320.86","평균":"26.74","랭킹":"24","본부랭킹":"0","학습평균":"85.91","전국학습평균":"76.15","학습상위":"15%","시간평균":"4.26","전국시간평균":"3.72","시간상위":"33%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"102.78","전국총점평균":"90.1","총점상위":"14%","학습포인트":"248.8","출결포인트":"30","전체포인트":"278.8","복권이벤트":"-","전국랭킹":"399","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056412093","회원명":"최하율","생년월일":"2019-09-08","리그명":"B.초1","조명":"01조","학습점수":"252.73","시간점수":"10.45","출결점수":"32","학습가산점":"0","리셋감점":"0","총점":"295.18","상위가점":"0.0","하위감점":"0","상하위진도수":"0 / 17 / 7 / 0","총학습수":"12","가감총점":"295.18","평균":"24.6","랭킹":"23","본부랭킹":"0","학습평균":"79.99","전국학습평균":"76.15","학습상위":"15%","시간평균":"3.55","전국시간평균":"3.72","시간상위":"52%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"100.57","전국총점평균":"90.1","총점상위":"15%","학습포인트":"227.46","출결포인트":"32","전체포인트":"259.46","복권이벤트":"-","전국랭킹":"404","전국회원수":"2801","최종랭킹":""}],
  "4":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"370.41","시간점수":"8.6","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"424.01","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 32 / 0 / 0","총학습수":"21","가감총점":"434.01","평균":"20.67","랭킹":"0","본부랭킹":"0","학습평균":"85.19","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.17","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"105.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"333.37","출결포인트":"41","전체포인트":"374.37","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"385.11","시간점수":"10.13","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"440.24","상위가점":"20.0","하위감점":"0.0","상하위진도수":"25 / 0 / 0 / 0","총학습수":"17","가감총점":"460.24","평균":"27.07","랭킹":"0","본부랭킹":"0","학습평균":"92.27","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.45","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"116.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"346.6","출결포인트":"41","전체포인트":"387.6","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0055176248","회원명":"남태식","생년월일":"2016-08-23","리그명":"-","조명":"-","학습점수":"402.58","시간점수":"17.77","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"465.35","상위가점":"20.0","하위감점":"0.0","상하위진도수":"30 / 0 / 0 / 0","총학습수":"20","가감총점":"485.35","평균":"24.27","랭킹":"0","본부랭킹":"0","학습평균":"98.43","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.53","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"119.25","전국총점평균":"113.29","총점상위":"1%","학습포인트":"362.32","출결포인트":"41","전체포인트":"403.32","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-0055502112","회원명":"김세혁","생년월일":"2012-02-19","리그명":"-","조명":"-","학습점수":"320.1","시간점수":"13.53","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"377.63","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 31 / 0 / 0","총학습수":"21","가감총점":"387.63","평균":"18.46","랭킹":"0","본부랭킹":"0","학습평균":"76.95","전국학습평균":"95.66","학습상위":"1%","시간평균":"3.48","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"96.56","전국총점평균":"113.29","총점상위":"1%","학습포인트":"288.09","출결포인트":"41","전체포인트":"329.09","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대구강북 교육국","센터":"[LC]동변","센터타입":"LC","교사명":"김현자","회원번호":"000S-0055585708","회원명":"남동연","생년월일":"2016-06-03","리그명":"-","조명":"-","학습점수":"386.52","시간점수":"17.82","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"449.34","상위가점":"20.0","하위감점":"0.0","상하위진도수":"24 / 0 / 0 / 0","총학습수":"16","가감총점":"469.34","평균":"29.33","랭킹":"0","본부랭킹":"0","학습평균":"94.19","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.45","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.06","전국총점평균":"113.29","총점상위":"1%","학습포인트":"347.87","출결포인트":"41","전체포인트":"388.87","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"-","조명":"-","학습점수":"413.28","시간점수":"17.85","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"475.13","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 27 / 0 / 0","총학습수":"18","가감총점":"485.13","평균":"26.95","랭킹":"0","본부랭킹":"0","학습평균":"92.82","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.3","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.26","전국총점평균":"113.29","총점상위":"1%","학습포인트":"371.95","출결포인트":"41","전체포인트":"412.95","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"401.58","시간점수":"25.75","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"471.33","상위가점":"20.0","하위감점":"0.0","상하위진도수":"27 / 0 / 0 / 0","총학습수":"18","가감총점":"491.33","평균":"27.3","랭킹":"0","본부랭킹":"0","학습평균":"95.5","전국학습평균":"95.66","학습상위":"1%","시간평균":"6.11","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"120.13","전국총점평균":"113.29","총점상위":"1%","학습포인트":"361.42","출결포인트":"41","전체포인트":"402.42","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-0055918887","회원명":"진시우","생년월일":"2018-06-21","리그명":"B.초1","조명":"01조","학습점수":"411.25","시간점수":"22.88","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"479.13","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"19","가감총점":"489.13","평균":"25.74","랭킹":"5","본부랭킹":"0","학습평균":"101.5","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.33","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.4","전국총점평균":"90.1","총점상위":"1%","학습포인트":"370.12","출결포인트":"41","전체포인트":"411.12","복권이벤트":"-","전국랭킹":"1","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0056203858","회원명":"유지안","생년월일":"2018-06-22","리그명":"B.초1","조명":"01조","학습점수":"380.82","시간점수":"20.88","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"446.7","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"16","가감총점":"456.7","평균":"28.54","랭킹":"1","본부랭킹":"0","학습평균":"98.69","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.57","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.32","전국총점평균":"90.1","총점상위":"1%","학습포인트":"342.74","출결포인트":"41","전체포인트":"383.74","복권이벤트":"-","전국랭킹":"42","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"388.72","시간점수":"22.7","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"456.42","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"16","가감총점":"466.42","평균":"29.15","랭킹":"7","본부랭킹":"0","학습평균":"93.68","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.6","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.31","전국총점평균":"90.1","총점상위":"1%","학습포인트":"349.85","출결포인트":"41","전체포인트":"390.85","복권이벤트":"-","전국랭킹":"31","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"409.92","시간점수":"20.57","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"475.49","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"16","가감총점":"485.49","평균":"30.34","랭킹":"8","본부랭킹":"0","학습평균":"101.65","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.14","전국시간평균":"3.72","시간상위":"2%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.27","전국총점평균":"90.1","총점상위":"1%","학습포인트":"368.93","출결포인트":"41","전체포인트":"409.93","복권이벤트":"-","전국랭킹":"7","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056240381","회원명":"문채아","생년월일":"2019-07-12","리그명":"B.초1","조명":"01조","학습점수":"381.03","시간점수":"21.52","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"446.55","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"16","가감총점":"456.55","평균":"28.53","랭킹":"8","본부랭킹":"0","학습평균":"95.97","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.72","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.18","전국총점평균":"90.1","총점상위":"1%","학습포인트":"342.93","출결포인트":"41","전체포인트":"383.93","복권이벤트":"-","전국랭킹":"43","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"381.44","시간점수":"21.64","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"448.08","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"16","가감총점":"458.08","평균":"28.63","랭킹":"9","본부랭킹":"0","학습평균":"92.63","전국학습평균":"76.15","학습상위":"3%","시간평균":"5.48","전국시간평균":"3.72","시간상위":"4%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"117.64","전국총점평균":"90.1","총점상위":"2%","학습포인트":"343.3","출결포인트":"41","전체포인트":"384.3","복권이벤트":"-","전국랭킹":"47","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"414.01","시간점수":"3.24","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"462.25","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"17","가감총점":"472.25","평균":"27.78","랭킹":"5","본부랭킹":"0","학습평균":"101.84","전국학습평균":"76.15","학습상위":"1%","시간평균":"0.83","전국시간평균":"3.72","시간상위":"99%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"113.49","전국총점평균":"90.1","총점상위":"4%","학습포인트":"372.61","출결포인트":"41","전체포인트":"413.61","복권이벤트":"-","전국랭킹":"179","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"375.95","시간점수":"19.29","출결점수":"40","학습가산점":"1","리셋감점":"0","총점":"436.24","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 16 / 0 / 0","총학습수":"11","가감총점":"446.24","평균":"40.57","랭킹":"8","본부랭킹":"0","학습평균":"92.64","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.76","전국시간평균":"3.72","시간상위":"11%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.95","전국총점평균":"90.1","총점상위":"5%","학습포인트":"338.36","출결포인트":"40","전체포인트":"378.36","복권이벤트":"-","전국랭킹":"109","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"392.59","시간점수":"17.53","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"455.12","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"17","가감총점":"465.12","평균":"27.36","랭킹":"7","본부랭킹":"0","학습평균":"96.35","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.26","전국시간평균":"3.72","시간상위":"34%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.78","전국총점평균":"90.1","총점상위":"5%","학습포인트":"353.33","출결포인트":"41","전체포인트":"394.33","복권이벤트":"-","전국랭킹":"159","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 거제 Hive","센터":"[YC]국산","센터타입":"YC","교사명":"박수정","회원번호":"000S-0056157436","회원명":"정하진","생년월일":"2018-02-16","리그명":"B.초1","조명":"01조","학습점수":"389.79","시간점수":"18.42","출결점수":"40","학습가산점":"3","리셋감점":"0","총점":"451.21","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"16","가감총점":"461.21","평균":"28.83","랭킹":"11","본부랭킹":"0","학습평균":"93.73","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.79","전국시간평균":"3.72","시간상위":"24%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.09","전국총점평균":"90.1","총점상위":"6%","학습포인트":"350.81","출결포인트":"40","전체포인트":"390.81","복권이벤트":"-","전국랭킹":"139","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"370.5","시간점수":"16.67","출결점수":"40","학습가산점":"3","리셋감점":"0","총점":"430.17","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"17","가감총점":"440.17","평균":"25.89","랭킹":"13","본부랭킹":"0","학습평균":"91.81","전국학습평균":"76.15","학습상위":"6%","시간평균":"3.94","전국시간평균":"3.72","시간상위":"41%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.05","전국총점평균":"90.1","총점상위":"6%","학습포인트":"333.45","출결포인트":"40","전체포인트":"373.45","복권이벤트":"-","전국랭킹":"217","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"384.0","시간점수":"18.96","출결점수":"41","학습가산점":"2","리셋감점":"0","총점":"445.96","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"15","가감총점":"455.96","평균":"30.4","랭킹":"16","본부랭킹":"0","학습평균":"94.12","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.6","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"345.6","출결포인트":"41","전체포인트":"386.6","복권이벤트":"-","전국랭킹":"150","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"402.12","시간점수":"12.8","출결점수":"41","학습가산점":"1","리셋감점":"0","총점":"456.92","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 6 / 10 / 0","총학습수":"11","가감총점":"456.92","평균":"41.54","랭킹":"14","본부랭킹":"0","학습평균":"94.99","전국학습평균":"76.15","학습상위":"5%","시간평균":"3.27","전국시간평균":"3.72","시간상위":"63%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.42","전국총점평균":"90.1","총점상위":"6%","학습포인트":"361.91","출결포인트":"41","전체포인트":"402.91","복권이벤트":"-","전국랭킹":"205","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"357.12","시간점수":"15.26","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"417.38","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"17","가감총점":"427.38","평균":"25.14","랭킹":"13","본부랭킹":"0","학습평균":"88.19","전국학습평균":"76.15","학습상위":"7%","시간평균":"3.78","전국시간평균":"3.72","시간상위":"54%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.07","전국총점평균":"90.1","총점상위":"7%","학습포인트":"321.41","출결포인트":"41","전체포인트":"362.41","복권이벤트":"-","전국랭킹":"204","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[LC]서정","센터타입":"LC","교사명":"이진아","회원번호":"000S-0056301847","회원명":"오서연","생년월일":"2019-04-11","리그명":"B.초1","조명":"02조","학습점수":"364.29","시간점수":"19.75","출결점수":"38","학습가산점":"3","리셋감점":"0","총점":"425.04","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 22 / 4 / 0","총학습수":"17","가감총점":"425.04","평균":"25.0","랭킹":"18","본부랭킹":"0","학습평균":"90.29","전국학습평균":"76.15","학습상위":"9%","시간평균":"4.67","전국시간평균":"3.72","시간상위":"22%","출결평균":"9.33","전국출결평균":"8.86","출결상위":"38%","총점평균":"107.5","전국총점평균":"90.1","총점상위":"9%","학습포인트":"327.86","출결포인트":"38","전체포인트":"365.86","복권이벤트":"-","전국랭킹":"217","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"363.73","시간점수":"18.88","출결점수":"41","학습가산점":"2","리셋감점":"0","총점":"425.61","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"15","가감총점":"435.61","평균":"29.04","랭킹":"13","본부랭킹":"0","학습평균":"91.53","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.72","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"327.36","출결포인트":"41","전체포인트":"368.36","복권이벤트":"-","전국랭킹":"181","전국회원수":"2801","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"335.2","시간점수":"14.97","출결점수":"40","학습가산점":"3","리셋감점":"0","총점":"393.17","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 28 / 2 / 0","총학습수":"20","가감총점":"393.17","평균":"19.66","랭킹":"0","본부랭킹":"0","학습평균":"81.04","전국학습평균":"95.66","학습상위":"18%","시간평균":"3.36","전국시간평균":"4.1","시간상위":"52%","출결평균":"9.67","전국출결평균":"10","출결상위":"35%","총점평균":"98.05","전국총점평균":"113.29","총점상위":"22%","학습포인트":"301.68","출결포인트":"40","전체포인트":"341.68","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"334.31","시간점수":"12.68","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"390.99","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"19","가감총점":"390.99","평균":"20.58","랭킹":"0","본부랭킹":"0","학습평균":"80.58","전국학습평균":"95.66","학습상위":"16%","시간평균":"3.3","전국시간평균":"4.1","시간상위":"65%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"99.47","전국총점평균":"113.29","총점상위":"20%","학습포인트":"300.88","출결포인트":"41","전체포인트":"341.88","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"B.초1","조명":"03조","학습점수":"361.01","시간점수":"15.79","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"420.8","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 20 / 4 / 0","총학습수":"16","가감총점":"420.8","평균":"26.3","랭킹":"18","본부랭킹":"0","학습평균":"93.25","전국학습평균":"76.15","학습상위":"12%","시간평균":"3.95","전국시간평균":"3.72","시간상위":"43%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"106.13","전국총점평균":"90.1","총점상위":"10%","학습포인트":"324.91","출결포인트":"41","전체포인트":"365.91","복권이벤트":"-","전국랭킹":"277","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0055847201","회원명":"서준하","생년월일":"2018-09-15","리그명":"B.초1","조명":"02조","학습점수":"368.06","시간점수":"17.36","출결점수":"40","학습가산점":"3","리셋감점":"0","총점":"428.42","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 22 / 2 / 0","총학습수":"16","가감총점":"428.42","평균":"26.78","랭킹":"16","본부랭킹":"0","학습평균":"88.08","전국학습평균":"76.15","학습상위":"8%","시간평균":"4.52","전국시간평균":"3.72","시간상위":"28%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"108.38","전국총점평균":"90.1","총점상위":"8%","학습포인트":"331.25","출결포인트":"40","전체포인트":"371.25","복권이벤트":"-","전국랭킹":"230","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 인천서부 Hive","센터":"[YC]청라","센터타입":"YC","교사명":"한정아","회원번호":"000S-0056314920","회원명":"민지우","생년월일":"2019-01-05","리그명":"B.초1","조명":"04조","학습점수":"353.43","시간점수":"14.7","출결점수":"41","학습가산점":"2","리셋감점":"0","총점":"411.13","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 18 / 6 / 0","총학습수":"16","가감총점":"411.13","평균":"25.7","랭킹":"23","본부랭킹":"0","학습평균":"84.49","전국학습평균":"76.15","학습상위":"13%","시간평균":"3.38","전국시간평균":"3.72","시간상위":"58%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"104.15","전국총점평균":"90.1","총점상위":"12%","학습포인트":"318.09","출결포인트":"41","전체포인트":"359.09","복권이벤트":"-","전국랭킹":"359","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"347.78","시간점수":"13.52","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"405.3","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 30 / 0 / 0","총학습수":"20","가감총점":"405.3","평균":"20.27","랭킹":"0","본부랭킹":"0","학습평균":"88.62","전국학습평균":"95.66","학습상위":"15%","시간평균":"3.28","전국시간평균":"4.1","시간상위":"63%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"101.1","전국총점평균":"113.29","총점상위":"18%","학습포인트":"313.0","출결포인트":"41","전체포인트":"354.0","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"318.6","시간점수":"9.94","출결점수":"41","학습가산점":"2","리셋감점":"0","총점":"371.54","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0 / 18 / 8 / 0","총학습수":"17","가감총점":"341.54","평균":"20.09","랭킹":"0","본부랭킹":"0","학습평균":"76.49","전국학습평균":"95.66","학습상위":"28%","시간평균":"2.54","전국시간평균":"4.1","시간상위":"78%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"89.63","전국총점평균":"113.29","총점상위":"38%","학습포인트":"286.74","출결포인트":"41","전체포인트":"327.74","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"307.16","시간점수":"8.96","출결점수":"37","학습가산점":"1","리셋감점":"0","총점":"354.12","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0 / 16 / 8 / 0","총학습수":"16","가감총점":"324.12","평균":"20.26","랭킹":"0","본부랭킹":"0","학습평균":"77.22","전국학습평균":"95.66","학습상위":"32%","시간평균":"2.33","전국시간평균":"4.1","시간상위":"82%","출결평균":"9","전국출결평균":"10","출결상위":"55%","총점평균":"86.15","전국총점평균":"113.29","총점상위":"45%","학습포인트":"276.44","출결포인트":"37","전체포인트":"313.44","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 제주북부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"강대교","회원번호":"000S-0055371693","회원명":"최수아","생년월일":"2012-11-30","리그명":"-","조명":"-","학습점수":"356.13","시간점수":"12.25","출결점수":"41","학습가산점":"2","리셋감점":"0","총점":"411.38","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 27 / 2 / 0","총학습수":"19","가감총점":"411.38","평균":"21.65","랭킹":"0","본부랭킹":"0","학습평균":"84.13","전국학습평균":"95.66","학습상위":"17%","시간평균":"2.87","전국시간평균":"4.1","시간상위":"70%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"98.62","전국총점평균":"113.29","총점상위":"21%","학습포인트":"320.52","출결포인트":"41","전체포인트":"361.52","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 성남 Hive","센터":"[LC]서현","센터타입":"LC","교사명":"박윤미","회원번호":"000S-0056498271","회원명":"배수현","생년월일":"2019-05-19","리그명":"B.초1","조명":"05조","학습점수":"370.64","시간점수":"15.25","출결점수":"41","학습가산점":"1","리셋감점":"0","총점":"427.89","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 19 / 5 / 0","총학습수":"16","가감총점":"427.89","평균":"26.74","랭킹":"24","본부랭킹":"0","학습평균":"87.35","전국학습평균":"76.15","학습상위":"14%","시간평균":"3.8","전국시간평균":"3.72","시간상위":"46%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"103.62","전국총점평균":"90.1","총점상위":"13%","학습포인트":"333.58","출결포인트":"41","전체포인트":"374.58","복권이벤트":"-","전국랭킹":"289","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 고양 Hive","센터":"[LC]원흥","센터타입":"LC","교사명":"박서연","회원번호":"000S-0056382049","회원명":"이서아","생년월일":"2018-08-22","리그명":"B.초1","조명":"06조","학습점수":"350.5","시간점수":"15.96","출결점수":"40","학습가산점":"3","리셋감점":"0","총점":"409.46","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 20 / 3 / 0","총학습수":"15","가감총점":"409.46","평균":"27.3","랭킹":"19","본부랭킹":"0","학습평균":"89.39","전국학습평균":"76.15","학습상위":"15%","시간평균":"4.18","전국시간평균":"3.72","시간상위":"33%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"102.78","전국총점평균":"90.1","총점상위":"14%","학습포인트":"315.45","출결포인트":"40","전체포인트":"355.45","복권이벤트":"-","전국랭킹":"337","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056412093","회원명":"최하율","생년월일":"2019-09-08","리그명":"B.초1","조명":"01조","학습점수":"357.83","시간점수":"14.34","출결점수":"41","학습가산점":"1","리셋감점":"0","총점":"414.17","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 17 / 7 / 0","총학습수":"16","가감총점":"414.17","평균":"25.89","랭킹":"20","본부랭킹":"0","학습평균":"85.19","전국학습평균":"76.15","학습상위":"15%","시간평균":"3.39","전국시간평균":"3.72","시간상위":"52%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"100.57","전국총점평균":"90.1","총점상위":"15%","학습포인트":"322.05","출결포인트":"41","전체포인트":"363.05","복권이벤트":"-","전국랭킹":"415","전국회원수":"2801","최종랭킹":""}],
  "5":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"438.91","시간점수":"11.02","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"504.93","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 32 / 0 / 0","총학습수":"27","가감총점":"514.93","평균":"19.07","랭킹":"0","본부랭킹":"0","학습평균":"86.46","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.35","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"105.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"395.02","출결포인트":"50","전체포인트":"445.02","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"480.92","시간점수":"12.93","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"548.85","상위가점":"20.0","하위감점":"0.0","상하위진도수":"25 / 0 / 0 / 0","총학습수":"21","가감총점":"568.85","평균":"27.09","랭킹":"0","본부랭킹":"0","학습평균":"98.06","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.6","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"116.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"432.83","출결포인트":"50","전체포인트":"482.83","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0055176248","회원명":"남태식","생년월일":"2016-08-23","리그명":"-","조명":"-","학습점수":"486.28","시간점수":"24.04","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"565.32","상위가점":"20.0","하위감점":"0.0","상하위진도수":"30 / 0 / 0 / 0","총학습수":"25","가감총점":"585.32","평균":"23.41","랭킹":"0","본부랭킹":"0","학습평균":"96.51","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.75","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"119.25","전국총점평균":"113.29","총점상위":"1%","학습포인트":"437.65","출결포인트":"50","전체포인트":"487.65","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-0055502112","회원명":"김세혁","생년월일":"2012-02-19","리그명":"-","조명":"-","학습점수":"416.13","시간점수":"19.55","출결점수":"50","학습가산점":"4","리셋감점":"0","총점":"489.68","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 31 / 0 / 0","총학습수":"26","가감총점":"499.68","평균":"19.22","랭킹":"0","본부랭킹":"0","학습평균":"76.36","전국학습평균":"95.66","학습상위":"1%","시간평균":"3.7","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"96.56","전국총점평균":"113.29","총점상위":"1%","학습포인트":"374.52","출결포인트":"50","전체포인트":"424.52","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대구강북 교육국","센터":"[LC]동변","센터타입":"LC","교사명":"김현자","회원번호":"000S-0055585708","회원명":"남동연","생년월일":"2016-06-03","리그명":"-","조명":"-","학습점수":"497.06","시간점수":"22.21","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"574.27","상위가점":"20.0","하위감점":"0.0","상하위진도수":"24 / 0 / 0 / 0","총학습수":"20","가감총점":"594.27","평균":"29.71","랭킹":"0","본부랭킹":"0","학습평균":"99.78","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.09","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.06","전국총점평균":"113.29","총점상위":"1%","학습포인트":"447.35","출결포인트":"50","전체포인트":"497.35","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"-","조명":"-","학습점수":"485.55","시간점수":"23.77","출결점수":"50","학습가산점":"4","리셋감점":"0","총점":"563.32","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 27 / 0 / 0","총학습수":"22","가감총점":"573.32","평균":"26.06","랭킹":"0","본부랭킹":"0","학습평균":"93.57","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.41","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.26","전국총점평균":"113.29","총점상위":"1%","학습포인트":"437.0","출결포인트":"50","전체포인트":"487.0","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"478.75","시간점수":"27.6","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"559.35","상위가점":"20.0","하위감점":"0.0","상하위진도수":"27 / 0 / 0 / 0","총학습수":"22","가감총점":"579.35","평균":"26.33","랭킹":"0","본부랭킹":"0","학습평균":"96.51","전국학습평균":"95.66","학습상위":"1%","시간평균":"6.06","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"120.13","전국총점평균":"113.29","총점상위":"1%","학습포인트":"430.88","출결포인트":"50","전체포인트":"480.88","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-0055918887","회원명":"진시우","생년월일":"2018-06-21","리그명":"B.초1","조명":"01조","학습점수":"489.56","시간점수":"26.8","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"571.36","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"24","가감총점":"581.36","평균":"24.22","랭킹":"4","본부랭킹":"0","학습평균":"99.03","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.55","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.4","전국총점평균":"90.1","총점상위":"1%","학습포인트":"440.6","출결포인트":"50","전체포인트":"490.6","복권이벤트":"-","전국랭킹":"13","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0056203858","회원명":"유지안","생년월일":"2018-06-22","리그명":"B.초1","조명":"01조","학습점수":"509.37","시간점수":"29.37","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"593.74","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"20","가감총점":"603.74","평균":"30.19","랭킹":"6","본부랭킹":"0","학습평균":"98.25","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.66","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.32","전국총점평균":"90.1","총점상위":"1%","학습포인트":"458.43","출결포인트":"50","전체포인트":"508.43","복권이벤트":"-","전국랭킹":"83","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"521.68","시간점수":"27.21","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"603.89","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"20","가감총점":"613.89","평균":"30.69","랭킹":"5","본부랭킹":"0","학습평균":"98.48","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.85","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.31","전국총점평균":"90.1","총점상위":"1%","학습포인트":"469.51","출결포인트":"50","전체포인트":"519.51","복권이벤트":"-","전국랭킹":"12","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"516.33","시간점수":"25.53","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"596.86","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"20","가감총점":"606.86","평균":"30.34","랭킹":"3","본부랭킹":"0","학습평균":"95.08","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.68","전국시간평균":"3.72","시간상위":"2%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.27","전국총점평균":"90.1","총점상위":"1%","학습포인트":"464.7","출결포인트":"50","전체포인트":"514.7","복권이벤트":"-","전국랭킹":"88","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056240381","회원명":"문채아","생년월일":"2019-07-12","리그명":"B.초1","조명":"01조","학습점수":"503.46","시간점수":"26.8","출결점수":"50","학습가산점":"4","리셋감점":"0","총점":"584.26","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"20","가감총점":"594.26","평균":"29.71","랭킹":"3","본부랭킹":"0","학습평균":"98.89","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.71","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.18","전국총점평균":"90.1","총점상위":"1%","학습포인트":"453.11","출결포인트":"50","전체포인트":"503.11","복권이벤트":"-","전국랭킹":"54","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"519.96","시간점수":"26.29","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"601.25","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"20","가감총점":"611.25","평균":"30.56","랭킹":"7","본부랭킹":"0","학습평균":"92.41","전국학습평균":"76.15","학습상위":"3%","시간평균":"4.88","전국시간평균":"3.72","시간상위":"4%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"117.64","전국총점평균":"90.1","총점상위":"2%","학습포인트":"467.96","출결포인트":"50","전체포인트":"517.96","복권이벤트":"-","전국랭킹":"72","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"496.6","시간점수":"3.88","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"555.48","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"22","가감총점":"565.48","평균":"25.7","랭킹":"7","본부랭킹":"0","학습평균":"92.91","전국학습평균":"76.15","학습상위":"1%","시간평균":"0.86","전국시간평균":"3.72","시간상위":"99%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"113.49","전국총점평균":"90.1","총점상위":"4%","학습포인트":"446.94","출결포인트":"50","전체포인트":"496.94","복권이벤트":"-","전국랭킹":"81","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"493.26","시간점수":"24.66","출결점수":"49","학습가산점":"1","리셋감점":"0","총점":"567.92","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 16 / 0 / 0","총학습수":"13","가감총점":"577.92","평균":"44.46","랭킹":"6","본부랭킹":"0","학습평균":"94.23","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.7","전국시간평균":"3.72","시간상위":"11%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.95","전국총점평균":"90.1","총점상위":"5%","학습포인트":"443.93","출결포인트":"49","전체포인트":"492.93","복권이벤트":"-","전국랭킹":"198","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"452.37","시간점수":"21.7","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"529.07","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"21","가감총점":"539.07","평균":"25.67","랭킹":"10","본부랭킹":"0","학습평균":"93.42","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.44","전국시간평균":"3.72","시간상위":"34%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.78","전국총점평균":"90.1","총점상위":"5%","학습포인트":"407.13","출결포인트":"50","전체포인트":"457.13","복권이벤트":"-","전국랭킹":"170","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 거제 Hive","센터":"[YC]국산","센터타입":"YC","교사명":"박수정","회원번호":"000S-0056157436","회원명":"정하진","생년월일":"2018-02-16","리그명":"B.초1","조명":"01조","학습점수":"456.71","시간점수":"22.61","출결점수":"49","학습가산점":"4","리셋감점":"0","총점":"532.32","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"20","가감총점":"542.32","평균":"27.12","랭킹":"13","본부랭킹":"0","학습평균":"91.44","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.18","전국시간평균":"3.72","시간상위":"24%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.09","전국총점평균":"90.1","총점상위":"6%","학습포인트":"411.04","출결포인트":"49","전체포인트":"460.04","복권이벤트":"-","전국랭킹":"221","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"466.82","시간점수":"19.38","출결점수":"49","학습가산점":"4","리셋감점":"0","총점":"539.2","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"21","가감총점":"549.2","평균":"26.15","랭킹":"14","본부랭킹":"0","학습평균":"95.36","전국학습평균":"76.15","학습상위":"6%","시간평균":"3.87","전국시간평균":"3.72","시간상위":"41%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.05","전국총점평균":"90.1","총점상위":"6%","학습포인트":"420.14","출결포인트":"49","전체포인트":"469.14","복권이벤트":"-","전국랭킹":"131","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"478.24","시간점수":"23.78","출결점수":"50","학습가산점":"2","리셋감점":"0","총점":"554.02","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"19","가감총점":"564.02","평균":"29.69","랭킹":"13","본부랭킹":"0","학습평균":"93.46","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.56","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"430.42","출결포인트":"50","전체포인트":"480.42","복권이벤트":"-","전국랭킹":"223","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"464.22","시간점수":"16.02","출결점수":"50","학습가산점":"1","리셋감점":"0","총점":"531.24","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 6 / 10 / 0","총학습수":"13","가감총점":"531.24","평균":"40.86","랭킹":"11","본부랭킹":"0","학습평균":"93.0","전국학습평균":"76.15","학습상위":"5%","시간평균":"3.34","전국시간평균":"3.72","시간상위":"63%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.42","전국총점평균":"90.1","총점상위":"6%","학습포인트":"417.8","출결포인트":"50","전체포인트":"467.8","복권이벤트":"-","전국랭킹":"231","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"491.34","시간점수":"18.53","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"564.87","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"22","가감총점":"574.87","평균":"26.13","랭킹":"16","본부랭킹":"0","학습평균":"90.08","전국학습평균":"76.15","학습상위":"7%","시간평균":"3.44","전국시간평균":"3.72","시간상위":"54%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.07","전국총점평균":"90.1","총점상위":"7%","학습포인트":"442.21","출결포인트":"50","전체포인트":"492.21","복권이벤트":"-","전국랭킹":"201","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[LC]서정","센터타입":"LC","교사명":"이진아","회원번호":"000S-0056301847","회원명":"오서연","생년월일":"2019-04-11","리그명":"B.초1","조명":"02조","학습점수":"456.35","시간점수":"24.24","출결점수":"47","학습가산점":"4","리셋감점":"0","총점":"531.59","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 22 / 4 / 0","총학습수":"22","가감총점":"531.59","평균":"24.16","랭킹":"18","본부랭킹":"0","학습평균":"92.18","전국학습평균":"76.15","학습상위":"9%","시간평균":"4.45","전국시간평균":"3.72","시간상위":"22%","출결평균":"9.33","전국출결평균":"8.86","출결상위":"38%","총점평균":"107.5","전국총점평균":"90.1","총점상위":"9%","학습포인트":"410.72","출결포인트":"47","전체포인트":"457.72","복권이벤트":"-","전국랭킹":"238","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"471.47","시간점수":"26.2","출결점수":"50","학습가산점":"2","리셋감점":"0","총점":"549.67","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"19","가감총점":"559.67","평균":"29.46","랭킹":"13","본부랭킹":"0","학습평균":"90.87","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.56","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"424.32","출결포인트":"50","전체포인트":"474.32","복권이벤트":"-","전국랭킹":"208","전국회원수":"2801","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"425.46","시간점수":"18.95","출결점수":"49","학습가산점":"3","리셋감점":"0","총점":"496.41","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 28 / 2 / 0","총학습수":"25","가감총점":"496.41","평균":"19.86","랭킹":"0","본부랭킹":"0","학습평균":"83.24","전국학습평균":"95.66","학습상위":"18%","시간평균":"3.52","전국시간평균":"4.1","시간상위":"52%","출결평균":"9.67","전국출결평균":"10","출결상위":"35%","총점평균":"98.05","전국총점평균":"113.29","총점상위":"22%","학습포인트":"382.91","출결포인트":"49","전체포인트":"431.91","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"405.92","시간점수":"15.86","출결점수":"50","학습가산점":"4","리셋감점":"0","총점":"475.78","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"24","가감총점":"475.78","평균":"19.82","랭킹":"0","본부랭킹":"0","학습평균":"80.42","전국학습평균":"95.66","학습상위":"16%","시간평균":"3.39","전국시간평균":"4.1","시간상위":"65%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"99.47","전국총점평균":"113.29","총점상위":"20%","학습포인트":"365.33","출결포인트":"50","전체포인트":"415.33","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"B.초1","조명":"03조","학습점수":"439.58","시간점수":"20.93","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"513.51","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 20 / 4 / 0","총학습수":"20","가감총점":"513.51","평균":"25.68","랭킹":"21","본부랭킹":"0","학습평균":"85.54","전국학습평균":"76.15","학습상위":"12%","시간평균":"4.18","전국시간평균":"3.72","시간상위":"43%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"106.13","전국총점평균":"90.1","총점상위":"10%","학습포인트":"395.62","출결포인트":"50","전체포인트":"445.62","복권이벤트":"-","전국랭킹":"329","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0055847201","회원명":"서준하","생년월일":"2018-09-15","리그명":"B.초1","조명":"02조","학습점수":"457.28","시간점수":"22.55","출결점수":"49","학습가산점":"4","리셋감점":"0","총점":"532.83","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 22 / 2 / 0","총학습수":"20","가감총점":"532.83","평균":"26.64","랭킹":"17","본부랭킹":"0","학습평균":"90.43","전국학습평균":"76.15","학습상위":"8%","시간평균":"4.35","전국시간평균":"3.72","시간상위":"28%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"108.38","전국총점평균":"90.1","총점상위":"8%","학습포인트":"411.55","출결포인트":"49","전체포인트":"460.55","복권이벤트":"-","전국랭킹":"304","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 인천서부 Hive","센터":"[YC]청라","센터타입":"YC","교사명":"한정아","회원번호":"000S-0056314920","회원명":"민지우","생년월일":"2019-01-05","리그명":"B.초1","조명":"04조","학습점수":"448.14","시간점수":"16.74","출결점수":"50","학습가산점":"2","리셋감점":"0","총점":"516.88","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 18 / 6 / 0","총학습수":"20","가감총점":"516.88","평균":"25.84","랭킹":"18","본부랭킹":"0","학습평균":"87.39","전국학습평균":"76.15","학습상위":"13%","시간평균":"3.75","전국시간평균":"3.72","시간상위":"58%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"104.15","전국총점평균":"90.1","총점상위":"12%","학습포인트":"403.33","출결포인트":"50","전체포인트":"453.33","복권이벤트":"-","전국랭킹":"347","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"451.27","시간점수":"15.77","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"520.04","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 30 / 0 / 0","총학습수":"25","가감총점":"520.04","평균":"20.8","랭킹":"0","본부랭킹":"0","학습평균":"86.99","전국학습평균":"95.66","학습상위":"15%","시간평균":"3.22","전국시간평균":"4.1","시간상위":"63%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"101.1","전국총점평균":"113.29","총점상위":"18%","학습포인트":"406.14","출결포인트":"50","전체포인트":"456.14","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"424.76","시간점수":"13.26","출결점수":"50","학습가산점":"2","리셋감점":"0","총점":"490.02","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0 / 18 / 8 / 0","총학습수":"22","가감총점":"460.02","평균":"20.91","랭킹":"0","본부랭킹":"0","학습평균":"81.59","전국학습평균":"95.66","학습상위":"28%","시간평균":"2.56","전국시간평균":"4.1","시간상위":"78%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"89.63","전국총점평균":"113.29","총점상위":"38%","학습포인트":"382.28","출결포인트":"50","전체포인트":"432.28","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"388.68","시간점수":"12.27","출결점수":"45","학습가산점":"2","리셋감점":"0","총점":"447.95","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0 / 16 / 8 / 0","총학습수":"20","가감총점":"417.95","평균":"20.9","랭킹":"0","본부랭킹":"0","학습평균":"80.91","전국학습평균":"95.66","학습상위":"32%","시간평균":"2.41","전국시간평균":"4.1","시간상위":"82%","출결평균":"9","전국출결평균":"10","출결상위":"55%","총점평균":"86.15","전국총점평균":"113.29","총점상위":"45%","학습포인트":"349.81","출결포인트":"45","전체포인트":"394.81","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 제주북부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"강대교","회원번호":"000S-0055371693","회원명":"최수아","생년월일":"2012-11-30","리그명":"-","조명":"-","학습점수":"410.07","시간점수":"15.28","출결점수":"50","학습가산점":"2","리셋감점":"0","총점":"477.35","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 27 / 2 / 0","총학습수":"24","가감총점":"477.35","평균":"19.89","랭킹":"0","본부랭킹":"0","학습평균":"81.13","전국학습평균":"95.66","학습상위":"17%","시간평균":"3.07","전국시간평균":"4.1","시간상위":"70%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"98.62","전국총점평균":"113.29","총점상위":"21%","학습포인트":"369.06","출결포인트":"50","전체포인트":"419.06","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 성남 Hive","센터":"[LC]서현","센터타입":"LC","교사명":"박윤미","회원번호":"000S-0056498271","회원명":"배수현","생년월일":"2019-05-19","리그명":"B.초1","조명":"05조","학습점수":"448.77","시간점수":"18.96","출결점수":"50","학습가산점":"2","리셋감점":"0","총점":"519.73","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 19 / 5 / 0","총학습수":"20","가감총점":"519.73","평균":"25.99","랭킹":"20","본부랭킹":"0","학습평균":"90.99","전국학습평균":"76.15","학습상위":"14%","시간평균":"3.67","전국시간평균":"3.72","시간상위":"46%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"103.62","전국총점평균":"90.1","총점상위":"13%","학습포인트":"403.89","출결포인트":"50","전체포인트":"453.89","복권이벤트":"-","전국랭킹":"312","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 고양 Hive","센터":"[LC]원흥","센터타입":"LC","교사명":"박서연","회원번호":"000S-0056382049","회원명":"이서아","생년월일":"2018-08-22","리그명":"B.초1","조명":"06조","학습점수":"435.59","시간점수":"22.11","출결점수":"49","학습가산점":"3","리셋감점":"0","총점":"509.7","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 20 / 3 / 0","총학습수":"19","가감총점":"509.7","평균":"26.83","랭킹":"22","본부랭킹":"0","학습평균":"83.9","전국학습평균":"76.15","학습상위":"15%","시간평균":"4.18","전국시간평균":"3.72","시간상위":"33%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"102.78","전국총점평균":"90.1","총점상위":"14%","학습포인트":"392.03","출결포인트":"49","전체포인트":"441.03","복권이벤트":"-","전국랭킹":"310","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056412093","회원명":"최하율","생년월일":"2019-09-08","리그명":"B.초1","조명":"01조","학습점수":"451.25","시간점수":"17.87","출결점수":"50","학습가산점":"1","리셋감점":"0","총점":"520.12","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0 / 17 / 7 / 0","총학습수":"20","가감총점":"520.12","평균":"26.01","랭킹":"25","본부랭킹":"0","학습평균":"86.85","전국학습평균":"76.15","학습상위":"15%","시간평균":"3.91","전국시간평균":"3.72","시간상위":"52%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"100.57","전국총점평균":"90.1","총점상위":"15%","학습포인트":"406.12","출결포인트":"50","전체포인트":"456.12","복권이벤트":"-","전국랭킹":"443","전국회원수":"2801","최종랭킹":""}],
  "6":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"545.84","시간점수":"13.43","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"625.27","상위가점":"10","하위감점":"0","상하위진도수":"0 / 32 / 0 / 0","총학습수":"32","가감총점":"635.27","평균":"105.88","랭킹":"0","본부랭킹":"0","학습평균":"90.97","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.24","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"105.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"545.84","출결포인트":"60","전체포인트":"605.84","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"600","시간점수":"15.29","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"681.29","상위가점":"20","하위감점":"0","상하위진도수":"25 / 0 / 0 / 0","총학습수":"25","가감총점":"701.29","평균":"116.88","랭킹":"0","본부랭킹":"0","학습평균":"100","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.55","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"116.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0055176248","회원명":"남태식","생년월일":"2016-08-23","리그명":"-","조명":"-","학습점수":"600","시간점수":"29.49","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"695.49","상위가점":"20","하위감점":"0","상하위진도수":"30 / 0 / 0 / 0","총학습수":"30","가감총점":"715.49","평균":"119.25","랭킹":"0","본부랭킹":"0","학습평균":"100","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.92","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"119.25","전국총점평균":"113.29","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-0055502112","회원명":"김세혁","생년월일":"2012-02-19","리그명":"-","조명":"-","학습점수":"482","시간점수":"22.37","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"569.37","상위가점":"10","하위감점":"0","상하위진도수":"0 / 31 / 0 / 0","총학습수":"31","가감총점":"579.37","평균":"96.56","랭킹":"0","본부랭킹":"0","학습평균":"80.33","전국학습평균":"95.66","학습상위":"1%","시간평균":"3.73","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"96.56","전국총점평균":"113.29","총점상위":"1%","학습포인트":"482","출결포인트":"60","전체포인트":"542","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대구강북 교육국","센터":"[LC]동변","센터타입":"LC","교사명":"김현자","회원번호":"000S-0055585708","회원명":"남동연","생년월일":"2016-06-03","리그명":"-","조명":"-","학습점수":"590","시간점수":"26.36","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"682.36","상위가점":"20","하위감점":"0","상하위진도수":"24 / 0 / 0 / 0","총학습수":"24","가감총점":"702.36","평균":"117.06","랭킹":"0","본부랭킹":"0","학습평균":"98.33","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.39","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.06","전국총점평균":"113.29","총점상위":"1%","학습포인트":"590","출결포인트":"60","전체포인트":"650","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"-","조명":"-","학습점수":"600","시간점수":"28.55","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"693.55","상위가점":"10","하위감점":"0","상하위진도수":"0 / 27 / 0 / 0","총학습수":"27","가감총점":"703.55","평균":"117.26","랭킹":"0","본부랭킹":"0","학습평균":"100","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.76","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.26","전국총점평균":"113.29","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"600","시간점수":"36.78","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"700.78","상위가점":"20","하위감점":"0","상하위진도수":"27 / 0 / 0 / 0","총학습수":"27","가감총점":"720.78","평균":"120.13","랭킹":"0","본부랭킹":"0","학습평균":"100","전국학습평균":"95.66","학습상위":"1%","시간평균":"6.13","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"120.13","전국총점평균":"113.29","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-0055918887","회원명":"진시우","생년월일":"2018-06-21","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"34.4","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"700.4","상위가점":"10","하위감점":"0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"29","가감총점":"710.4","평균":"118.4","랭킹":"1","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.73","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.4","전국총점평균":"90.1","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"7","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0056203858","회원명":"유지안","생년월일":"2018-06-22","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"33.94","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"699.94","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"709.94","평균":"118.32","랭킹":"2","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.66","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.32","전국총점평균":"90.1","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"12","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"33.88","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"699.88","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"709.88","평균":"118.31","랭킹":"3","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.65","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.31","전국총점평균":"90.1","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"14","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"33.64","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"699.64","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"709.64","평균":"118.27","랭킹":"4","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.61","전국시간평균":"3.72","시간상위":"2%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.27","전국총점평균":"90.1","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"17","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056240381","회원명":"문채아","생년월일":"2019-07-12","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"34.09","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"699.09","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"709.09","평균":"118.18","랭킹":"5","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.68","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.18","전국총점평균":"90.1","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"25","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"597.5","시간점수":"32.35","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"695.85","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"705.85","평균":"117.64","랭킹":"6","본부랭킹":"0","학습평균":"99.58","전국학습평균":"76.15","학습상위":"3%","시간평균":"5.39","전국시간평균":"3.72","시간상위":"4%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"117.64","전국총점평균":"90.1","총점상위":"2%","학습포인트":"597.5","출결포인트":"60","전체포인트":"657.5","복권이벤트":"-","전국랭킹":"46","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"4.91","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"670.91","상위가점":"10","하위감점":"0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"26","가감총점":"680.91","평균":"113.49","랭킹":"7","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"0.82","전국시간평균":"3.72","시간상위":"99%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"113.49","전국총점평균":"90.1","총점상위":"4%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"108","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"572.67","시간점수":"30","출결점수":"58","학습가산점":"1","리셋감점":"0","총점":"661.67","상위가점":"10","하위감점":"0","상하위진도수":"0 / 16 / 0 / 0","총학습수":"16","가감총점":"671.67","평균":"111.95","랭킹":"8","본부랭킹":"0","학습평균":"95.45","전국학습평균":"76.15","학습상위":"6%","시간평균":"5","전국시간평균":"3.72","시간상위":"11%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.95","전국총점평균":"90.1","총점상위":"5%","학습포인트":"472.67","출결포인트":"50","전체포인트":"522.67","복권이벤트":"-","전국랭킹":"131","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"569","시간점수":"25.69","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"660.69","상위가점":"10","하위감점":"0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"25","가감총점":"670.69","평균":"111.78","랭킹":"9","본부랭킹":"0","학습평균":"94.83","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.28","전국시간평균":"3.72","시간상위":"34%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.78","전국총점평균":"90.1","총점상위":"5%","학습포인트":"569","출결포인트":"60","전체포인트":"629","복권이벤트":"-","전국랭킹":"134","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 거제 Hive","센터":"[YC]국산","센터타입":"YC","교사명":"박수정","회원번호":"000S-0056157436","회원명":"정하진","생년월일":"2018-02-16","리그명":"B.초1","조명":"01조","학습점수":"566.08","시간점수":"27.47","출결점수":"58","학습가산점":"5","리셋감점":"0","총점":"656.55","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"666.55","평균":"111.09","랭킹":"10","본부랭킹":"0","학습평균":"94.35","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.58","전국시간평균":"3.72","시간상위":"24%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.09","전국총점평균":"90.1","총점상위":"6%","학습포인트":"471.08","출결포인트":"50","전체포인트":"521.08","복권이벤트":"-","전국랭킹":"147","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"568.83","시간점수":"24.48","출결점수":"58","학습가산점":"5","리셋감점":"0","총점":"656.31","상위가점":"10","하위감점":"0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"25","가감총점":"666.31","평균":"111.05","랭킹":"11","본부랭킹":"0","학습평균":"94.81","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.08","전국시간평균":"3.72","시간상위":"41%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.05","전국총점평균":"90.1","총점상위":"6%","학습포인트":"468.83","출결포인트":"50","전체포인트":"518.83","복권이벤트":"-","전국랭킹":"148","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"562.99","시간점수":"30.25","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"656.24","상위가점":"10","하위감점":"0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"23","가감총점":"666.24","평균":"111.04","랭킹":"12","본부랭킹":"0","학습평균":"93.83","전국학습평균":"76.15","학습상위":"7%","시간평균":"5.04","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"562.99","출결포인트":"60","전체포인트":"622.99","복권이벤트":"-","전국랭킹":"149","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"581","시간점수":"20.5","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"662.5","상위가점":"0","하위감점":"0","상하위진도수":"0 / 6 / 10 / 0","총학습수":"16","가감총점":"662.5","평균":"110.42","랭킹":"13","본부랭킹":"0","학습평균":"96.83","전국학습평균":"76.15","학습상위":"5%","시간평균":"3.42","전국시간평균":"3.72","시간상위":"63%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.42","전국총점평균":"90.1","총점상위":"6%","학습포인트":"581","출결포인트":"60","전체포인트":"641","복권이벤트":"-","전국랭킹":"163","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"562.17","시간점수":"22.27","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"650.44","상위가점":"10","하위감점":"0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"26","가감총점":"660.44","평균":"110.07","랭킹":"14","본부랭킹":"0","학습평균":"93.7","전국학습평균":"76.15","학습상위":"7%","시간평균":"3.71","전국시간평균":"3.72","시간상위":"54%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.07","전국총점평균":"90.1","총점상위":"7%","학습포인트":"562.17","출결포인트":"60","전체포인트":"622.17","복권이벤트":"-","전국랭킹":"172","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[LC]서정","센터타입":"LC","교사명":"이진아","회원번호":"000S-0056301847","회원명":"오서연","생년월일":"2019-04-11","리그명":"B.초1","조명":"02조","학습점수":"555.3","시간점수":"28.7","출결점수":"56","학습가산점":"5","리셋감점":"0","총점":"645.0","상위가점":"0","하위감점":"0","상하위진도수":"0 / 22 / 4 / 0","총학습수":"26","가감총점":"645.0","평균":"107.5","랭킹":"15","본부랭킹":"0","학습평균":"92.55","전국학습평균":"76.15","학습상위":"9%","시간평균":"4.78","전국시간평균":"3.72","시간상위":"22%","출결평균":"9.33","전국출결평균":"8.86","출결상위":"38%","총점평균":"107.5","전국총점평균":"90.1","총점상위":"9%","학습포인트":"455.3","출결포인트":"50","전체포인트":"505.3","복권이벤트":"-","전국랭킹":"212","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"562.99","시간점수":"30.25","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"656.24","상위가점":"10","하위감점":"0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"23","가감총점":"666.24","평균":"111.04","랭킹":"12","본부랭킹":"0","학습평균":"93.83","전국학습평균":"76.15","학습상위":"7%","시간평균":"5.04","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"562.99","출결포인트":"60","전체포인트":"622.99","복권이벤트":"-","전국랭킹":"149","전국회원수":"2801","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"504","시간점수":"22.3","출결점수":"58","학습가산점":"4","리셋감점":"0","총점":"588.3","상위가점":"0","하위감점":"0","상하위진도수":"0 / 28 / 2 / 0","총학습수":"30","가감총점":"588.3","평균":"98.05","랭킹":"0","본부랭킹":"0","학습평균":"84","전국학습평균":"95.66","학습상위":"18%","시간평균":"3.72","전국시간평균":"4.1","시간상위":"52%","출결평균":"9.67","전국출결평균":"10","출결상위":"35%","총점평균":"98.05","전국총점평균":"113.29","총점상위":"22%","학습포인트":"504","출결포인트":"50","전체포인트":"554","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"512","시간점수":"19.8","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"596.8","상위가점":"0","하위감점":"0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"29","가감총점":"596.8","평균":"99.47","랭킹":"0","본부랭킹":"0","학습평균":"85.33","전국학습평균":"95.66","학습상위":"16%","시간평균":"3.3","전국시간평균":"4.1","시간상위":"65%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"99.47","전국총점평균":"113.29","총점상위":"20%","학습포인트":"512","출결포인트":"60","전체포인트":"572","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"B.초1","조명":"03조","학습점수":"548.7","시간점수":"24.1","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"636.8","상위가점":"0","하위감점":"0","상하위진도수":"0 / 20 / 4 / 0","총학습수":"24","가감총점":"636.8","평균":"106.13","랭킹":"18","본부랭킹":"0","학습평균":"91.45","전국학습평균":"76.15","학습상위":"12%","시간평균":"4.02","전국시간평균":"3.72","시간상위":"43%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"106.13","전국총점평균":"90.1","총점상위":"10%","학습포인트":"548.7","출결포인트":"60","전체포인트":"608.7","복권이벤트":"-","전국랭킹":"253","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0055847201","회원명":"서준하","생년월일":"2018-09-15","리그명":"B.초1","조명":"02조","학습점수":"560.4","시간점수":"26.9","출결점수":"58","학습가산점":"5","리셋감점":"0","총점":"650.3","상위가점":"0","하위감점":"0","상하위진도수":"0 / 22 / 2 / 0","총학습수":"24","가감총점":"650.3","평균":"108.38","랭킹":"16","본부랭킹":"0","학습평균":"93.4","전국학습평균":"76.15","학습상위":"8%","시간평균":"4.48","전국시간평균":"3.72","시간상위":"28%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"108.38","전국총점평균":"90.1","총점상위":"8%","학습포인트":"460.4","출결포인트":"50","전체포인트":"510.4","복권이벤트":"-","전국랭킹":"228","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 인천서부 Hive","센터":"[YC]청라","센터타입":"YC","교사명":"한정아","회원번호":"000S-0056314920","회원명":"민지우","생년월일":"2019-01-05","리그명":"B.초1","조명":"04조","학습점수":"540.1","시간점수":"21.8","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"624.9","상위가점":"0","하위감점":"0","상하위진도수":"0 / 18 / 6 / 0","총학습수":"24","가감총점":"624.9","평균":"104.15","랭킹":"19","본부랭킹":"0","학습평균":"90.02","전국학습평균":"76.15","학습상위":"13%","시간평균":"3.63","전국시간평균":"3.72","시간상위":"58%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"104.15","전국총점평균":"90.1","총점상위":"12%","학습포인트":"540.1","출결포인트":"60","전체포인트":"600.1","복권이벤트":"-","전국랭킹":"301","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"522.5","시간점수":"20.1","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"606.6","상위가점":"0","하위감점":"0","상하위진도수":"0 / 30 / 0 / 0","총학습수":"30","가감총점":"606.6","평균":"101.1","랭킹":"0","본부랭킹":"0","학습평균":"87.08","전국학습평균":"95.66","학습상위":"15%","시간평균":"3.35","전국시간평균":"4.1","시간상위":"63%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"101.1","전국총점평균":"113.29","총점상위":"18%","학습포인트":"522.5","출결포인트":"60","전체포인트":"582.5","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"488.5","시간점수":"16.3","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"567.8","상위가점":"0","하위감점":"-30","상하위진도수":"0 / 18 / 8 / 0","총학습수":"26","가감총점":"537.8","평균":"89.63","랭킹":"0","본부랭킹":"0","학습평균":"81.42","전국학습평균":"95.66","학습상위":"28%","시간평균":"2.72","전국시간평균":"4.1","시간상위":"78%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"89.63","전국총점평균":"113.29","총점상위":"38%","학습포인트":"488.5","출결포인트":"60","전체포인트":"548.5","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"476","시간점수":"14.9","출결점수":"54","학습가산점":"2","리셋감점":"0","총점":"546.9","상위가점":"0","하위감점":"-30","상하위진도수":"0 / 16 / 8 / 0","총학습수":"24","가감총점":"516.9","평균":"86.15","랭킹":"0","본부랭킹":"0","학습평균":"79.33","전국학습평균":"95.66","학습상위":"32%","시간평균":"2.48","전국시간평균":"4.1","시간상위":"82%","출결평균":"9","전국출결평균":"10","출결상위":"55%","총점평균":"86.15","전국총점평균":"113.29","총점상위":"45%","학습포인트":"476","출결포인트":"50","전체포인트":"526","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 제주북부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"강대교","회원번호":"000S-0055371693","회원명":"최수아","생년월일":"2012-11-30","리그명":"-","조명":"-","학습점수":"510","시간점수":"18.7","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"591.7","상위가점":"0","하위감점":"0","상하위진도수":"0 / 27 / 2 / 0","총학습수":"29","가감총점":"591.7","평균":"98.62","랭킹":"0","본부랭킹":"0","학습평균":"85","전국학습평균":"95.66","학습상위":"17%","시간평균":"3.12","전국시간평균":"4.1","시간상위":"70%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"98.62","전국총점평균":"113.29","총점상위":"21%","학습포인트":"510","출결포인트":"60","전체포인트":"570","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 성남 Hive","센터":"[LC]서현","센터타입":"LC","교사명":"박윤미","회원번호":"000S-0056498271","회원명":"배수현","생년월일":"2019-05-19","리그명":"B.초1","조명":"05조","학습점수":"536.2","시간점수":"23.5","출결점수":"60","학습가산점":"2","리셋감점":"0","총점":"621.7","상위가점":"0","하위감점":"0","상하위진도수":"0 / 19 / 5 / 0","총학습수":"24","가감총점":"621.7","평균":"103.62","랭킹":"20","본부랭킹":"0","학습평균":"89.37","전국학습평균":"76.15","학습상위":"14%","시간평균":"3.92","전국시간평균":"3.72","시간상위":"46%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"103.62","전국총점평균":"90.1","총점상위":"13%","학습포인트":"536.2","출결포인트":"60","전체포인트":"596.2","복권이벤트":"-","전국랭킹":"318","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 고양 Hive","센터":"[LC]원흥","센터타입":"LC","교사명":"박서연","회원번호":"000S-0056382049","회원명":"이서아","생년월일":"2018-08-22","리그명":"B.초1","조명":"06조","학습점수":"528.9","시간점수":"25.8","출결점수":"58","학습가산점":"4","리셋감점":"0","총점":"616.7","상위가점":"0","하위감점":"0","상하위진도수":"0 / 20 / 3 / 0","총학습수":"23","가감총점":"616.7","평균":"102.78","랭킹":"21","본부랭킹":"0","학습평균":"88.15","전국학습평균":"76.15","학습상위":"15%","시간평균":"4.3","전국시간평균":"3.72","시간상위":"33%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"102.78","전국총점평균":"90.1","총점상위":"14%","학습포인트":"428.9","출결포인트":"50","전체포인트":"478.9","복권이벤트":"-","전국랭킹":"335","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056412093","회원명":"최하율","생년월일":"2019-09-08","리그명":"B.초1","조명":"01조","학습점수":"520.0","시간점수":"22.4","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"603.4","상위가점":"0","하위감점":"0","상하위진도수":"0 / 17 / 7 / 0","총학습수":"24","가감총점":"603.4","평균":"100.57","랭킹":"22","본부랭킹":"0","학습평균":"86.67","전국학습평균":"76.15","학습상위":"15%","시간평균":"3.73","전국시간평균":"3.72","시간상위":"52%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"100.57","전국총점평균":"90.1","총점상위":"15%","학습포인트":"520","출결포인트":"60","전체포인트":"580","복권이벤트":"-","전국랭킹":"372","전국회원수":"2801","최종랭킹":""}]},
  data: [{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"545.84","시간점수":"13.43","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"625.27","상위가점":"10","하위감점":"0","상하위진도수":"0 / 32 / 0 / 0","총학습수":"32","가감총점":"635.27","평균":"105.88","랭킹":"0","본부랭킹":"0","학습평균":"90.97","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.24","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"105.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"545.84","출결포인트":"60","전체포인트":"605.84","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"600","시간점수":"15.29","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"681.29","상위가점":"20","하위감점":"0","상하위진도수":"25 / 0 / 0 / 0","총학습수":"25","가감총점":"701.29","평균":"116.88","랭킹":"0","본부랭킹":"0","학습평균":"100","전국학습평균":"95.66","학습상위":"1%","시간평균":"2.55","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"116.88","전국총점평균":"113.29","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0055176248","회원명":"남태식","생년월일":"2016-08-23","리그명":"-","조명":"-","학습점수":"600","시간점수":"29.49","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"695.49","상위가점":"20","하위감점":"0","상하위진도수":"30 / 0 / 0 / 0","총학습수":"30","가감총점":"715.49","평균":"119.25","랭킹":"0","본부랭킹":"0","학습평균":"100","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.92","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"119.25","전국총점평균":"113.29","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-0055502112","회원명":"김세혁","생년월일":"2012-02-19","리그명":"-","조명":"-","학습점수":"482","시간점수":"22.37","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"569.37","상위가점":"10","하위감점":"0","상하위진도수":"0 / 31 / 0 / 0","총학습수":"31","가감총점":"579.37","평균":"96.56","랭킹":"0","본부랭킹":"0","학습평균":"80.33","전국학습평균":"95.66","학습상위":"1%","시간평균":"3.73","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"96.56","전국총점평균":"113.29","총점상위":"1%","학습포인트":"482","출결포인트":"60","전체포인트":"542","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대구강북 교육국","센터":"[LC]동변","센터타입":"LC","교사명":"김현자","회원번호":"000S-0055585708","회원명":"남동연","생년월일":"2016-06-03","리그명":"-","조명":"-","학습점수":"590","시간점수":"26.36","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"682.36","상위가점":"20","하위감점":"0","상하위진도수":"24 / 0 / 0 / 0","총학습수":"24","가감총점":"702.36","평균":"117.06","랭킹":"0","본부랭킹":"0","학습평균":"98.33","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.39","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.06","전국총점평균":"113.29","총점상위":"1%","학습포인트":"590","출결포인트":"60","전체포인트":"650","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"-","조명":"-","학습점수":"600","시간점수":"28.55","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"693.55","상위가점":"10","하위감점":"0","상하위진도수":"0 / 27 / 0 / 0","총학습수":"27","가감총점":"703.55","평균":"117.26","랭킹":"0","본부랭킹":"0","학습평균":"100","전국학습평균":"95.66","학습상위":"1%","시간평균":"4.76","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"117.26","전국총점평균":"113.29","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"600","시간점수":"36.78","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"700.78","상위가점":"20","하위감점":"0","상하위진도수":"27 / 0 / 0 / 0","총학습수":"27","가감총점":"720.78","평균":"120.13","랭킹":"0","본부랭킹":"0","학습평균":"100","전국학습평균":"95.66","학습상위":"1%","시간평균":"6.13","전국시간평균":"4.1","시간상위":"1%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"120.13","전국총점평균":"113.29","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-0055918887","회원명":"진시우","생년월일":"2018-06-21","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"34.4","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"700.4","상위가점":"10","하위감점":"0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"29","가감총점":"710.4","평균":"118.4","랭킹":"1","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.73","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.4","전국총점평균":"90.1","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"7","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0056203858","회원명":"유지안","생년월일":"2018-06-22","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"33.94","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"699.94","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"709.94","평균":"118.32","랭킹":"2","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.66","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.32","전국총점평균":"90.1","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"12","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"33.88","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"699.88","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"709.88","평균":"118.31","랭킹":"3","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.65","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.31","전국총점평균":"90.1","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"14","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"33.64","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"699.64","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"709.64","평균":"118.27","랭킹":"4","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.61","전국시간평균":"3.72","시간상위":"2%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.27","전국총점평균":"90.1","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"17","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056240381","회원명":"문채아","생년월일":"2019-07-12","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"34.09","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"699.09","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"709.09","평균":"118.18","랭킹":"5","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"5.68","전국시간평균":"3.72","시간상위":"1%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"118.18","전국총점평균":"90.1","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"25","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"597.5","시간점수":"32.35","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"695.85","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"705.85","평균":"117.64","랭킹":"6","본부랭킹":"0","학습평균":"99.58","전국학습평균":"76.15","학습상위":"3%","시간평균":"5.39","전국시간평균":"3.72","시간상위":"4%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"117.64","전국총점평균":"90.1","총점상위":"2%","학습포인트":"597.5","출결포인트":"60","전체포인트":"657.5","복권이벤트":"-","전국랭킹":"46","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"4.91","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"670.91","상위가점":"10","하위감점":"0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"26","가감총점":"680.91","평균":"113.49","랭킹":"7","본부랭킹":"0","학습평균":"100","전국학습평균":"76.15","학습상위":"1%","시간평균":"0.82","전국시간평균":"3.72","시간상위":"99%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"113.49","전국총점평균":"90.1","총점상위":"4%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"108","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"572.67","시간점수":"30","출결점수":"58","학습가산점":"1","리셋감점":"0","총점":"661.67","상위가점":"10","하위감점":"0","상하위진도수":"0 / 16 / 0 / 0","총학습수":"16","가감총점":"671.67","평균":"111.95","랭킹":"8","본부랭킹":"0","학습평균":"95.45","전국학습평균":"76.15","학습상위":"6%","시간평균":"5","전국시간평균":"3.72","시간상위":"11%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.95","전국총점평균":"90.1","총점상위":"5%","학습포인트":"472.67","출결포인트":"50","전체포인트":"522.67","복권이벤트":"-","전국랭킹":"131","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"569","시간점수":"25.69","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"660.69","상위가점":"10","하위감점":"0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"25","가감총점":"670.69","평균":"111.78","랭킹":"9","본부랭킹":"0","학습평균":"94.83","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.28","전국시간평균":"3.72","시간상위":"34%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.78","전국총점평균":"90.1","총점상위":"5%","학습포인트":"569","출결포인트":"60","전체포인트":"629","복권이벤트":"-","전국랭킹":"134","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 거제 Hive","센터":"[YC]국산","센터타입":"YC","교사명":"박수정","회원번호":"000S-0056157436","회원명":"정하진","생년월일":"2018-02-16","리그명":"B.초1","조명":"01조","학습점수":"566.08","시간점수":"27.47","출결점수":"58","학습가산점":"5","리셋감점":"0","총점":"656.55","상위가점":"10","하위감점":"0","상하위진도수":"0 / 24 / 0 / 0","총학습수":"24","가감총점":"666.55","평균":"111.09","랭킹":"10","본부랭킹":"0","학습평균":"94.35","전국학습평균":"76.15","학습상위":"7%","시간평균":"4.58","전국시간평균":"3.72","시간상위":"24%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.09","전국총점평균":"90.1","총점상위":"6%","학습포인트":"471.08","출결포인트":"50","전체포인트":"521.08","복권이벤트":"-","전국랭킹":"147","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"568.83","시간점수":"24.48","출결점수":"58","학습가산점":"5","리셋감점":"0","총점":"656.31","상위가점":"10","하위감점":"0","상하위진도수":"0 / 25 / 0 / 0","총학습수":"25","가감총점":"666.31","평균":"111.05","랭킹":"11","본부랭킹":"0","학습평균":"94.81","전국학습평균":"76.15","학습상위":"6%","시간평균":"4.08","전국시간평균":"3.72","시간상위":"41%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"111.05","전국총점평균":"90.1","총점상위":"6%","학습포인트":"468.83","출결포인트":"50","전체포인트":"518.83","복권이벤트":"-","전국랭킹":"148","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"562.99","시간점수":"30.25","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"656.24","상위가점":"10","하위감점":"0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"23","가감총점":"666.24","평균":"111.04","랭킹":"12","본부랭킹":"0","학습평균":"93.83","전국학습평균":"76.15","학습상위":"7%","시간평균":"5.04","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"562.99","출결포인트":"60","전체포인트":"622.99","복권이벤트":"-","전국랭킹":"149","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"581","시간점수":"20.5","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"662.5","상위가점":"0","하위감점":"0","상하위진도수":"0 / 6 / 10 / 0","총학습수":"16","가감총점":"662.5","평균":"110.42","랭킹":"13","본부랭킹":"0","학습평균":"96.83","전국학습평균":"76.15","학습상위":"5%","시간평균":"3.42","전국시간평균":"3.72","시간상위":"63%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.42","전국총점평균":"90.1","총점상위":"6%","학습포인트":"581","출결포인트":"60","전체포인트":"641","복권이벤트":"-","전국랭킹":"163","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"562.17","시간점수":"22.27","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"650.44","상위가점":"10","하위감점":"0","상하위진도수":"0 / 26 / 0 / 0","총학습수":"26","가감총점":"660.44","평균":"110.07","랭킹":"14","본부랭킹":"0","학습평균":"93.7","전국학습평균":"76.15","학습상위":"7%","시간평균":"3.71","전국시간평균":"3.72","시간상위":"54%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"110.07","전국총점평균":"90.1","총점상위":"7%","학습포인트":"562.17","출결포인트":"60","전체포인트":"622.17","복권이벤트":"-","전국랭킹":"172","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[LC]서정","센터타입":"LC","교사명":"이진아","회원번호":"000S-0056301847","회원명":"오서연","생년월일":"2019-04-11","리그명":"B.초1","조명":"02조","학습점수":"555.3","시간점수":"28.7","출결점수":"56","학습가산점":"5","리셋감점":"0","총점":"645.0","상위가점":"0","하위감점":"0","상하위진도수":"0 / 22 / 4 / 0","총학습수":"26","가감총점":"645.0","평균":"107.5","랭킹":"15","본부랭킹":"0","학습평균":"92.55","전국학습평균":"76.15","학습상위":"9%","시간평균":"4.78","전국시간평균":"3.72","시간상위":"22%","출결평균":"9.33","전국출결평균":"8.86","출결상위":"38%","총점평균":"107.5","전국총점평균":"90.1","총점상위":"9%","학습포인트":"455.3","출결포인트":"50","전체포인트":"505.3","복권이벤트":"-","전국랭킹":"212","전국회원수":"2801","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-0056184710","회원명":"임채윤","생년월일":"2019-02-12","리그명":"B.초1","조명":"01조","학습점수":"562.99","시간점수":"30.25","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"656.24","상위가점":"10","하위감점":"0","상하위진도수":"0 / 23 / 0 / 0","총학습수":"23","가감총점":"666.24","평균":"111.04","랭킹":"12","본부랭킹":"0","학습평균":"93.83","전국학습평균":"76.15","학습상위":"7%","시간평균":"5.04","전국시간평균":"3.72","시간상위":"10%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"111.04","전국총점평균":"90.1","총점상위":"6%","학습포인트":"562.99","출결포인트":"60","전체포인트":"622.99","복권이벤트":"-","전국랭킹":"149","전국회원수":"2801","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"504","시간점수":"22.3","출결점수":"58","학습가산점":"4","리셋감점":"0","총점":"588.3","상위가점":"0","하위감점":"0","상하위진도수":"0 / 28 / 2 / 0","총학습수":"30","가감총점":"588.3","평균":"98.05","랭킹":"0","본부랭킹":"0","학습평균":"84","전국학습평균":"95.66","학습상위":"18%","시간평균":"3.72","전국시간평균":"4.1","시간상위":"52%","출결평균":"9.67","전국출결평균":"10","출결상위":"35%","총점평균":"98.05","전국총점평균":"113.29","총점상위":"22%","학습포인트":"504","출결포인트":"50","전체포인트":"554","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"512","시간점수":"19.8","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"596.8","상위가점":"0","하위감점":"0","상하위진도수":"0 / 29 / 0 / 0","총학습수":"29","가감총점":"596.8","평균":"99.47","랭킹":"0","본부랭킹":"0","학습평균":"85.33","전국학습평균":"95.66","학습상위":"16%","시간평균":"3.3","전국시간평균":"4.1","시간상위":"65%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"99.47","전국총점평균":"113.29","총점상위":"20%","학습포인트":"512","출결포인트":"60","전체포인트":"572","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"B.초1","조명":"03조","학습점수":"548.7","시간점수":"24.1","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"636.8","상위가점":"0","하위감점":"0","상하위진도수":"0 / 20 / 4 / 0","총학습수":"24","가감총점":"636.8","평균":"106.13","랭킹":"18","본부랭킹":"0","학습평균":"91.45","전국학습평균":"76.15","학습상위":"12%","시간평균":"4.02","전국시간평균":"3.72","시간상위":"43%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"106.13","전국총점평균":"90.1","총점상위":"10%","학습포인트":"548.7","출결포인트":"60","전체포인트":"608.7","복권이벤트":"-","전국랭킹":"253","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0055847201","회원명":"서준하","생년월일":"2018-09-15","리그명":"B.초1","조명":"02조","학습점수":"560.4","시간점수":"26.9","출결점수":"58","학습가산점":"5","리셋감점":"0","총점":"650.3","상위가점":"0","하위감점":"0","상하위진도수":"0 / 22 / 2 / 0","총학습수":"24","가감총점":"650.3","평균":"108.38","랭킹":"16","본부랭킹":"0","학습평균":"93.4","전국학습평균":"76.15","학습상위":"8%","시간평균":"4.48","전국시간평균":"3.72","시간상위":"28%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"108.38","전국총점평균":"90.1","총점상위":"8%","학습포인트":"460.4","출결포인트":"50","전체포인트":"510.4","복권이벤트":"-","전국랭킹":"228","전국회원수":"2801","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 인천서부 Hive","센터":"[YC]청라","센터타입":"YC","교사명":"한정아","회원번호":"000S-0056314920","회원명":"민지우","생년월일":"2019-01-05","리그명":"B.초1","조명":"04조","학습점수":"540.1","시간점수":"21.8","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"624.9","상위가점":"0","하위감점":"0","상하위진도수":"0 / 18 / 6 / 0","총학습수":"24","가감총점":"624.9","평균":"104.15","랭킹":"19","본부랭킹":"0","학습평균":"90.02","전국학습평균":"76.15","학습상위":"13%","시간평균":"3.63","전국시간평균":"3.72","시간상위":"58%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"104.15","전국총점평균":"90.1","총점상위":"12%","학습포인트":"540.1","출결포인트":"60","전체포인트":"600.1","복권이벤트":"-","전국랭킹":"301","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"522.5","시간점수":"20.1","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"606.6","상위가점":"0","하위감점":"0","상하위진도수":"0 / 30 / 0 / 0","총학습수":"30","가감총점":"606.6","평균":"101.1","랭킹":"0","본부랭킹":"0","학습평균":"87.08","전국학습평균":"95.66","학습상위":"15%","시간평균":"3.35","전국시간평균":"4.1","시간상위":"63%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"101.1","전국총점평균":"113.29","총점상위":"18%","학습포인트":"522.5","출결포인트":"60","전체포인트":"582.5","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"488.5","시간점수":"16.3","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"567.8","상위가점":"0","하위감점":"-30","상하위진도수":"0 / 18 / 8 / 0","총학습수":"26","가감총점":"537.8","평균":"89.63","랭킹":"0","본부랭킹":"0","학습평균":"81.42","전국학습평균":"95.66","학습상위":"28%","시간평균":"2.72","전국시간평균":"4.1","시간상위":"78%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"89.63","전국총점평균":"113.29","총점상위":"38%","학습포인트":"488.5","출결포인트":"60","전체포인트":"548.5","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"476","시간점수":"14.9","출결점수":"54","학습가산점":"2","리셋감점":"0","총점":"546.9","상위가점":"0","하위감점":"-30","상하위진도수":"0 / 16 / 8 / 0","총학습수":"24","가감총점":"516.9","평균":"86.15","랭킹":"0","본부랭킹":"0","학습평균":"79.33","전국학습평균":"95.66","학습상위":"32%","시간평균":"2.48","전국시간평균":"4.1","시간상위":"82%","출결평균":"9","전국출결평균":"10","출결상위":"55%","총점평균":"86.15","전국총점평균":"113.29","총점상위":"45%","학습포인트":"476","출결포인트":"50","전체포인트":"526","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 제주북부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"강대교","회원번호":"000S-0055371693","회원명":"최수아","생년월일":"2012-11-30","리그명":"-","조명":"-","학습점수":"510","시간점수":"18.7","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"591.7","상위가점":"0","하위감점":"0","상하위진도수":"0 / 27 / 2 / 0","총학습수":"29","가감총점":"591.7","평균":"98.62","랭킹":"0","본부랭킹":"0","학습평균":"85","전국학습평균":"95.66","학습상위":"17%","시간평균":"3.12","전국시간평균":"4.1","시간상위":"70%","출결평균":"10","전국출결평균":"10","출결상위":"1%","총점평균":"98.62","전국총점평균":"113.29","총점상위":"21%","학습포인트":"510","출결포인트":"60","전체포인트":"570","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 성남 Hive","센터":"[LC]서현","센터타입":"LC","교사명":"박윤미","회원번호":"000S-0056498271","회원명":"배수현","생년월일":"2019-05-19","리그명":"B.초1","조명":"05조","학습점수":"536.2","시간점수":"23.5","출결점수":"60","학습가산점":"2","리셋감점":"0","총점":"621.7","상위가점":"0","하위감점":"0","상하위진도수":"0 / 19 / 5 / 0","총학습수":"24","가감총점":"621.7","평균":"103.62","랭킹":"20","본부랭킹":"0","학습평균":"89.37","전국학습평균":"76.15","학습상위":"14%","시간평균":"3.92","전국시간평균":"3.72","시간상위":"46%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"103.62","전국총점평균":"90.1","총점상위":"13%","학습포인트":"536.2","출결포인트":"60","전체포인트":"596.2","복권이벤트":"-","전국랭킹":"318","전국회원수":"2801","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 고양 Hive","센터":"[LC]원흥","센터타입":"LC","교사명":"박서연","회원번호":"000S-0056382049","회원명":"이서아","생년월일":"2018-08-22","리그명":"B.초1","조명":"06조","학습점수":"528.9","시간점수":"25.8","출결점수":"58","학습가산점":"4","리셋감점":"0","총점":"616.7","상위가점":"0","하위감점":"0","상하위진도수":"0 / 20 / 3 / 0","총학습수":"23","가감총점":"616.7","평균":"102.78","랭킹":"21","본부랭킹":"0","학습평균":"88.15","전국학습평균":"76.15","학습상위":"15%","시간평균":"4.3","전국시간평균":"3.72","시간상위":"33%","출결평균":"9.67","전국출결평균":"8.86","출결상위":"28%","총점평균":"102.78","전국총점평균":"90.1","총점상위":"14%","학습포인트":"428.9","출결포인트":"50","전체포인트":"478.9","복권이벤트":"-","전국랭킹":"335","전국회원수":"2801","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056412093","회원명":"최하율","생년월일":"2019-09-08","리그명":"B.초1","조명":"01조","학습점수":"520.0","시간점수":"22.4","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"603.4","상위가점":"0","하위감점":"0","상하위진도수":"0 / 17 / 7 / 0","총학습수":"24","가감총점":"603.4","평균":"100.57","랭킹":"22","본부랭킹":"0","학습평균":"86.67","전국학습평균":"76.15","학습상위":"15%","시간평균":"3.73","전국시간평균":"3.72","시간상위":"52%","출결평균":"10","전국출결평균":"8.86","출결상위":"1%","총점평균":"100.57","전국총점평균":"90.1","총점상위":"15%","학습포인트":"520","출결포인트":"60","전체포인트":"580","복권이벤트":"-","전국랭킹":"372","전국회원수":"2801","최종랭킹":""}]
  };

  // ── 2025 서머 (목업 20건)
  LEAGUE_DATA['2025_summer'] = {
    label: '2025 서머 리그오브매스',
    finalized: true,
    totalWeeks:6,
  weeks:{  "1":[{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-1001001001","회원명":"이서준","생년월일":"2017-03-12","리그명":"B.초1","조명":"01조","학습점수":"99.62","시간점수":"4.84","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"117.46","상위가점":"0","하위감점":"0","상하위진도수":"22/0/0/0","총학습수":"4","가감총점":"117.46","평균":"29.36","랭킹":"3","본부랭킹":"0","학습평균":"95.01","전국학습평균":"77.2","학습상위":"2%","시간평균":"4.9","전국시간평균":"3.68","시간상위":"8%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"119.35","전국총점평균":"91.2","총점상위":"1%","학습포인트":"89.66","출결포인트":"12","전체포인트":"101.66","복권이벤트":"-","전국랭킹":"50","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-1001001002","회원명":"김수아","생년월일":"2017-11-08","리그명":"B.초1","조명":"01조","학습점수":"102.59","시간점수":"4.85","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"120.44","상위가점":"0","하위감점":"0","상하위진도수":"21/0/0/0","총학습수":"4","가감총점":"120.44","평균":"30.11","랭킹":"3","본부랭킹":"0","학습평균":"98.4","전국학습평균":"77.2","학습상위":"2%","시간평균":"5.1","전국시간평균":"3.68","시간상위":"9%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"118.63","전국총점평균":"91.2","총점상위":"1%","학습포인트":"92.33","출결포인트":"12","전체포인트":"104.33","복권이벤트":"-","전국랭킹":"1","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-1001001003","회원명":"박준호","생년월일":"2017-07-22","리그명":"B.초1","조명":"01조","학습점수":"100.02","시간점수":"4.69","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"117.71","상위가점":"0","하위감점":"0","상하위진도수":"20/0/0/0","총학습수":"3","가감총점":"117.71","평균":"39.24","랭킹":"4","본부랭킹":"0","학습평균":"100.17","전국학습평균":"77.2","학습상위":"3%","시간평균":"4.83","전국시간평균":"3.68","시간상위":"12%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"117.92","전국총점평균":"91.2","총점상위":"2%","학습포인트":"90.02","출결포인트":"12","전체포인트":"102.02","복권이벤트":"-","전국랭킹":"85","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-1001001004","회원명":"오지우","생년월일":"2018-02-14","리그명":"B.초1","조명":"02조","학습점수":"99.89","시간점수":"4.95","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"117.84","상위가점":"0","하위감점":"0","상하위진도수":"0/19/0/0","총학습수":"3","가감총점":"117.84","평균":"39.28","랭킹":"8","본부랭킹":"0","학습평균":"98.51","전국학습평균":"77.2","학습상위":"4%","시간평균":"5.11","전국시간평균":"3.68","시간상위":"14%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"115.3","전국총점평균":"91.2","총점상위":"3%","학습포인트":"89.9","출결포인트":"12","전체포인트":"101.9","복권이벤트":"-","전국랭킹":"34","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 군포산본 Hive","센터":"대교 군포산본 Hive 001팀","센터타입":"LC","교사명":"송자영","회원번호":"000S-1001001005","회원명":"최민재","생년월일":"2018-08-30","리그명":"B.초1","조명":"03조","학습점수":"95.84","시간점수":"4.48","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"113.32","상위가점":"0","하위감점":"0","상하위진도수":"0/18/2/0","총학습수":"3","가감총점":"113.32","평균":"37.77","랭킹":"8","본부랭킹":"0","학습평균":"93.97","전국학습평균":"77.2","학습상위":"5%","시간평균":"4.64","전국시간평균":"3.68","시간상위":"18%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"113.9","전국총점평균":"91.2","총점상위":"4%","학습포인트":"86.26","출결포인트":"12","전체포인트":"98.26","복권이벤트":"-","전국랭킹":"105","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-1001001006","회원명":"한지원","생년월일":"2018-05-18","리그명":"B.초1","조명":"02조","학습점수":"97.3","시간점수":"4.35","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"114.65","상위가점":"0","하위감점":"0","상하위진도수":"0/17/4/0","총학습수":"4","가감총점":"114.65","평균":"28.66","랭킹":"9","본부랭킹":"0","학습평균":"98.07","전국학습평균":"77.2","학습상위":"6%","시간평균":"4.71","전국시간평균":"3.68","시간상위":"20%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"113.15","전국총점평균":"91.2","총점상위":"5%","학습포인트":"87.57","출결포인트":"12","전체포인트":"99.57","복권이벤트":"-","전국랭킹":"51","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-1001001007","회원명":"이현우","생년월일":"2017-09-05","리그명":"B.초1","조명":"01조","학습점수":"94.54","시간점수":"4.09","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"110.63","상위가점":"0","하위감점":"0","상하위진도수":"0/15/6/0","총학습수":"4","가감총점":"110.63","평균":"27.66","랭킹":"10","본부랭킹":"0","학습평균":"95.86","전국학습평균":"77.2","학습상위":"7%","시간평균":"4.32","전국시간평균":"3.68","시간상위":"25%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"110.13","전국총점평균":"91.2","총점상위":"7%","학습포인트":"85.09","출결포인트":"12","전체포인트":"97.09","복권이벤트":"-","전국랭킹":"122","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-1001001008","회원명":"노서아","생년월일":"2018-01-19","리그명":"B.초1","조명":"03조","학습점수":"95.99","시간점수":"4.42","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"112.41","상위가점":"0","하위감점":"0","상하위진도수":"0/14/5/0","총학습수":"3","가감총점":"112.41","평균":"37.47","랭킹":"6","본부랭킹":"0","학습평균":"94.13","전국학습평균":"77.2","학습상위":"8%","시간평균":"4.03","전국시간평균":"3.68","시간상위":"30%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"108.6","전국총점평균":"91.2","총점상위":"8%","학습포인트":"86.39","출결포인트":"12","전체포인트":"98.39","복권이벤트":"-","전국랭킹":"100","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-1001001009","회원명":"강도윤","생년월일":"2017-12-27","리그명":"B.초1","조명":"02조","학습점수":"91.84","시간점수":"3.73","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"107.57","상위가점":"0","하위감점":"0","상하위진도수":"0/13/7/0","총학습수":"3","가감총점":"107.57","평균":"35.86","랭킹":"11","본부랭킹":"0","학습평균":"90.82","전국학습평균":"77.2","학습상위":"9%","시간평균":"4.13","전국시간평균":"3.68","시간상위":"35%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"107.38","전국총점평균":"91.2","총점상위":"9%","학습포인트":"82.66","출결포인트":"12","전체포인트":"94.66","복권이벤트":"-","전국랭킹":"134","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-1001001010","회원명":"윤채원","생년월일":"2018-06-14","리그명":"B.초1","조명":"04조","학습점수":"88.96","시간점수":"3.51","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"104.47","상위가점":"0","하위감점":"0","상하위진도수":"0/12/8/0","총학습수":"3","가감총점":"104.47","평균":"34.82","랭킹":"14","본부랭킹":"0","학습평균":"90.34","전국학습평균":"77.2","학습상위":"10%","시간평균":"3.6","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"106.02","전국총점평균":"91.2","총점상위":"10%","학습포인트":"80.06","출결포인트":"12","전체포인트":"92.06","복권이벤트":"-","전국랭킹":"156","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-1001001011","회원명":"정수현","생년월일":"2017-04-03","리그명":"B.초1","조명":"05조","학습점수":"94.41","시간점수":"3.35","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"109.76","상위가점":"0","하위감점":"0","상하위진도수":"0/11/8/0","총학습수":"3","가감총점":"109.76","평균":"36.59","랭킹":"12","본부랭킹":"0","학습평균":"85.72","전국학습평균":"77.2","학습상위":"11%","시간평균":"3.41","전국시간평균":"3.68","시간상위":"48%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"104.3","전국총점평균":"91.2","총점상위":"11%","학습포인트":"84.97","출결포인트":"12","전체포인트":"96.97","복권이벤트":"-","전국랭킹":"226","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구월성 Hive","센터":"대교 대구월성 Hive 001팀","센터타입":"LC","교사명":"박정락","회원번호":"000S-1001001012","회원명":"이태양","생년월일":"2018-10-08","리그명":"B.초1","조명":"05조","학습점수":"84.95","시간점수":"3.49","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"100.44","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"3","가감총점":"100.44","평균":"33.48","랭킹":"12","본부랭킹":"0","학습평균":"87.07","전국학습평균":"77.2","학습상위":"13%","시간평균":"3.12","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"102.92","전국총점평균":"91.2","총점상위":"12%","학습포인트":"76.45","출결포인트":"12","전체포인트":"88.45","복권이벤트":"-","전국랭킹":"264","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-1001001013","회원명":"박하은","생년월일":"2017-08-17","리그명":"B.초1","조명":"06조","학습점수":"91.92","시간점수":"3.35","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"107.27","상위가점":"0","하위감점":"0","상하위진도수":"0/9/10/0","총학습수":"3","가감총점":"107.27","평균":"35.76","랭킹":"13","본부랭킹":"0","학습평균":"89.43","전국학습평균":"77.2","학습상위":"14%","시간평균":"3.21","전국시간평균":"3.68","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"101.2","전국총점평균":"91.2","총점상위":"13%","학습포인트":"82.73","출결포인트":"12","전체포인트":"94.73","복권이벤트":"-","전국랭킹":"299","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-1001001014","회원명":"최준서","생년월일":"2018-03-24","리그명":"B.초1","조명":"06조","학습점수":"85.96","시간점수":"2.82","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"100.78","상위가점":"0","하위감점":"0","상하위진도수":"0/8/12/0","총학습수":"3","가감총점":"100.78","평균":"33.59","랭킹":"15","본부랭킹":"0","학습평균":"83.6","전국학습평균":"77.2","학습상위":"15%","시간평균":"2.79","전국시간평균":"3.68","시간상위":"70%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"99.48","전국총점평균":"91.2","총점상위":"15%","학습포인트":"77.36","출결포인트":"12","전체포인트":"89.36","복권이벤트":"-","전국랭킹":"374","전국회원수":"2654","최종랭킹":""},{"본부":"대교 중장본부","지점":"대교 부산남부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"조대교","회원번호":"000S-1001001015","회원명":"임서진","생년월일":"2017-06-11","리그명":"B.초1","조명":"07조","학습점수":"84.94","시간점수":"2.7","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"99.64","상위가점":"0","하위감점":"0","상하위진도수":"0/7/13/0","총학습수":"3","가감총점":"99.64","평균":"33.21","랭킹":"18","본부랭킹":"0","학습평균":"77.77","전국학습평균":"77.2","학습상위":"17%","시간평균":"2.8","전국시간평균":"3.68","시간상위":"75%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"97.23","전국총점평균":"91.2","총점상위":"17%","학습포인트":"76.45","출결포인트":"12","전체포인트":"88.45","복권이벤트":"-","전국랭킹":"355","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 하남 Hive","센터":"대교 하남 Hive 001팀","센터타입":"LC","교사명":"윤희경","회원번호":"000S-1001001016","회원명":"홍민준","생년월일":"2018-07-29","리그명":"B.초1","조명":"07조","학습점수":"81.15","시간점수":"2.22","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"95.37","상위가점":"0","하위감점":"0","상하위진도수":"0/6/12/0","총학습수":"3","가감총점":"95.37","평균":"31.79","랭킹":"20","본부랭킹":"0","학습평균":"81.82","전국학습평균":"77.2","학습상위":"19%","시간평균":"2.58","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"94.3","전국총점평균":"91.2","총점상위":"19%","학습포인트":"73.04","출결포인트":"12","전체포인트":"85.04","복권이벤트":"-","전국랭킹":"459","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-1001001017","회원명":"신채은","생년월일":"2017-02-08","리그명":"B.초1","조명":"08조","학습점수":"82.94","시간점수":"2.23","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"97.17","상위가점":"0","하위감점":"0","상하위진도수":"0/5/10/2","총학습수":"3","가감총점":"97.17","평균":"32.39","랭킹":"21","본부랭킹":"0","학습평균":"79.48","전국학습평균":"77.2","학습상위":"22%","시간평균":"2.06","전국시간평균":"3.68","시간상위":"85%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"89.87","전국총점평균":"91.2","총점상위":"22%","학습포인트":"74.65","출결포인트":"12","전체포인트":"86.65","복권이벤트":"-","전국랭킹":"474","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-1001001018","회원명":"문도현","생년월일":"2017-10-16","리그명":"B.초1","조명":"08조","학습점수":"78.98","시간점수":"1.79","출결점수":"11","학습가산점":"0","리셋감점":"0","총점":"91.77","상위가점":"0","하위감점":"0","상하위진도수":"0/4/8/4","총학습수":"3","가감총점":"91.77","평균":"30.59","랭킹":"17","본부랭킹":"0","학습평균":"72.46","전국학습평균":"77.2","학습상위":"28%","시간평균":"1.95","전국시간평균":"3.68","시간상위":"88%","출결평균":"9.0","전국출결평균":"8.9","출결상위":"45%","총점평균":"84.25","전국총점평균":"91.2","총점상위":"28%","학습포인트":"71.08","출결포인트":"11","전체포인트":"82.08","복권이벤트":"-","전국랭킹":"591","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-1001001019","회원명":"장민서","생년월일":"2019-01-22","리그명":"B.초1","조명":"09조","학습점수":"65.03","시간점수":"1.2","출결점수":"8","학습가산점":"0","리셋감점":"0","총점":"74.23","상위가점":"0","하위감점":"0","상하위진도수":"0/2/6/6","총학습수":"2","가감총점":"74.23","평균":"37.12","랭킹":"18","본부랭킹":"0","학습평균":"58.88","전국학습평균":"77.2","학습상위":"42%","시간평균":"1.19","전국시간평균":"3.68","시간상위":"95%","출결평균":"6.67","전국출결평균":"8.9","출결상위":"72%","총점평균":"66.2","전국총점평균":"91.2","총점상위":"45%","학습포인트":"58.53","출결포인트":"8","전체포인트":"66.53","복권이벤트":"-","전국랭킹":"1892","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-1001001020","회원명":"권예빈","생년월일":"2019-03-15","리그명":"B.초1","조명":"09조","학습점수":"49.29","시간점수":"0.81","출결점수":"6","학습가산점":"0","리셋감점":"0","총점":"56.1","상위가점":"0","하위감점":"0","상하위진도수":"0/1/4/8","총학습수":"2","가감총점":"56.1","평균":"28.05","랭킹":"18","본부랭킹":"0","학습평균":"49.42","전국학습평균":"77.2","학습상위":"58%","시간평균":"0.74","전국시간평균":"3.68","시간상위":"98%","출결평균":"5.0","전국출결평균":"8.9","출결상위":"85%","총점평균":"52.47","전국총점평균":"91.2","총점상위":"62%","학습포인트":"44.36","출결포인트":"6","전체포인트":"50.36","복권이벤트":"-","전국랭킹":"2245","전국회원수":"2654","최종랭킹":""}],
  "2":[{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-1001001001","회원명":"이서준","생년월일":"2017-03-12","리그명":"B.초1","조명":"01조","학습점수":"207.5","시간점수":"10.15","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"241.65","상위가점":"0","하위감점":"0","상하위진도수":"22/0/0/0","총학습수":"7","가감총점":"241.65","평균":"34.52","랭킹":"2","본부랭킹":"0","학습평균":"93.7","전국학습평균":"77.2","학습상위":"2%","시간평균":"5.45","전국시간평균":"3.68","시간상위":"8%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"119.35","전국총점평균":"91.2","총점상위":"1%","학습포인트":"186.75","출결포인트":"22","전체포인트":"208.75","복권이벤트":"-","전국랭킹":"1","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-1001001002","회원명":"김수아","생년월일":"2017-11-08","리그명":"B.초1","조명":"01조","학습점수":"205.8","시간점수":"10.12","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"239.92","상위가점":"0","하위감점":"0","상하위진도수":"21/0/0/0","총학습수":"7","가감총점":"239.92","평균":"34.27","랭킹":"4","본부랭킹":"0","학습평균":"99.47","전국학습평균":"77.2","학습상위":"2%","시간평균":"4.97","전국시간평균":"3.68","시간상위":"9%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"118.63","전국총점평균":"91.2","총점상위":"1%","학습포인트":"185.22","출결포인트":"22","전체포인트":"207.22","복권이벤트":"-","전국랭킹":"12","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-1001001003","회원명":"박준호","생년월일":"2017-07-22","리그명":"B.초1","조명":"01조","학습점수":"203.4","시간점수":"9.88","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"237.28","상위가점":"0","하위감점":"0","상하위진도수":"20/0/0/0","총학습수":"7","가감총점":"237.28","평균":"33.9","랭킹":"7","본부랭킹":"0","학습평균":"97.97","전국학습평균":"77.2","학습상위":"3%","시간평균":"4.83","전국시간평균":"3.68","시간상위":"12%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"117.92","전국총점평균":"91.2","총점상위":"2%","학습포인트":"183.06","출결포인트":"22","전체포인트":"205.06","복권이벤트":"-","전국랭킹":"22","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-1001001004","회원명":"오지우","생년월일":"2018-02-14","리그명":"B.초1","조명":"02조","학습점수":"188.46","시간점수":"10.37","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"221.83","상위가점":"0","하위감점":"0","상하위진도수":"0/19/0/0","총학습수":"6","가감총점":"221.83","평균":"36.97","랭킹":"3","본부랭킹":"0","학습평균":"99.63","전국학습평균":"77.2","학습상위":"4%","시간평균":"5.11","전국시간평균":"3.68","시간상위":"14%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"115.3","전국총점평균":"91.2","총점상위":"3%","학습포인트":"169.61","출결포인트":"22","전체포인트":"191.61","복권이벤트":"-","전국랭킹":"88","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 군포산본 Hive","센터":"대교 군포산본 Hive 001팀","센터타입":"LC","교사명":"송자영","회원번호":"000S-1001001005","회원명":"최민재","생년월일":"2018-08-30","리그명":"B.초1","조명":"03조","학습점수":"198.35","시간점수":"9.91","출결점수":"21","학습가산점":"2","리셋감점":"0","총점":"231.26","상위가점":"0","하위감점":"0","상하위진도수":"0/18/2/0","총학습수":"7","가감총점":"231.26","평균":"33.04","랭킹":"9","본부랭킹":"0","학습평균":"94.65","전국학습평균":"77.2","학습상위":"5%","시간평균":"4.32","전국시간평균":"3.68","시간상위":"18%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"113.9","전국총점평균":"91.2","총점상위":"4%","학습포인트":"178.51","출결포인트":"21","전체포인트":"199.51","복권이벤트":"-","전국랭킹":"110","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-1001001006","회원명":"한지원","생년월일":"2018-05-18","리그명":"B.초1","조명":"02조","학습점수":"190.31","시간점수":"8.74","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"222.05","상위가점":"0","하위감점":"0","상하위진도수":"0/17/4/0","총학습수":"7","가감총점":"222.05","평균":"31.72","랭킹":"4","본부랭킹":"0","학습평균":"92.02","전국학습평균":"77.2","학습상위":"6%","시간평균":"4.71","전국시간평균":"3.68","시간상위":"20%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"113.15","전국총점평균":"91.2","총점상위":"5%","학습포인트":"171.28","출결포인트":"22","전체포인트":"193.28","복권이벤트":"-","전국랭킹":"73","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-1001001007","회원명":"이현우","생년월일":"2017-09-05","리그명":"B.초1","조명":"01조","학습점수":"185.81","시간점수":"8.55","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"217.36","상위가점":"0","하위감점":"0","상하위진도수":"0/15/6/0","총학습수":"7","가감총점":"217.36","평균":"31.05","랭킹":"10","본부랭킹":"0","학습평균":"88.59","전국학습평균":"77.2","학습상위":"7%","시간평균":"4.18","전국시간평균":"3.68","시간상위":"25%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"110.13","전국총점평균":"91.2","총점상위":"7%","학습포인트":"167.23","출결포인트":"22","전체포인트":"189.23","복권이벤트":"-","전국랭킹":"79","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-1001001008","회원명":"노서아","생년월일":"2018-01-19","리그명":"B.초1","조명":"03조","학습점수":"179.39","시간점수":"8.81","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"210.2","상위가점":"0","하위감점":"0","상하위진도수":"0/14/5/0","총학습수":"6","가감총점":"210.2","평균":"35.03","랭킹":"10","본부랭킹":"0","학습평균":"95.26","전국학습평균":"77.2","학습상위":"8%","시간평균":"3.98","전국시간평균":"3.68","시간상위":"30%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"108.6","전국총점평균":"91.2","총점상위":"8%","학습포인트":"161.45","출결포인트":"21","전체포인트":"182.45","복권이벤트":"-","전국랭킹":"100","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-1001001009","회원명":"강도윤","생년월일":"2017-12-27","리그명":"B.초1","조명":"02조","학습점수":"177.88","시간점수":"8.29","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"209.17","상위가점":"0","하위감점":"0","상하위진도수":"0/13/7/0","총학습수":"7","가감총점":"209.17","평균":"29.88","랭킹":"12","본부랭킹":"0","학습평균":"91.6","전국학습평균":"77.2","학습상위":"9%","시간평균":"3.72","전국시간평균":"3.68","시간상위":"35%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"107.38","전국총점평균":"91.2","총점상위":"9%","학습포인트":"160.09","출결포인트":"22","전체포인트":"182.09","복권이벤트":"-","전국랭킹":"120","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-1001001010","회원명":"윤채원","생년월일":"2018-06-14","리그명":"B.초1","조명":"04조","학습점수":"175.63","시간점수":"6.97","출결점수":"22","학습가산점":"0","리셋감점":"0","총점":"204.6","상위가점":"0","하위감점":"0","상하위진도수":"0/12/8/0","총학습수":"7","가감총점":"204.6","평균":"29.23","랭킹":"11","본부랭킹":"0","학습평균":"85.53","전국학습평균":"77.2","학습상위":"10%","시간평균":"3.98","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"106.02","전국총점평균":"91.2","총점상위":"10%","학습포인트":"158.07","출결포인트":"22","전체포인트":"180.07","복권이벤트":"-","전국랭킹":"122","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-1001001011","회원명":"정수현","생년월일":"2017-04-03","리그명":"B.초1","조명":"05조","학습점수":"174.73","시간점수":"7.03","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"203.76","상위가점":"0","하위감점":"0","상하위진도수":"0/11/8/0","총학습수":"6","가감총점":"203.76","평균":"33.96","랭킹":"14","본부랭킹":"0","학습평균":"89.73","전국학습평균":"77.2","학습상위":"11%","시간평균":"3.56","전국시간평균":"3.68","시간상위":"48%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"104.3","전국총점평균":"91.2","총점상위":"11%","학습포인트":"157.26","출결포인트":"21","전체포인트":"178.26","복권이벤트":"-","전국랭킹":"240","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구월성 Hive","센터":"대교 대구월성 Hive 001팀","센터타입":"LC","교사명":"박정락","회원번호":"000S-1001001012","회원명":"이태양","생년월일":"2018-10-08","리그명":"B.초1","조명":"05조","학습점수":"180.23","시간점수":"6.89","출결점수":"22","학습가산점":"0","리셋감점":"0","총점":"209.12","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"7","가감총점":"209.12","평균":"29.87","랭킹":"13","본부랭킹":"0","학습평균":"83.07","전국학습평균":"77.2","학습상위":"13%","시간평균":"3.33","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"102.92","전국총점평균":"91.2","총점상위":"12%","학습포인트":"162.21","출결포인트":"22","전체포인트":"184.21","복권이벤트":"-","전국랭킹":"261","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-1001001013","회원명":"박하은","생년월일":"2017-08-17","리그명":"B.초1","조명":"06조","학습점수":"174.38","시간점수":"6.67","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"203.05","상위가점":"0","하위감점":"0","상하위진도수":"0/9/10/0","총학습수":"6","가감총점":"203.05","평균":"33.84","랭킹":"11","본부랭킹":"0","학습평균":"84.22","전국학습평균":"77.2","학습상위":"14%","시간평균":"3.09","전국시간평균":"3.68","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"101.2","전국총점평균":"91.2","총점상위":"13%","학습포인트":"156.94","출결포인트":"21","전체포인트":"177.94","복권이벤트":"-","전국랭킹":"306","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-1001001014","회원명":"최준서","생년월일":"2018-03-24","리그명":"B.초1","조명":"06조","학습점수":"180.45","시간점수":"6.14","출결점수":"22","학습가산점":"0","리셋감점":"0","총점":"208.59","상위가점":"0","하위감점":"0","상하위진도수":"0/8/12/0","총학습수":"7","가감총점":"208.59","평균":"29.8","랭킹":"12","본부랭킹":"0","학습평균":"82.59","전국학습평균":"77.2","학습상위":"15%","시간평균":"3.09","전국시간평균":"3.68","시간상위":"70%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"99.48","전국총점평균":"91.2","총점상위":"15%","학습포인트":"162.41","출결포인트":"22","전체포인트":"184.41","복권이벤트":"-","전국랭킹":"352","전국회원수":"2654","최종랭킹":""},{"본부":"대교 중장본부","지점":"대교 부산남부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"조대교","회원번호":"000S-1001001015","회원명":"임서진","생년월일":"2017-06-11","리그명":"B.초1","조명":"07조","학습점수":"171.11","시간점수":"4.97","출결점수":"22","학습가산점":"0","리셋감점":"0","총점":"198.08","상위가점":"0","하위감점":"0","상하위진도수":"0/7/13/0","총학습수":"7","가감총점":"198.08","평균":"28.3","랭킹":"15","본부랭킹":"0","학습평균":"85.75","전국학습평균":"77.2","학습상위":"17%","시간평균":"2.85","전국시간평균":"3.68","시간상위":"75%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"97.23","전국총점평균":"91.2","총점상위":"17%","학습포인트":"154.0","출결포인트":"22","전체포인트":"176.0","복권이벤트":"-","전국랭킹":"342","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 하남 Hive","센터":"대교 하남 Hive 001팀","센터타입":"LC","교사명":"윤희경","회원번호":"000S-1001001016","회원명":"홍민준","생년월일":"2018-07-29","리그명":"B.초1","조명":"07조","학습점수":"169.32","시간점수":"4.51","출결점수":"21","학습가산점":"0","리셋감점":"0","총점":"194.83","상위가점":"0","하위감점":"0","상하위진도수":"0/6/12/0","총학습수":"6","가감총점":"194.83","평균":"32.47","랭킹":"15","본부랭킹":"0","학습평균":"80.68","전국학습평균":"77.2","학습상위":"19%","시간평균":"2.58","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"94.3","전국총점평균":"91.2","총점상위":"19%","학습포인트":"152.39","출결포인트":"21","전체포인트":"173.39","복권이벤트":"-","전국랭킹":"454","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-1001001017","회원명":"신채은","생년월일":"2017-02-08","리그명":"B.초1","조명":"08조","학습점수":"152.17","시간점수":"4.18","출결점수":"21","학습가산점":"0","리셋감점":"0","총점":"177.35","상위가점":"0","하위감점":"0","상하위진도수":"0/5/10/2","총학습수":"6","가감총점":"177.35","평균":"29.56","랭킹":"16","본부랭킹":"0","학습평균":"77.79","전국학습평균":"77.2","학습상위":"22%","시간평균":"2.0","전국시간평균":"3.68","시간상위":"85%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"89.87","전국총점평균":"91.2","총점상위":"22%","학습포인트":"136.95","출결포인트":"21","전체포인트":"157.95","복권이벤트":"-","전국랭킹":"538","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-1001001018","회원명":"문도현","생년월일":"2017-10-16","리그명":"B.초1","조명":"08조","학습점수":"157.4","시간점수":"3.57","출결점수":"20","학습가산점":"0","리셋감점":"0","총점":"180.97","상위가점":"0","하위감점":"0","상하위진도수":"0/4/8/4","총학습수":"5","가감총점":"180.97","평균":"36.19","랭킹":"17","본부랭킹":"0","학습평균":"77.2","전국학습평균":"77.2","학습상위":"28%","시간평균":"1.82","전국시간평균":"3.68","시간상위":"88%","출결평균":"9.0","전국출결평균":"8.9","출결상위":"45%","총점평균":"84.25","전국총점평균":"91.2","총점상위":"28%","학습포인트":"141.66","출결포인트":"20","전체포인트":"161.66","복권이벤트":"-","전국랭킹":"616","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-1001001019","회원명":"장민서","생년월일":"2019-01-22","리그명":"B.초1","조명":"09조","학습점수":"122.2","시간점수":"2.48","출결점수":"15","학습가산점":"0","리셋감점":"0","총점":"139.68","상위가점":"0","하위감점":"0","상하위진도수":"0/2/6/6","총학습수":"5","가감총점":"139.68","평균":"27.94","랭킹":"17","본부랭킹":"0","학습평균":"63.7","전국학습평균":"77.2","학습상위":"42%","시간평균":"1.11","전국시간평균":"3.68","시간상위":"95%","출결평균":"6.67","전국출결평균":"8.9","출결상위":"72%","총점평균":"66.2","전국총점평균":"91.2","총점상위":"45%","학습포인트":"109.98","출결포인트":"15","전체포인트":"124.98","복권이벤트":"-","전국랭킹":"1847","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-1001001020","회원명":"권예빈","생년월일":"2019-03-15","리그명":"B.초1","조명":"09조","학습점수":"99.51","시간점수":"1.5","출결점수":"11","학습가산점":"0","리셋감점":"0","총점":"112.01","상위가점":"0","하위감점":"0","상하위진도수":"0/1/4/8","총학습수":"4","가감총점":"112.01","평균":"28.0","랭킹":"19","본부랭킹":"0","학습평균":"50.95","전국학습평균":"77.2","학습상위":"58%","시간평균":"0.72","전국시간평균":"3.68","시간상위":"98%","출결평균":"5.0","전국출결평균":"8.9","출결상위":"85%","총점평균":"52.47","전국총점평균":"91.2","총점상위":"62%","학습포인트":"89.56","출결포인트":"11","전체포인트":"100.56","복권이벤트":"-","전국랭킹":"2185","전국회원수":"2654","최종랭킹":""}],
  "3":[{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-1001001001","회원명":"이서준","생년월일":"2017-03-12","리그명":"B.초1","조명":"01조","학습점수":"284.49","시간점수":"16.35","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"335.84","상위가점":"20.0","하위감점":"0","상하위진도수":"22/0/0/0","총학습수":"11","가감총점":"355.84","평균":"32.35","랭킹":"1","본부랭킹":"0","학습평균":"94.92","전국학습평균":"77.2","학습상위":"2%","시간평균":"4.95","전국시간평균":"3.68","시간상위":"8%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"119.35","전국총점평균":"91.2","총점상위":"1%","학습포인트":"256.04","출결포인트":"32","전체포인트":"288.04","복권이벤트":"-","전국랭킹":"50","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-1001001002","회원명":"김수아","생년월일":"2017-11-08","리그명":"B.초1","조명":"01조","학습점수":"284.18","시간점수":"16.08","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"334.26","상위가점":"20.0","하위감점":"0","상하위진도수":"21/0/0/0","총학습수":"10","가감총점":"354.26","평균":"35.43","랭킹":"4","본부랭킹":"0","학습평균":"98.63","전국학습평균":"77.2","학습상위":"2%","시간평균":"5.15","전국시간평균":"3.68","시간상위":"9%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"118.63","전국총점평균":"91.2","총점상위":"1%","학습포인트":"255.76","출결포인트":"32","전체포인트":"287.76","복권이벤트":"-","전국랭킹":"1","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-1001001003","회원명":"박준호","생년월일":"2017-07-22","리그명":"B.초1","조명":"01조","학습점수":"303.72","시간점수":"14.9","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"353.62","상위가점":"20.0","하위감점":"0","상하위진도수":"20/0/0/0","총학습수":"10","가감총점":"373.62","평균":"37.36","랭킹":"1","본부랭킹":"0","학습평균":"95.58","전국학습평균":"77.2","학습상위":"3%","시간평균":"5.29","전국시간평균":"3.68","시간상위":"12%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"117.92","전국총점평균":"91.2","총점상위":"2%","학습포인트":"273.35","출결포인트":"32","전체포인트":"305.35","복권이벤트":"-","전국랭킹":"42","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-1001001004","회원명":"오지우","생년월일":"2018-02-14","리그명":"B.초1","조명":"02조","학습점수":"280.57","시간점수":"15.16","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"329.73","상위가점":"10.0","하위감점":"0","상하위진도수":"0/19/0/0","총학습수":"10","가감총점":"339.73","평균":"33.97","랭킹":"8","본부랭킹":"0","학습평균":"95.27","전국학습평균":"77.2","학습상위":"4%","시간평균":"4.81","전국시간평균":"3.68","시간상위":"14%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"115.3","전국총점평균":"91.2","총점상위":"3%","학습포인트":"252.51","출결포인트":"32","전체포인트":"284.51","복권이벤트":"-","전국랭킹":"76","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 군포산본 Hive","센터":"대교 군포산본 Hive 001팀","센터타입":"LC","교사명":"송자영","회원번호":"000S-1001001005","회원명":"최민재","생년월일":"2018-08-30","리그명":"B.초1","조명":"03조","학습점수":"304.5","시간점수":"12.91","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"349.41","상위가점":"10.0","하위감점":"0","상하위진도수":"0/18/2/0","총학습수":"10","가감총점":"359.41","평균":"35.94","랭킹":"6","본부랭킹":"0","학습평균":"93.14","전국학습평균":"77.2","학습상위":"5%","시간평균":"4.74","전국시간평균":"3.68","시간상위":"18%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"113.9","전국총점평균":"91.2","총점상위":"4%","학습포인트":"274.05","출결포인트":"30","전체포인트":"304.05","복권이벤트":"-","전국랭킹":"116","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-1001001006","회원명":"한지원","생년월일":"2018-05-18","리그명":"B.초1","조명":"02조","학습점수":"288.22","시간점수":"14.46","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"336.68","상위가점":"10.0","하위감점":"0","상하위진도수":"0/17/4/0","총학습수":"10","가감총점":"346.68","평균":"34.67","랭킹":"4","본부랭킹":"0","학습평균":"91.57","전국학습평균":"77.2","학습상위":"6%","시간평균":"4.29","전국시간평균":"3.68","시간상위":"20%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"113.15","전국총점평균":"91.2","총점상위":"5%","학습포인트":"259.4","출결포인트":"32","전체포인트":"291.4","복권이벤트":"-","전국랭킹":"25","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-1001001007","회원명":"이현우","생년월일":"2017-09-05","리그명":"B.초1","조명":"01조","학습점수":"274.83","시간점수":"13.31","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"322.14","상위가점":"0.0","하위감점":"0","상하위진도수":"0/15/6/0","총학습수":"10","가감총점":"322.14","평균":"32.21","랭킹":"9","본부랭킹":"0","학습평균":"94.33","전국학습평균":"77.2","학습상위":"7%","시간평균":"4.28","전국시간평균":"3.68","시간상위":"25%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"110.13","전국총점평균":"91.2","총점상위":"7%","학습포인트":"247.35","출결포인트":"32","전체포인트":"279.35","복권이벤트":"-","전국랭킹":"102","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-1001001008","회원명":"노서아","생년월일":"2018-01-19","리그명":"B.초1","조명":"03조","학습점수":"285.25","시간점수":"12.09","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"329.34","상위가점":"0.0","하위감점":"0","상하위진도수":"0/14/5/0","총학습수":"10","가감총점":"329.34","평균":"32.93","랭킹":"10","본부랭킹":"0","학습평균":"90.69","전국학습평균":"77.2","학습상위":"8%","시간평균":"4.35","전국시간평균":"3.68","시간상위":"30%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"108.6","전국총점평균":"91.2","총점상위":"8%","학습포인트":"256.73","출결포인트":"30","전체포인트":"286.73","복권이벤트":"-","전국랭킹":"136","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-1001001009","회원명":"강도윤","생년월일":"2017-12-27","리그명":"B.초1","조명":"02조","학습점수":"268.24","시간점수":"12.13","출결점수":"32","학습가산점":"1","리셋감점":"0","총점":"313.37","상위가점":"0.0","하위감점":"0","상하위진도수":"0/13/7/0","총학습수":"10","가감총점":"313.37","평균":"31.34","랭킹":"13","본부랭킹":"0","학습평균":"92.26","전국학습평균":"77.2","학습상위":"9%","시간평균":"3.78","전국시간평균":"3.68","시간상위":"35%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"107.38","전국총점평균":"91.2","총점상위":"9%","학습포인트":"241.42","출결포인트":"32","전체포인트":"273.42","복권이벤트":"-","전국랭킹":"152","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-1001001010","회원명":"윤채원","생년월일":"2018-06-14","리그명":"B.초1","조명":"04조","학습점수":"274.66","시간점수":"10.79","출결점수":"32","학습가산점":"0","리셋감점":"0","총점":"317.45","상위가점":"0.0","하위감점":"0","상하위진도수":"0/12/8/0","총학습수":"10","가감총점":"317.45","평균":"31.74","랭킹":"10","본부랭킹":"0","학습평균":"88.81","전국학습평균":"77.2","학습상위":"10%","시간평균":"3.71","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"106.02","전국총점평균":"91.2","총점상위":"10%","학습포인트":"247.19","출결포인트":"32","전체포인트":"279.19","복권이벤트":"-","전국랭킹":"213","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-1001001011","회원명":"정수현","생년월일":"2017-04-03","리그명":"B.초1","조명":"05조","학습점수":"260.99","시간점수":"10.51","출결점수":"30","학습가산점":"1","리셋감점":"0","총점":"302.5","상위가점":"0.0","하위감점":"0","상하위진도수":"0/11/8/0","총학습수":"10","가감총점":"302.5","평균":"30.25","랭킹":"14","본부랭킹":"0","학습평균":"86.81","전국학습평균":"77.2","학습상위":"11%","시간평균":"3.35","전국시간평균":"3.68","시간상위":"48%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"104.3","전국총점평균":"91.2","총점상위":"11%","학습포인트":"234.89","출결포인트":"30","전체포인트":"264.89","복권이벤트":"-","전국랭킹":"177","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구월성 Hive","센터":"대교 대구월성 Hive 001팀","센터타입":"LC","교사명":"박정락","회원번호":"000S-1001001012","회원명":"이태양","생년월일":"2018-10-08","리그명":"B.초1","조명":"05조","학습점수":"279.34","시간점수":"9.33","출결점수":"32","학습가산점":"0","리셋감점":"0","총점":"320.67","상위가점":"0.0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"10","가감총점":"320.67","평균":"32.07","랭킹":"16","본부랭킹":"0","학습평균":"83.02","전국학습평균":"77.2","학습상위":"13%","시간평균":"3.13","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"102.92","전국총점평균":"91.2","총점상위":"12%","학습포인트":"251.41","출결포인트":"32","전체포인트":"283.41","복권이벤트":"-","전국랭킹":"188","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-1001001013","회원명":"박하은","생년월일":"2017-08-17","리그명":"B.초1","조명":"06조","학습점수":"270.3","시간점수":"9.81","출결점수":"30","학습가산점":"1","리셋감점":"0","총점":"311.11","상위가점":"0.0","하위감점":"0","상하위진도수":"0/9/10/0","총학습수":"10","가감총점":"311.11","평균":"31.11","랭킹":"15","본부랭킹":"0","학습평균":"86.12","전국학습평균":"77.2","학습상위":"14%","시간평균":"3.15","전국시간평균":"3.68","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"101.2","전국총점평균":"91.2","총점상위":"13%","학습포인트":"243.27","출결포인트":"30","전체포인트":"273.27","복권이벤트":"-","전국랭킹":"225","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-1001001014","회원명":"최준서","생년월일":"2018-03-24","리그명":"B.초1","조명":"06조","학습점수":"254.59","시간점수":"8.22","출결점수":"32","학습가산점":"0","리셋감점":"0","총점":"294.81","상위가점":"0.0","하위감점":"0","상하위진도수":"0/8/12/0","총학습수":"10","가감총점":"294.81","평균":"29.48","랭킹":"14","본부랭킹":"0","학습평균":"87.55","전국학습평균":"77.2","학습상위":"15%","시간평균":"2.87","전국시간평균":"3.68","시간상위":"70%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"99.48","전국총점평균":"91.2","총점상위":"15%","학습포인트":"229.13","출결포인트":"32","전체포인트":"261.13","복권이벤트":"-","전국랭킹":"350","전국회원수":"2654","최종랭킹":""},{"본부":"대교 중장본부","지점":"대교 부산남부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"조대교","회원번호":"000S-1001001015","회원명":"임서진","생년월일":"2017-06-11","리그명":"B.초1","조명":"07조","학습점수":"263.52","시간점수":"7.44","출결점수":"32","학습가산점":"0","리셋감점":"0","총점":"302.96","상위가점":"0.0","하위감점":"0","상하위진도수":"0/7/13/0","총학습수":"10","가감총점":"302.96","평균":"30.3","랭킹":"15","본부랭킹":"0","학습평균":"80.22","전국학습평균":"77.2","학습상위":"17%","시간평균":"2.5","전국시간평균":"3.68","시간상위":"75%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"97.23","전국총점평균":"91.2","총점상위":"17%","학습포인트":"237.17","출결포인트":"32","전체포인트":"269.17","복권이벤트":"-","전국랭킹":"394","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 하남 Hive","센터":"대교 하남 Hive 001팀","센터타입":"LC","교사명":"윤희경","회원번호":"000S-1001001016","회원명":"홍민준","생년월일":"2018-07-29","리그명":"B.초1","조명":"07조","학습점수":"246.18","시간점수":"6.83","출결점수":"30","학습가산점":"0","리셋감점":"0","총점":"283.01","상위가점":"0.0","하위감점":"0","상하위진도수":"0/6/12/0","총학습수":"9","가감총점":"283.01","평균":"31.45","랭킹":"17","본부랭킹":"0","학습평균":"82.39","전국학습평균":"77.2","학습상위":"19%","시간평균":"2.35","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"94.3","전국총점평균":"91.2","총점상위":"19%","학습포인트":"221.56","출결포인트":"30","전체포인트":"251.56","복권이벤트":"-","전국랭킹":"400","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-1001001017","회원명":"신채은","생년월일":"2017-02-08","리그명":"B.초1","조명":"08조","학습점수":"240.34","시간점수":"6.05","출결점수":"30","학습가산점":"0","리셋감점":"0","총점":"276.39","상위가점":"0.0","하위감점":"0","상하위진도수":"0/5/10/2","총학습수":"8","가감총점":"276.39","평균":"34.55","랭킹":"17","본부랭킹":"0","학습평균":"75.1","전국학습평균":"77.2","학습상위":"22%","시간평균":"2.12","전국시간평균":"3.68","시간상위":"85%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"89.87","전국총점평균":"91.2","총점상위":"22%","학습포인트":"216.31","출결포인트":"30","전체포인트":"246.31","복권이벤트":"-","전국랭킹":"511","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-1001001018","회원명":"문도현","생년월일":"2017-10-16","리그명":"B.초1","조명":"08조","학습점수":"231.4","시간점수":"5.84","출결점수":"28","학습가산점":"0","리셋감점":"0","총점":"265.24","상위가점":"0.0","하위감점":"0","상하위진도수":"0/4/8/4","총학습수":"8","가감총점":"265.24","평균":"33.16","랭킹":"20","본부랭킹":"0","학습평균":"75.71","전국학습평균":"77.2","학습상위":"28%","시간평균":"1.89","전국시간평균":"3.68","시간상위":"88%","출결평균":"9.0","전국출결평균":"8.9","출결상위":"45%","총점평균":"84.25","전국총점평균":"91.2","총점상위":"28%","학습포인트":"208.26","출결포인트":"28","전체포인트":"236.26","복권이벤트":"-","전국랭킹":"590","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-1001001019","회원명":"장민서","생년월일":"2019-01-22","리그명":"B.초1","조명":"09조","학습점수":"192.07","시간점수":"3.6","출결점수":"21","학습가산점":"0","리셋감점":"0","총점":"216.67","상위가점":"0.0","하위감점":"0","상하위진도수":"0/2/6/6","총학습수":"7","가감총점":"216.67","평균":"30.95","랭킹":"22","본부랭킹":"0","학습평균":"58.45","전국학습평균":"77.2","학습상위":"42%","시간평균":"1.13","전국시간평균":"3.68","시간상위":"95%","출결평균":"6.67","전국출결평균":"8.9","출결상위":"72%","총점평균":"66.2","전국총점평균":"91.2","총점상위":"45%","학습포인트":"172.86","출결포인트":"21","전체포인트":"193.86","복권이벤트":"-","전국랭킹":"1846","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-1001001020","회원명":"권예빈","생년월일":"2019-03-15","리그명":"B.초1","조명":"09조","학습점수":"159.07","시간점수":"2.49","출결점수":"16","학습가산점":"0","리셋감점":"0","총점":"177.56","상위가점":"0.0","하위감점":"0","상하위진도수":"0/1/4/8","총학습수":"6","가감총점":"177.56","평균":"29.59","랭킹":"20","본부랭킹":"0","학습평균":"48.47","전국학습평균":"77.2","학습상위":"58%","시간평균":"0.74","전국시간평균":"3.68","시간상위":"98%","출결평균":"5.0","전국출결평균":"8.9","출결상위":"85%","총점평균":"52.47","전국총점평균":"91.2","총점상위":"62%","학습포인트":"143.16","출결포인트":"16","전체포인트":"159.16","복권이벤트":"-","전국랭킹":"2171","전국회원수":"2654","최종랭킹":""}],
  "4":[{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-1001001001","회원명":"이서준","생년월일":"2017-03-12","리그명":"B.초1","조명":"01조","학습점수":"404.94","시간점수":"19.48","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"469.42","상위가점":"20.0","하위감점":"0.0","상하위진도수":"22/0/0/0","총학습수":"15","가감총점":"489.42","평균":"32.63","랭킹":"4","본부랭킹":"0","학습평균":"101.38","전국학습평균":"77.2","학습상위":"2%","시간평균":"4.89","전국시간평균":"3.68","시간상위":"8%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"119.35","전국총점평균":"91.2","총점상위":"1%","학습포인트":"364.45","출결포인트":"41","전체포인트":"405.45","복권이벤트":"-","전국랭킹":"56","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-1001001002","회원명":"김수아","생년월일":"2017-11-08","리그명":"B.초1","조명":"01조","학습점수":"397.88","시간점수":"20.28","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"462.16","상위가점":"20.0","하위감점":"0.0","상하위진도수":"21/0/0/0","총학습수":"14","가감총점":"482.16","평균":"34.44","랭킹":"3","본부랭킹":"0","학습평균":"92.8","전국학습평균":"77.2","학습상위":"2%","시간평균":"5.02","전국시간평균":"3.68","시간상위":"9%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"118.63","전국총점평균":"91.2","총점상위":"1%","학습포인트":"358.09","출결포인트":"41","전체포인트":"399.09","복권이벤트":"-","전국랭킹":"21","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-1001001003","회원명":"박준호","생년월일":"2017-07-22","리그명":"B.초1","조명":"01조","학습점수":"387.08","시간점수":"21.17","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"453.25","상위가점":"20.0","하위감점":"0.0","상하위진도수":"20/0/0/0","총학습수":"13","가감총점":"473.25","평균":"36.4","랭킹":"5","본부랭킹":"0","학습평균":"99.32","전국학습평균":"77.2","학습상위":"3%","시간평균":"4.69","전국시간평균":"3.68","시간상위":"12%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"117.92","전국총점평균":"91.2","총점상위":"2%","학습포인트":"348.37","출결포인트":"41","전체포인트":"389.37","복권이벤트":"-","전국랭킹":"1","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-1001001004","회원명":"오지우","생년월일":"2018-02-14","리그명":"B.초1","조명":"02조","학습점수":"401.97","시간점수":"18.03","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"464.0","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/19/0/0","총학습수":"13","가감총점":"474.0","평균":"36.46","랭킹":"2","본부랭킹":"0","학습평균":"94.5","전국학습평균":"77.2","학습상위":"4%","시간평균":"4.79","전국시간평균":"3.68","시간상위":"14%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"115.3","전국총점평균":"91.2","총점상위":"3%","학습포인트":"361.77","출결포인트":"41","전체포인트":"402.77","복권이벤트":"-","전국랭킹":"26","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 군포산본 Hive","센터":"대교 군포산본 Hive 001팀","센터타입":"LC","교사명":"송자영","회원번호":"000S-1001001005","회원명":"최민재","생년월일":"2018-08-30","리그명":"B.초1","조명":"03조","학습점수":"392.15","시간점수":"18.22","출결점수":"40","학습가산점":"3","리셋감점":"0","총점":"453.37","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/18/2/0","총학습수":"13","가감총점":"463.37","평균":"35.64","랭킹":"4","본부랭킹":"0","학습평균":"94.21","전국학습평균":"77.2","학습상위":"5%","시간평균":"4.5","전국시간평균":"3.68","시간상위":"18%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"113.9","전국총점평균":"91.2","총점상위":"4%","학습포인트":"352.94","출결포인트":"40","전체포인트":"392.94","복권이벤트":"-","전국랭킹":"104","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-1001001006","회원명":"한지원","생년월일":"2018-05-18","리그명":"B.초1","조명":"02조","학습점수":"369.7","시간점수":"18.63","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"432.33","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/17/4/0","총학습수":"14","가감총점":"442.33","평균":"31.59","랭킹":"8","본부랭킹":"0","학습평균":"93.54","전국학습평균":"77.2","학습상위":"6%","시간평균":"4.4","전국시간평균":"3.68","시간상위":"20%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"113.15","전국총점평균":"91.2","총점상위":"5%","학습포인트":"332.73","출결포인트":"41","전체포인트":"373.73","복권이벤트":"-","전국랭킹":"77","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-1001001007","회원명":"이현우","생년월일":"2017-09-05","리그명":"B.초1","조명":"01조","학습점수":"370.03","시간점수":"18.72","출결점수":"41","학습가산점":"2","리셋감점":"0","총점":"431.75","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/15/6/0","총학습수":"14","가감총점":"431.75","평균":"30.84","랭킹":"5","본부랭킹":"0","학습평균":"89.5","전국학습평균":"77.2","학습상위":"7%","시간평균":"4.66","전국시간평균":"3.68","시간상위":"25%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"110.13","전국총점평균":"91.2","총점상위":"7%","학습포인트":"333.03","출결포인트":"41","전체포인트":"374.03","복권이벤트":"-","전국랭킹":"32","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-1001001008","회원명":"노서아","생년월일":"2018-01-19","리그명":"B.초1","조명":"03조","학습점수":"386.74","시간점수":"17.32","출결점수":"40","학습가산점":"2","리셋감점":"0","총점":"446.06","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/14/5/0","총학습수":"13","가감총점":"446.06","평균":"34.31","랭킹":"8","본부랭킹":"0","학습평균":"87.77","전국학습평균":"77.2","학습상위":"8%","시간평균":"4.16","전국시간평균":"3.68","시간상위":"30%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"108.6","전국총점평균":"91.2","총점상위":"8%","학습포인트":"348.07","출결포인트":"40","전체포인트":"388.07","복권이벤트":"-","전국랭킹":"100","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-1001001009","회원명":"강도윤","생년월일":"2017-12-27","리그명":"B.초1","조명":"02조","학습점수":"369.42","시간점수":"14.89","출결점수":"41","학습가산점":"1","리셋감점":"0","총점":"426.31","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/13/7/0","총학습수":"13","가감총점":"426.31","평균":"32.79","랭킹":"11","본부랭킹":"0","학습평균":"87.7","전국학습평균":"77.2","학습상위":"9%","시간평균":"3.98","전국시간평균":"3.68","시간상위":"35%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"107.38","전국총점평균":"91.2","총점상위":"9%","학습포인트":"332.48","출결포인트":"41","전체포인트":"373.48","복권이벤트":"-","전국랭킹":"172","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-1001001010","회원명":"윤채원","생년월일":"2018-06-14","리그명":"B.초1","조명":"04조","학습점수":"374.18","시간점수":"14.68","출결점수":"41","학습가산점":"1","리셋감점":"0","총점":"430.86","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/12/8/0","총학습수":"13","가감총점":"430.86","평균":"33.14","랭킹":"11","본부랭킹":"0","학습평균":"91.47","전국학습평균":"77.2","학습상위":"10%","시간평균":"3.72","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"106.02","전국총점평균":"91.2","총점상위":"10%","학습포인트":"336.76","출결포인트":"41","전체포인트":"377.76","복권이벤트":"-","전국랭킹":"218","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-1001001011","회원명":"정수현","생년월일":"2017-04-03","리그명":"B.초1","조명":"05조","학습점수":"361.21","시간점수":"13.25","출결점수":"40","학습가산점":"1","리셋감점":"0","총점":"415.46","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/11/8/0","총학습수":"13","가감총점":"415.46","평균":"31.96","랭킹":"11","본부랭킹":"0","학습평균":"87.31","전국학습평균":"77.2","학습상위":"11%","시간평균":"3.49","전국시간평균":"3.68","시간상위":"48%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"104.3","전국총점평균":"91.2","총점상위":"11%","학습포인트":"325.09","출결포인트":"40","전체포인트":"365.09","복권이벤트":"-","전국랭킹":"218","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구월성 Hive","센터":"대교 대구월성 Hive 001팀","센터타입":"LC","교사명":"박정락","회원번호":"000S-1001001012","회원명":"이태양","생년월일":"2018-10-08","리그명":"B.초1","조명":"05조","학습점수":"362.34","시간점수":"12.89","출결점수":"41","학습가산점":"1","리셋감점":"0","총점":"417.23","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/10/10/0","총학습수":"13","가감총점":"417.23","평균":"32.09","랭킹":"13","본부랭킹":"0","학습평균":"90.81","전국학습평균":"77.2","학습상위":"13%","시간평균":"3.17","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"102.92","전국총점평균":"91.2","총점상위":"12%","학습포인트":"326.11","출결포인트":"41","전체포인트":"367.11","복권이벤트":"-","전국랭킹":"180","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-1001001013","회원명":"박하은","생년월일":"2017-08-17","리그명":"B.초1","조명":"06조","학습점수":"367.76","시간점수":"12.4","출결점수":"40","학습가산점":"1","리셋감점":"0","총점":"421.16","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/9/10/0","총학습수":"13","가감총점":"421.16","평균":"32.4","랭킹":"16","본부랭킹":"0","학습평균":"81.74","전국학습평균":"77.2","학습상위":"14%","시간평균":"3.29","전국시간평균":"3.68","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"101.2","전국총점평균":"91.2","총점상위":"13%","학습포인트":"330.98","출결포인트":"40","전체포인트":"370.98","복권이벤트":"-","전국랭킹":"264","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-1001001014","회원명":"최준서","생년월일":"2018-03-24","리그명":"B.초1","조명":"06조","학습점수":"336.47","시간점수":"11.79","출결점수":"41","학습가산점":"1","리셋감점":"0","총점":"390.26","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/8/12/0","총학습수":"13","가감총점":"390.26","평균":"30.02","랭킹":"16","본부랭킹":"0","학습평균":"82.84","전국학습평균":"77.2","학습상위":"15%","시간평균":"2.82","전국시간평균":"3.68","시간상위":"70%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"99.48","전국총점평균":"91.2","총점상위":"15%","학습포인트":"302.82","출결포인트":"41","전체포인트":"343.82","복권이벤트":"-","전국랭킹":"275","전국회원수":"2654","최종랭킹":""},{"본부":"대교 중장본부","지점":"대교 부산남부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"조대교","회원번호":"000S-1001001015","회원명":"임서진","생년월일":"2017-06-11","리그명":"B.초1","조명":"07조","학습점수":"331.92","시간점수":"10.39","출결점수":"41","학습가산점":"1","리셋감점":"0","총점":"384.31","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/7/13/0","총학습수":"13","가감총점":"384.31","평균":"29.56","랭킹":"14","본부랭킹":"0","학습평균":"81.89","전국학습평균":"77.2","학습상위":"17%","시간평균":"2.5","전국시간평균":"3.68","시간상위":"75%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"97.23","전국총점평균":"91.2","총점상위":"17%","학습포인트":"298.73","출결포인트":"41","전체포인트":"339.73","복권이벤트":"-","전국랭킹":"327","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 하남 Hive","센터":"대교 하남 Hive 001팀","센터타입":"LC","교사명":"윤희경","회원번호":"000S-1001001016","회원명":"홍민준","생년월일":"2018-07-29","리그명":"B.초1","조명":"07조","학습점수":"328.33","시간점수":"10.22","출결점수":"40","학습가산점":"1","리셋감점":"0","총점":"379.55","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/6/12/0","총학습수":"12","가감총점":"379.55","평균":"31.63","랭킹":"16","본부랭킹":"0","학습평균":"81.4","전국학습평균":"77.2","학습상위":"19%","시간평균":"2.53","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"94.3","전국총점평균":"91.2","총점상위":"19%","학습포인트":"295.5","출결포인트":"40","전체포인트":"335.5","복권이벤트":"-","전국랭킹":"416","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-1001001017","회원명":"신채은","생년월일":"2017-02-08","리그명":"B.초1","조명":"08조","학습점수":"328.71","시간점수":"8.23","출결점수":"40","학습가산점":"0","리셋감점":"0","총점":"376.94","상위가점":"0.0","하위감점":"-10.0","상하위진도수":"0/5/10/2","총학습수":"11","가감총점":"366.94","평균":"33.36","랭킹":"16","본부랭킹":"0","학습평균":"74.87","전국학습평균":"77.2","학습상위":"22%","시간평균":"2.18","전국시간평균":"3.68","시간상위":"85%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"89.87","전국총점평균":"91.2","총점상위":"22%","학습포인트":"295.84","출결포인트":"40","전체포인트":"335.84","복권이벤트":"-","전국랭킹":"470","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-1001001018","회원명":"문도현","생년월일":"2017-10-16","리그명":"B.초1","조명":"08조","학습점수":"314.65","시간점수":"7.65","출결점수":"37","학습가산점":"0","리셋감점":"0","총점":"359.3","상위가점":"0.0","하위감점":"-20.0","상하위진도수":"0/4/8/4","총학습수":"11","가감총점":"339.3","평균":"30.85","랭킹":"17","본부랭킹":"0","학습평균":"75.35","전국학습평균":"77.2","학습상위":"28%","시간평균":"1.86","전국시간평균":"3.68","시간상위":"88%","출결평균":"9.0","전국출결평균":"8.9","출결상위":"45%","총점평균":"84.25","전국총점평균":"91.2","총점상위":"28%","학습포인트":"283.19","출결포인트":"37","전체포인트":"320.19","복권이벤트":"-","전국랭킹":"610","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-1001001019","회원명":"장민서","생년월일":"2019-01-22","리그명":"B.초1","조명":"09조","학습점수":"254.95","시간점수":"4.74","출결점수":"27","학습가산점":"0","리셋감점":"0","총점":"286.69","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0/2/6/6","총학습수":"9","가감총점":"256.69","평균":"28.52","랭킹":"22","본부랭킹":"0","학습평균":"62.34","전국학습평균":"77.2","학습상위":"42%","시간평균":"1.26","전국시간평균":"3.68","시간상위":"95%","출결평균":"6.67","전국출결평균":"8.9","출결상위":"72%","총점평균":"66.2","전국총점평균":"91.2","총점상위":"45%","학습포인트":"229.45","출결포인트":"27","전체포인트":"256.45","복권이벤트":"-","전국랭킹":"1884","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-1001001020","회원명":"권예빈","생년월일":"2019-03-15","리그명":"B.초1","조명":"09조","학습점수":"203.01","시간점수":"3.35","출결점수":"20","학습가산점":"0","리셋감점":"0","총점":"226.36","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0/1/4/8","총학습수":"9","가감총점":"196.36","평균":"21.82","랭킹":"20","본부랭킹":"0","학습평균":"49.81","전국학습평균":"77.2","학습상위":"58%","시간평균":"0.78","전국시간평균":"3.68","시간상위":"98%","출결평균":"5.0","전국출결평균":"8.9","출결상위":"85%","총점평균":"52.47","전국총점평균":"91.2","총점상위":"62%","학습포인트":"182.71","출결포인트":"20","전체포인트":"202.71","복권이벤트":"-","전국랭킹":"2190","전국회원수":"2654","최종랭킹":""}],
  "5":[{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-1001001001","회원명":"이서준","생년월일":"2017-03-12","리그명":"B.초1","조명":"01조","학습점수":"504.88","시간점수":"27.27","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"587.15","상위가점":"20.0","하위감점":"0.0","상하위진도수":"22/0/0/0","총학습수":"18","가감총점":"607.15","평균":"33.73","랭킹":"3","본부랭킹":"0","학습평균":"95.2","전국학습평균":"77.2","학습상위":"2%","시간평균":"4.87","전국시간평균":"3.68","시간상위":"8%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"119.35","전국총점평균":"91.2","총점상위":"1%","학습포인트":"454.39","출결포인트":"50","전체포인트":"504.39","복권이벤트":"-","전국랭킹":"1","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-1001001002","회원명":"김수아","생년월일":"2017-11-08","리그명":"B.초1","조명":"01조","학습점수":"493.94","시간점수":"24.0","출결점수":"50","학습가산점":"4","리셋감점":"0","총점":"571.94","상위가점":"20.0","하위감점":"0.0","상하위진도수":"21/0/0/0","총학습수":"18","가감총점":"591.94","평균":"32.89","랭킹":"2","본부랭킹":"0","학습평균":"94.08","전국학습평균":"77.2","학습상위":"2%","시간평균":"5.28","전국시간평균":"3.68","시간상위":"9%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"118.63","전국총점평균":"91.2","총점상위":"1%","학습포인트":"444.55","출결포인트":"50","전체포인트":"494.55","복권이벤트":"-","전국랭킹":"84","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-1001001003","회원명":"박준호","생년월일":"2017-07-22","리그명":"B.초1","조명":"01조","학습점수":"516.01","시간점수":"23.22","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"594.23","상위가점":"20.0","하위감점":"0.0","상하위진도수":"20/0/0/0","총학습수":"17","가감총점":"614.23","평균":"36.13","랭킹":"5","본부랭킹":"0","학습평균":"94.41","전국학습평균":"77.2","학습상위":"3%","시간평균":"5.01","전국시간평균":"3.68","시간상위":"12%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"117.92","전국총점평균":"91.2","총점상위":"2%","학습포인트":"464.41","출결포인트":"50","전체포인트":"514.41","복권이벤트":"-","전국랭킹":"49","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-1001001004","회원명":"오지우","생년월일":"2018-02-14","리그명":"B.초1","조명":"02조","학습점수":"512.26","시간점수":"25.1","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"590.36","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/19/0/0","총학습수":"16","가감총점":"600.36","평균":"37.52","랭킹":"2","본부랭킹":"0","학습평균":"99.07","전국학습평균":"77.2","학습상위":"4%","시간평균":"4.9","전국시간평균":"3.68","시간상위":"14%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"115.3","전국총점평균":"91.2","총점상위":"3%","학습포인트":"461.03","출결포인트":"50","전체포인트":"511.03","복권이벤트":"-","전국랭킹":"49","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 군포산본 Hive","센터":"대교 군포산본 Hive 001팀","센터타입":"LC","교사명":"송자영","회원번호":"000S-1001001005","회원명":"최민재","생년월일":"2018-08-30","리그명":"B.초1","조명":"03조","학습점수":"469.88","시간점수":"23.45","출결점수":"49","학습가산점":"4","리셋감점":"0","총점":"546.33","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/18/2/0","총학습수":"17","가감총점":"556.33","평균":"32.73","랭킹":"7","본부랭킹":"0","학습평균":"98.53","전국학습평균":"77.2","학습상위":"5%","시간평균":"4.58","전국시간평균":"3.68","시간상위":"18%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"113.9","전국총점평균":"91.2","총점상위":"4%","학습포인트":"422.89","출결포인트":"49","전체포인트":"471.89","복권이벤트":"-","전국랭킹":"27","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-1001001006","회원명":"한지원","생년월일":"2018-05-18","리그명":"B.초1","조명":"02조","학습점수":"495.79","시간점수":"23.85","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"572.64","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/17/4/0","총학습수":"18","가감총점":"582.64","평균":"32.37","랭킹":"9","본부랭킹":"0","학습평균":"93.33","전국학습평균":"77.2","학습상위":"6%","시간평균":"4.31","전국시간평균":"3.68","시간상위":"20%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"113.15","전국총점평균":"91.2","총점상위":"5%","학습포인트":"446.21","출결포인트":"50","전체포인트":"496.21","복권이벤트":"-","전국랭킹":"25","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-1001001007","회원명":"이현우","생년월일":"2017-09-05","리그명":"B.초1","조명":"01조","학습점수":"463.83","시간점수":"21.57","출결점수":"50","학습가산점":"2","리셋감점":"0","총점":"537.4","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/15/6/0","총학습수":"18","가감총점":"537.4","평균":"29.86","랭킹":"8","본부랭킹":"0","학습평균":"92.53","전국학습평균":"77.2","학습상위":"7%","시간평균":"4.13","전국시간평균":"3.68","시간상위":"25%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"110.13","전국총점평균":"91.2","총점상위":"7%","학습포인트":"417.45","출결포인트":"50","전체포인트":"467.45","복권이벤트":"-","전국랭킹":"99","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-1001001008","회원명":"노서아","생년월일":"2018-01-19","리그명":"B.초1","조명":"03조","학습점수":"464.85","시간점수":"20.11","출결점수":"49","학습가산점":"2","리셋감점":"0","총점":"535.96","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/14/5/0","총학습수":"16","가감총점":"535.96","평균":"33.5","랭킹":"9","본부랭킹":"0","학습평균":"89.82","전국학습평균":"77.2","학습상위":"8%","시간평균":"4.23","전국시간평균":"3.68","시간상위":"30%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"108.6","전국총점평균":"91.2","총점상위":"8%","학습포인트":"418.37","출결포인트":"49","전체포인트":"467.37","복권이벤트":"-","전국랭킹":"158","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-1001001009","회원명":"강도윤","생년월일":"2017-12-27","리그명":"B.초1","조명":"02조","학습점수":"478.45","시간점수":"20.19","출결점수":"50","학습가산점":"2","리셋감점":"0","총점":"550.64","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/13/7/0","총학습수":"17","가감총점":"550.64","평균":"32.39","랭킹":"7","본부랭킹":"0","학습평균":"86.44","전국학습평균":"77.2","학습상위":"9%","시간평균":"4.06","전국시간평균":"3.68","시간상위":"35%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"107.38","전국총점평균":"91.2","총점상위":"9%","학습포인트":"430.61","출결포인트":"50","전체포인트":"480.61","복권이벤트":"-","전국랭킹":"124","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-1001001010","회원명":"윤채원","생년월일":"2018-06-14","리그명":"B.초1","조명":"04조","학습점수":"450.07","시간점수":"19.41","출결점수":"50","학습가산점":"1","리셋감점":"0","총점":"520.48","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/12/8/0","총학습수":"17","가감총점":"520.48","평균":"30.62","랭킹":"13","본부랭킹":"0","학습평균":"92.67","전국학습평균":"77.2","학습상위":"10%","시간평균":"3.66","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"106.02","전국총점평균":"91.2","총점상위":"10%","학습포인트":"405.06","출결포인트":"50","전체포인트":"455.06","복권이벤트":"-","전국랭킹":"185","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-1001001011","회원명":"정수현","생년월일":"2017-04-03","리그명":"B.초1","조명":"05조","학습점수":"457.08","시간점수":"16.74","출결점수":"49","학습가산점":"2","리셋감점":"0","총점":"524.82","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/11/8/0","총학습수":"16","가감총점":"524.82","평균":"32.8","랭킹":"11","본부랭킹":"0","학습평균":"92.19","전국학습평균":"77.2","학습상위":"11%","시간평균":"3.65","전국시간평균":"3.68","시간상위":"48%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"104.3","전국총점평균":"91.2","총점상위":"11%","학습포인트":"411.37","출결포인트":"49","전체포인트":"460.37","복권이벤트":"-","전국랭킹":"184","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구월성 Hive","센터":"대교 대구월성 Hive 001팀","센터타입":"LC","교사명":"박정락","회원번호":"000S-1001001012","회원명":"이태양","생년월일":"2018-10-08","리그명":"B.초1","조명":"05조","학습점수":"441.84","시간점수":"16.9","출결점수":"50","학습가산점":"1","리셋감점":"0","총점":"509.74","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/10/10/0","총학습수":"17","가감총점":"509.74","평균":"29.98","랭킹":"10","본부랭킹":"0","학습평균":"87.18","전국학습평균":"77.2","학습상위":"13%","시간평균":"3.41","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"102.92","전국총점평균":"91.2","총점상위":"12%","학습포인트":"397.66","출결포인트":"50","전체포인트":"447.66","복권이벤트":"-","전국랭킹":"217","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-1001001013","회원명":"박하은","생년월일":"2017-08-17","리그명":"B.초1","조명":"06조","학습점수":"432.45","시간점수":"14.71","출결점수":"49","학습가산점":"2","리셋감점":"0","총점":"498.16","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/9/10/0","총학습수":"16","가감총점":"498.16","평균":"31.14","랭킹":"16","본부랭킹":"0","학습평균":"89.29","전국학습평균":"77.2","학습상위":"14%","시간평균":"3.36","전국시간평균":"3.68","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"101.2","전국총점평균":"91.2","총점상위":"13%","학습포인트":"389.2","출결포인트":"49","전체포인트":"438.2","복권이벤트":"-","전국랭킹":"324","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-1001001014","회원명":"최준서","생년월일":"2018-03-24","리그명":"B.초1","조명":"06조","학습점수":"449.47","시간점수":"13.63","출결점수":"50","학습가산점":"1","리셋감점":"0","총점":"514.1","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/8/12/0","총학습수":"17","가감총점":"514.1","평균":"30.24","랭킹":"17","본부랭킹":"0","학습평균":"83.81","전국학습평균":"77.2","학습상위":"15%","시간평균":"2.69","전국시간평균":"3.68","시간상위":"70%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"99.48","전국총점평균":"91.2","총점상위":"15%","학습포인트":"404.52","출결포인트":"50","전체포인트":"454.52","복권이벤트":"-","전국랭킹":"319","전국회원수":"2654","최종랭킹":""},{"본부":"대교 중장본부","지점":"대교 부산남부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"조대교","회원번호":"000S-1001001015","회원명":"임서진","생년월일":"2017-06-11","리그명":"B.초1","조명":"07조","학습점수":"413.61","시간점수":"14.25","출결점수":"50","학습가산점":"1","리셋감점":"0","총점":"478.86","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/7/13/0","총학습수":"17","가감총점":"478.86","평균":"28.17","랭킹":"15","본부랭킹":"0","학습평균":"81.68","전국학습평균":"77.2","학습상위":"17%","시간평균":"2.55","전국시간평균":"3.68","시간상위":"75%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"97.23","전국총점평균":"91.2","총점상위":"17%","학습포인트":"372.25","출결포인트":"50","전체포인트":"422.25","복권이벤트":"-","전국랭킹":"416","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 하남 Hive","센터":"대교 하남 Hive 001팀","센터타입":"LC","교사명":"윤희경","회원번호":"000S-1001001016","회원명":"홍민준","생년월일":"2018-07-29","리그명":"B.초1","조명":"07조","학습점수":"395.14","시간점수":"11.24","출결점수":"49","학습가산점":"1","리셋감점":"0","총점":"456.38","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/6/12/0","총학습수":"15","가감총점":"456.38","평균":"30.43","랭킹":"20","본부랭킹":"0","학습평균":"76.27","전국학습평균":"77.2","학습상위":"19%","시간평균":"2.51","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"94.3","전국총점평균":"91.2","총점상위":"19%","학습포인트":"355.63","출결포인트":"49","전체포인트":"404.63","복권이벤트":"-","전국랭킹":"472","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-1001001017","회원명":"신채은","생년월일":"2017-02-08","리그명":"B.초1","조명":"08조","학습점수":"411.68","시간점수":"11.36","출결점수":"49","학습가산점":"0","리셋감점":"0","총점":"472.04","상위가점":"0.0","하위감점":"-10.0","상하위진도수":"0/5/10/2","총학습수":"14","가감총점":"462.04","평균":"33.0","랭킹":"15","본부랭킹":"0","학습평균":"75.98","전국학습평균":"77.2","학습상위":"22%","시간평균":"2.23","전국시간평균":"3.68","시간상위":"85%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"89.87","전국총점평균":"91.2","총점상위":"22%","학습포인트":"370.51","출결포인트":"49","전체포인트":"419.51","복권이벤트":"-","전국랭킹":"522","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-1001001018","회원명":"문도현","생년월일":"2017-10-16","리그명":"B.초1","조명":"08조","학습점수":"369.19","시간점수":"9.17","출결점수":"45","학습가산점":"0","리셋감점":"0","총점":"423.36","상위가점":"0.0","하위감점":"-20.0","상하위진도수":"0/4/8/4","총학습수":"13","가감총점":"403.36","평균":"31.03","랭킹":"17","본부랭킹":"0","학습평균":"76.91","전국학습평균":"77.2","학습상위":"28%","시간평균":"1.95","전국시간평균":"3.68","시간상위":"88%","출결평균":"9.0","전국출결평균":"8.9","출결상위":"45%","총점평균":"84.25","전국총점평균":"91.2","총점상위":"28%","학습포인트":"332.27","출결포인트":"45","전체포인트":"377.27","복권이벤트":"-","전국랭킹":"535","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-1001001019","회원명":"장민서","생년월일":"2019-01-22","리그명":"B.초1","조명":"09조","학습점수":"326.45","시간점수":"5.55","출결점수":"34","학습가산점":"0","리셋감점":"0","총점":"366.0","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0/2/6/6","총학습수":"12","가감총점":"336.0","평균":"28.0","랭킹":"20","본부랭킹":"0","학습평균":"60.87","전국학습평균":"77.2","학습상위":"42%","시간평균":"1.2","전국시간평균":"3.68","시간상위":"95%","출결평균":"6.67","전국출결평균":"8.9","출결상위":"72%","총점평균":"66.2","전국총점평균":"91.2","총점상위":"45%","학습포인트":"293.81","출결포인트":"34","전체포인트":"327.81","복권이벤트":"-","전국랭킹":"1817","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-1001001020","회원명":"권예빈","생년월일":"2019-03-15","리그명":"B.초1","조명":"09조","학습점수":"251.55","시간점수":"3.87","출결점수":"25","학습가산점":"0","리셋감점":"0","총점":"280.42","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0/1/4/8","총학습수":"11","가감총점":"250.42","평균":"22.77","랭킹":"20","본부랭킹":"0","학습평균":"51.4","전국학습평균":"77.2","학습상위":"58%","시간평균":"0.77","전국시간평균":"3.68","시간상위":"98%","출결평균":"5.0","전국출결평균":"8.9","출결상위":"85%","총점평균":"52.47","전국총점평균":"91.2","총점상위":"62%","학습포인트":"226.4","출결포인트":"25","전체포인트":"251.4","복권이벤트":"-","전국랭킹":"2267","전국회원수":"2654","최종랭킹":""}],
  "6":[{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-1001001001","회원명":"이서준","생년월일":"2017-03-12","리그명":"B.초1","조명":"01조","학습점수":"598","시간점수":"32.1","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"696.1","상위가점":"20","하위감점":"0","상하위진도수":"22/0/0/0","총학습수":"22","가감총점":"716.1","평균":"119.35","랭킹":"1","본부랭킹":"1","학습평균":"99.67","전국학습평균":"77.2","학습상위":"2%","시간평균":"5.35","전국시간평균":"3.68","시간상위":"8%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"119.35","전국총점평균":"91.2","총점상위":"1%","학습포인트":"598","출결포인트":"60","전체포인트":"658","복권이벤트":"-","전국랭킹":"5","전국회원수":"2654","최종랭킹":"Grand Master"},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-1001001002","회원명":"김수아","생년월일":"2017-11-08","리그명":"B.초1","조명":"01조","학습점수":"595","시간점수":"31.8","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"691.8","상위가점":"20","하위감점":"0","상하위진도수":"21/0/0/0","총학습수":"21","가감총점":"711.8","평균":"118.63","랭킹":"2","본부랭킹":"1","학습평균":"99.17","전국학습평균":"77.2","학습상위":"2%","시간평균":"5.3","전국시간평균":"3.68","시간상위":"9%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"118.63","전국총점평균":"91.2","총점상위":"1%","학습포인트":"595","출결포인트":"60","전체포인트":"655","복권이벤트":"-","전국랭킹":"8","전국회원수":"2654","최종랭킹":"Grand Master"},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-1001001003","회원명":"박준호","생년월일":"2017-07-22","리그명":"B.초1","조명":"01조","학습점수":"591","시간점수":"30.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"687.5","상위가점":"20","하위감점":"0","상하위진도수":"20/0/0/0","총학습수":"20","가감총점":"707.5","평균":"117.92","랭킹":"3","본부랭킹":"1","학습평균":"98.5","전국학습평균":"77.2","학습상위":"3%","시간평균":"5.08","전국시간평균":"3.68","시간상위":"12%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"117.92","전국총점평균":"91.2","총점상위":"2%","학습포인트":"591","출결포인트":"60","전체포인트":"651","복권이벤트":"-","전국랭킹":"15","전국회원수":"2654","최종랭킹":"Master"},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-1001001004","회원명":"오지우","생년월일":"2018-02-14","리그명":"B.초1","조명":"02조","학습점수":"588","시간점수":"29.8","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"681.8","상위가점":"10","하위감점":"0","상하위진도수":"0/19/0/0","총학습수":"19","가감총점":"691.8","평균":"115.3","랭킹":"4","본부랭킹":"1","학습평균":"98.0","전국학습평균":"77.2","학습상위":"4%","시간평균":"4.97","전국시간평균":"3.68","시간상위":"14%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"115.3","전국총점평균":"91.2","총점상위":"3%","학습포인트":"588","출결포인트":"60","전체포인트":"648","복권이벤트":"-","전국랭킹":"22","전국회원수":"2654","최종랭킹":"Master"},{"본부":"대교 경기본부","지점":"대교 군포산본 Hive","센터":"대교 군포산본 Hive 001팀","센터타입":"LC","교사명":"송자영","회원번호":"000S-1001001005","회원명":"최민재","생년월일":"2018-08-30","리그명":"B.초1","조명":"03조","학습점수":"582","시간점수":"28.4","출결점수":"58","학습가산점":"5","리셋감점":"0","총점":"673.4","상위가점":"10","하위감점":"0","상하위진도수":"0/18/2/0","총학습수":"20","가감총점":"683.4","평균":"113.9","랭킹":"5","본부랭킹":"2","학습평균":"97.0","전국학습평균":"77.2","학습상위":"5%","시간평균":"4.73","전국시간평균":"3.68","시간상위":"18%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"113.9","전국총점평균":"91.2","총점상위":"4%","학습포인트":"482","출결포인트":"50","전체포인트":"532","복권이벤트":"-","전국랭킹":"38","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-1001001006","회원명":"한지원","생년월일":"2018-05-18","리그명":"B.초1","조명":"02조","학습점수":"577","시간점수":"27.9","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"668.9","상위가점":"10","하위감점":"0","상하위진도수":"0/17/4/0","총학습수":"21","가감총점":"678.9","평균":"113.15","랭킹":"6","본부랭킹":"1","학습평균":"96.17","전국학습평균":"77.2","학습상위":"6%","시간평균":"4.65","전국시간평균":"3.68","시간상위":"20%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"113.15","전국총점평균":"91.2","총점상위":"5%","학습포인트":"577","출결포인트":"60","전체포인트":"637","복권이벤트":"-","전국랭킹":"45","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-1001001007","회원명":"이현우","생년월일":"2017-09-05","리그명":"B.초1","조명":"01조","학습점수":"571","시간점수":"26.8","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"660.8","상위가점":"0","하위감점":"0","상하위진도수":"0/15/6/0","총학습수":"21","가감총점":"660.8","평균":"110.13","랭킹":"7","본부랭킹":"1","학습평균":"95.17","전국학습평균":"77.2","학습상위":"7%","시간평균":"4.47","전국시간평균":"3.68","시간상위":"25%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"110.13","전국총점평균":"91.2","총점상위":"7%","학습포인트":"571","출결포인트":"60","전체포인트":"631","복권이벤트":"-","전국랭킹":"62","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-1001001008","회원명":"노서아","생년월일":"2018-01-19","리그명":"B.초1","조명":"03조","학습점수":"565","시간점수":"25.6","출결점수":"58","학습가산점":"3","리셋감점":"0","총점":"651.6","상위가점":"0","하위감점":"0","상하위진도수":"0/14/5/0","총학습수":"19","가감총점":"651.6","평균":"108.6","랭킹":"8","본부랭킹":"1","학습평균":"94.17","전국학습평균":"77.2","학습상위":"8%","시간평균":"4.27","전국시간평균":"3.68","시간상위":"30%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"108.6","전국총점평균":"91.2","총점상위":"8%","학습포인트":"465","출결포인트":"50","전체포인트":"515","복권이벤트":"-","전국랭킹":"89","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-1001001009","회원명":"강도윤","생년월일":"2017-12-27","리그명":"B.초1","조명":"02조","학습점수":"558","시간점수":"24.3","출결점수":"60","학습가산점":"2","리셋감점":"0","총점":"644.3","상위가점":"0","하위감점":"0","상하위진도수":"0/13/7/0","총학습수":"20","가감총점":"644.3","평균":"107.38","랭킹":"9","본부랭킹":"2","학습평균":"93.0","전국학습평균":"77.2","학습상위":"9%","시간평균":"4.05","전국시간평균":"3.68","시간상위":"35%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"107.38","전국총점평균":"91.2","총점상위":"9%","학습포인트":"558","출결포인트":"60","전체포인트":"618","복권이벤트":"-","전국랭킹":"112","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-1001001010","회원명":"윤채원","생년월일":"2018-06-14","리그명":"B.초1","조명":"04조","학습점수":"552","시간점수":"23.1","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"636.1","상위가점":"0","하위감점":"0","상하위진도수":"0/12/8/0","총학습수":"20","가감총점":"636.1","평균":"106.02","랭킹":"10","본부랭킹":"1","학습평균":"92.0","전국학습평균":"77.2","학습상위":"10%","시간평균":"3.85","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"106.02","전국총점평균":"91.2","총점상위":"10%","학습포인트":"552","출결포인트":"60","전체포인트":"612","복권이벤트":"-","전국랭킹":"138","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-1001001011","회원명":"정수현","생년월일":"2017-04-03","리그명":"B.초1","조명":"05조","학습점수":"544","시간점수":"21.8","출결점수":"58","학습가산점":"2","리셋감점":"0","총점":"625.8","상위가점":"0","하위감점":"0","상하위진도수":"0/11/8/0","총학습수":"19","가감총점":"625.8","평균":"104.3","랭킹":"11","본부랭킹":"3","학습평균":"90.67","전국학습평균":"77.2","학습상위":"11%","시간평균":"3.63","전국시간평균":"3.68","시간상위":"48%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"104.3","전국총점평균":"91.2","총점상위":"11%","학습포인트":"444","출결포인트":"50","전체포인트":"494","복권이벤트":"-","전국랭킹":"175","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구월성 Hive","센터":"대교 대구월성 Hive 001팀","센터타입":"LC","교사명":"박정락","회원번호":"000S-1001001012","회원명":"이태양","생년월일":"2018-10-08","리그명":"B.초1","조명":"05조","학습점수":"536","시간점수":"20.5","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"617.5","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"20","가감총점":"617.5","평균":"102.92","랭킹":"12","본부랭킹":"2","학습평균":"89.33","전국학습평균":"77.2","학습상위":"13%","시간평균":"3.42","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"102.92","전국총점평균":"91.2","총점상위":"12%","학습포인트":"536","출결포인트":"60","전체포인트":"596","복권이벤트":"-","전국랭킹":"208","전국회원수":"2654","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-1001001013","회원명":"박하은","생년월일":"2017-08-17","리그명":"B.초1","조명":"06조","학습점수":"528","시간점수":"19.2","출결점수":"58","학습가산점":"2","리셋감점":"0","총점":"607.2","상위가점":"0","하위감점":"0","상하위진도수":"0/9/10/0","총학습수":"19","가감총점":"607.2","평균":"101.2","랭킹":"13","본부랭킹":"1","학습평균":"88.0","전국학습평균":"77.2","학습상위":"14%","시간평균":"3.2","전국시간평균":"3.68","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"101.2","전국총점평균":"91.2","총점상위":"13%","학습포인트":"428","출결포인트":"50","전체포인트":"478","복권이벤트":"-","전국랭킹":"248","전국회원수":"2654","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-1001001014","회원명":"최준서","생년월일":"2018-03-24","리그명":"B.초1","조명":"06조","학습점수":"518","시간점수":"17.9","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"596.9","상위가점":"0","하위감점":"0","상하위진도수":"0/8/12/0","총학습수":"20","가감총점":"596.9","평균":"99.48","랭킹":"14","본부랭킹":"2","학습평균":"86.33","전국학습평균":"77.2","학습상위":"15%","시간평균":"2.98","전국시간평균":"3.68","시간상위":"70%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"99.48","전국총점평균":"91.2","총점상위":"15%","학습포인트":"518","출결포인트":"60","전체포인트":"578","복권이벤트":"-","전국랭킹":"295","전국회원수":"2654","최종랭킹":""},{"본부":"대교 중장본부","지점":"대교 부산남부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"조대교","회원번호":"000S-1001001015","회원명":"임서진","생년월일":"2017-06-11","리그명":"B.초1","조명":"07조","학습점수":"506","시간점수":"16.4","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"583.4","상위가점":"0","하위감점":"0","상하위진도수":"0/7/13/0","총학습수":"20","가감총점":"583.4","평균":"97.23","랭킹":"15","본부랭킹":"1","학습평균":"84.33","전국학습평균":"77.2","학습상위":"17%","시간평균":"2.73","전국시간평균":"3.68","시간상위":"75%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"97.23","전국총점평균":"91.2","총점상위":"17%","학습포인트":"506","출결포인트":"60","전체포인트":"566","복권이벤트":"-","전국랭킹":"348","전국회원수":"2654","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 하남 Hive","센터":"대교 하남 Hive 001팀","센터타입":"LC","교사명":"윤희경","회원번호":"000S-1001001016","회원명":"홍민준","생년월일":"2018-07-29","리그명":"B.초1","조명":"07조","학습점수":"492","시간점수":"14.8","출결점수":"58","학습가산점":"1","리셋감점":"0","총점":"565.8","상위가점":"0","하위감점":"0","상하위진도수":"0/6/12/0","총학습수":"18","가감총점":"565.8","평균":"94.3","랭킹":"16","본부랭킹":"2","학습평균":"82.0","전국학습평균":"77.2","학습상위":"19%","시간평균":"2.47","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"94.3","전국총점평균":"91.2","총점상위":"19%","학습포인트":"392","출결포인트":"50","전체포인트":"442","복권이벤트":"-","전국랭킹":"402","전국회원수":"2654","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-1001001017","회원명":"신채은","생년월일":"2017-02-08","리그명":"B.초1","조명":"08조","학습점수":"478","시간점수":"13.2","출결점수":"58","학습가산점":"0","리셋감점":"0","총점":"549.2","상위가점":"0","하위감점":"-10","상하위진도수":"0/5/10/2","총학습수":"17","가감총점":"539.2","평균":"89.87","랭킹":"17","본부랭킹":"3","학습평균":"79.67","전국학습평균":"77.2","학습상위":"22%","시간평균":"2.2","전국시간평균":"3.68","시간상위":"85%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"89.87","전국총점평균":"91.2","총점상위":"22%","학습포인트":"378","출결포인트":"50","전체포인트":"428","복권이벤트":"-","전국랭킹":"468","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-1001001018","회원명":"문도현","생년월일":"2017-10-16","리그명":"B.초1","조명":"08조","학습점수":"460","시간점수":"11.5","출결점수":"54","학습가산점":"0","리셋감점":"0","총점":"525.5","상위가점":"0","하위감점":"-20","상하위진도수":"0/4/8/4","총학습수":"16","가감총점":"505.5","평균":"84.25","랭킹":"18","본부랭킹":"4","학습평균":"76.67","전국학습평균":"77.2","학습상위":"28%","시간평균":"1.92","전국시간평균":"3.68","시간상위":"88%","출결평균":"9.0","전국출결평균":"8.9","출결상위":"45%","총점평균":"84.25","전국총점평균":"91.2","총점상위":"28%","학습포인트":"360","출결포인트":"46","전체포인트":"406","복권이벤트":"-","전국랭킹":"542","전국회원수":"2654","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-1001001019","회원명":"장민서","생년월일":"2019-01-22","리그명":"B.초1","조명":"09조","학습점수":"380","시간점수":"7.2","출결점수":"40","학습가산점":"0","리셋감점":"0","총점":"427.2","상위가점":"0","하위감점":"-30","상하위진도수":"0/2/6/6","총학습수":"14","가감총점":"397.2","평균":"66.2","랭킹":"19","본부랭킹":"3","학습평균":"63.33","전국학습평균":"77.2","학습상위":"42%","시간평균":"1.2","전국시간평균":"3.68","시간상위":"95%","출결평균":"6.67","전국출결평균":"8.9","출결상위":"72%","총점평균":"66.2","전국총점평균":"91.2","총점상위":"45%","학습포인트":"280","출결포인트":"30","전체포인트":"310","복권이벤트":"-","전국랭킹":"1842","전국회원수":"2654","최종랭킹":"최하고정"},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-1001001020","회원명":"권예빈","생년월일":"2019-03-15","리그명":"B.초1","조명":"09조","학습점수":"310","시간점수":"4.8","출결점수":"30","학습가산점":"0","리셋감점":"0","총점":"344.8","상위가점":"0","하위감점":"-30","상하위진도수":"0/1/4/8","총학습수":"13","가감총점":"314.8","평균":"52.47","랭킹":"20","본부랭킹":"2","학습평균":"51.67","전국학습평균":"77.2","학습상위":"58%","시간평균":"0.8","전국시간평균":"3.68","시간상위":"98%","출결평균":"5.0","전국출결평균":"8.9","출결상위":"85%","총점평균":"52.47","전국총점평균":"91.2","총점상위":"62%","학습포인트":"210","출결포인트":"22","전체포인트":"232","복권이벤트":"-","전국랭킹":"2201","전국회원수":"2654","최종랭킹":"최하고정"}]},
  data: [
      {"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-1001001001","회원명":"이서준","생년월일":"2017-03-12","리그명":"B.초1","조명":"01조","학습점수":"598","시간점수":"32.1","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"696.1","상위가점":"20","하위감점":"0","상하위진도수":"22/0/0/0","총학습수":"22","가감총점":"716.1","평균":"119.35","랭킹":"1","본부랭킹":"1","학습평균":"99.67","전국학습평균":"77.2","학습상위":"2%","시간평균":"5.35","전국시간평균":"3.68","시간상위":"8%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"119.35","전국총점평균":"91.2","총점상위":"1%","학습포인트":"598","출결포인트":"60","전체포인트":"658","복권이벤트":"-","전국랭킹":"5","전국회원수":"2654","최종랭킹":"Grand Master"},
      {"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-1001001002","회원명":"김수아","생년월일":"2017-11-08","리그명":"B.초1","조명":"01조","학습점수":"595","시간점수":"31.8","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"691.8","상위가점":"20","하위감점":"0","상하위진도수":"21/0/0/0","총학습수":"21","가감총점":"711.8","평균":"118.63","랭킹":"2","본부랭킹":"1","학습평균":"99.17","전국학습평균":"77.2","학습상위":"2%","시간평균":"5.3","전국시간평균":"3.68","시간상위":"9%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"118.63","전국총점평균":"91.2","총점상위":"1%","학습포인트":"595","출결포인트":"60","전체포인트":"655","복권이벤트":"-","전국랭킹":"8","전국회원수":"2654","최종랭킹":"Grand Master"},
      {"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-1001001003","회원명":"박준호","생년월일":"2017-07-22","리그명":"B.초1","조명":"01조","학습점수":"591","시간점수":"30.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"687.5","상위가점":"20","하위감점":"0","상하위진도수":"20/0/0/0","총학습수":"20","가감총점":"707.5","평균":"117.92","랭킹":"3","본부랭킹":"1","학습평균":"98.5","전국학습평균":"77.2","학습상위":"3%","시간평균":"5.08","전국시간평균":"3.68","시간상위":"12%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"117.92","전국총점평균":"91.2","총점상위":"2%","학습포인트":"591","출결포인트":"60","전체포인트":"651","복권이벤트":"-","전국랭킹":"15","전국회원수":"2654","최종랭킹":"Master"},
      {"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-1001001004","회원명":"오지우","생년월일":"2018-02-14","리그명":"B.초1","조명":"02조","학습점수":"588","시간점수":"29.8","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"681.8","상위가점":"10","하위감점":"0","상하위진도수":"0/19/0/0","총학습수":"19","가감총점":"691.8","평균":"115.3","랭킹":"4","본부랭킹":"1","학습평균":"98.0","전국학습평균":"77.2","학습상위":"4%","시간평균":"4.97","전국시간평균":"3.68","시간상위":"14%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"115.3","전국총점평균":"91.2","총점상위":"3%","학습포인트":"588","출결포인트":"60","전체포인트":"648","복권이벤트":"-","전국랭킹":"22","전국회원수":"2654","최종랭킹":"Master"},
      {"본부":"대교 경기본부","지점":"대교 군포산본 Hive","센터":"대교 군포산본 Hive 001팀","센터타입":"LC","교사명":"송자영","회원번호":"000S-1001001005","회원명":"최민재","생년월일":"2018-08-30","리그명":"B.초1","조명":"03조","학습점수":"582","시간점수":"28.4","출결점수":"58","학습가산점":"5","리셋감점":"0","총점":"673.4","상위가점":"10","하위감점":"0","상하위진도수":"0/18/2/0","총학습수":"20","가감총점":"683.4","평균":"113.9","랭킹":"5","본부랭킹":"2","학습평균":"97.0","전국학습평균":"77.2","학습상위":"5%","시간평균":"4.73","전국시간평균":"3.68","시간상위":"18%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"113.9","전국총점평균":"91.2","총점상위":"4%","학습포인트":"482","출결포인트":"50","전체포인트":"532","복권이벤트":"-","전국랭킹":"38","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 부경본부","지점":"대교 부산강서 Hive","센터":"[LC]을숙도","센터타입":"LC","교사명":"유경아","회원번호":"000S-1001001006","회원명":"한지원","생년월일":"2018-05-18","리그명":"B.초1","조명":"02조","학습점수":"577","시간점수":"27.9","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"668.9","상위가점":"10","하위감점":"0","상하위진도수":"0/17/4/0","총학습수":"21","가감총점":"678.9","평균":"113.15","랭킹":"6","본부랭킹":"1","학습평균":"96.17","전국학습평균":"77.2","학습상위":"6%","시간평균":"4.65","전국시간평균":"3.68","시간상위":"20%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"113.15","전국총점평균":"91.2","총점상위":"5%","학습포인트":"577","출결포인트":"60","전체포인트":"637","복권이벤트":"-","전국랭킹":"45","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-1001001007","회원명":"이현우","생년월일":"2017-09-05","리그명":"B.초1","조명":"01조","학습점수":"571","시간점수":"26.8","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"660.8","상위가점":"0","하위감점":"0","상하위진도수":"0/15/6/0","총학습수":"21","가감총점":"660.8","평균":"110.13","랭킹":"7","본부랭킹":"1","학습평균":"95.17","전국학습평균":"77.2","학습상위":"7%","시간평균":"4.47","전국시간평균":"3.68","시간상위":"25%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"110.13","전국총점평균":"91.2","총점상위":"7%","학습포인트":"571","출결포인트":"60","전체포인트":"631","복권이벤트":"-","전국랭킹":"62","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-1001001008","회원명":"노서아","생년월일":"2018-01-19","리그명":"B.초1","조명":"03조","학습점수":"565","시간점수":"25.6","출결점수":"58","학습가산점":"3","리셋감점":"0","총점":"651.6","상위가점":"0","하위감점":"0","상하위진도수":"0/14/5/0","총학습수":"19","가감총점":"651.6","평균":"108.6","랭킹":"8","본부랭킹":"1","학습평균":"94.17","전국학습평균":"77.2","학습상위":"8%","시간평균":"4.27","전국시간평균":"3.68","시간상위":"30%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"108.6","전국총점평균":"91.2","총점상위":"8%","학습포인트":"465","출결포인트":"50","전체포인트":"515","복권이벤트":"-","전국랭킹":"89","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 호남본부","지점":"대교 광주수완 Hive","센터":"[LC]산월","센터타입":"LC","교사명":"최효진","회원번호":"000S-1001001009","회원명":"강도윤","생년월일":"2017-12-27","리그명":"B.초1","조명":"02조","학습점수":"558","시간점수":"24.3","출결점수":"60","학습가산점":"2","리셋감점":"0","총점":"644.3","상위가점":"0","하위감점":"0","상하위진도수":"0/13/7/0","총학습수":"20","가감총점":"644.3","평균":"107.38","랭킹":"9","본부랭킹":"2","학습평균":"93.0","전국학습평균":"77.2","학습상위":"9%","시간평균":"4.05","전국시간평균":"3.68","시간상위":"35%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"107.38","전국총점평균":"91.2","총점상위":"9%","학습포인트":"558","출결포인트":"60","전체포인트":"618","복권이벤트":"-","전국랭킹":"112","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-1001001010","회원명":"윤채원","생년월일":"2018-06-14","리그명":"B.초1","조명":"04조","학습점수":"552","시간점수":"23.1","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"636.1","상위가점":"0","하위감점":"0","상하위진도수":"0/12/8/0","총학습수":"20","가감총점":"636.1","평균":"106.02","랭킹":"10","본부랭킹":"1","학습평균":"92.0","전국학습평균":"77.2","학습상위":"10%","시간평균":"3.85","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"106.02","전국총점평균":"91.2","총점상위":"10%","학습포인트":"552","출결포인트":"60","전체포인트":"612","복권이벤트":"-","전국랭킹":"138","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-1001001011","회원명":"정수현","생년월일":"2017-04-03","리그명":"B.초1","조명":"05조","학습점수":"544","시간점수":"21.8","출결점수":"58","학습가산점":"2","리셋감점":"0","총점":"625.8","상위가점":"0","하위감점":"0","상하위진도수":"0/11/8/0","총학습수":"19","가감총점":"625.8","평균":"104.3","랭킹":"11","본부랭킹":"3","학습평균":"90.67","전국학습평균":"77.2","학습상위":"11%","시간평균":"3.63","전국시간평균":"3.68","시간상위":"48%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"104.3","전국총점평균":"91.2","총점상위":"11%","학습포인트":"444","출결포인트":"50","전체포인트":"494","복권이벤트":"-","전국랭킹":"175","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 경산본부","지점":"대교 대구월성 Hive","센터":"대교 대구월성 Hive 001팀","센터타입":"LC","교사명":"박정락","회원번호":"000S-1001001012","회원명":"이태양","생년월일":"2018-10-08","리그명":"B.초1","조명":"05조","학습점수":"536","시간점수":"20.5","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"617.5","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"20","가감총점":"617.5","평균":"102.92","랭킹":"12","본부랭킹":"2","학습평균":"89.33","전국학습평균":"77.2","학습상위":"13%","시간평균":"3.42","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"102.92","전국총점평균":"91.2","총점상위":"12%","학습포인트":"536","출결포인트":"60","전체포인트":"596","복권이벤트":"-","전국랭킹":"208","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-1001001013","회원명":"박하은","생년월일":"2017-08-17","리그명":"B.초1","조명":"06조","학습점수":"528","시간점수":"19.2","출결점수":"58","학습가산점":"2","리셋감점":"0","총점":"607.2","상위가점":"0","하위감점":"0","상하위진도수":"0/9/10/0","총학습수":"19","가감총점":"607.2","평균":"101.2","랭킹":"13","본부랭킹":"1","학습평균":"88.0","전국학습평균":"77.2","학습상위":"14%","시간평균":"3.2","전국시간평균":"3.68","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"101.2","전국총점평균":"91.2","총점상위":"13%","학습포인트":"428","출결포인트":"50","전체포인트":"478","복권이벤트":"-","전국랭킹":"248","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-1001001014","회원명":"최준서","생년월일":"2018-03-24","리그명":"B.초1","조명":"06조","학습점수":"518","시간점수":"17.9","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"596.9","상위가점":"0","하위감점":"0","상하위진도수":"0/8/12/0","총학습수":"20","가감총점":"596.9","평균":"99.48","랭킹":"14","본부랭킹":"2","학습평균":"86.33","전국학습평균":"77.2","학습상위":"15%","시간평균":"2.98","전국시간평균":"3.68","시간상위":"70%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"99.48","전국총점평균":"91.2","총점상위":"15%","학습포인트":"518","출결포인트":"60","전체포인트":"578","복권이벤트":"-","전국랭킹":"295","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 중장본부","지점":"대교 부산남부 Hive","센터":"[대]강남","센터타입":"YC","교사명":"조대교","회원번호":"000S-1001001015","회원명":"임서진","생년월일":"2017-06-11","리그명":"B.초1","조명":"07조","학습점수":"506","시간점수":"16.4","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"583.4","상위가점":"0","하위감점":"0","상하위진도수":"0/7/13/0","총학습수":"20","가감총점":"583.4","평균":"97.23","랭킹":"15","본부랭킹":"1","학습평균":"84.33","전국학습평균":"77.2","학습상위":"17%","시간평균":"2.73","전국시간평균":"3.68","시간상위":"75%","출결평균":"10","전국출결평균":"8.9","출결상위":"1%","총점평균":"97.23","전국총점평균":"91.2","총점상위":"17%","학습포인트":"506","출결포인트":"60","전체포인트":"566","복권이벤트":"-","전국랭킹":"348","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 서울남동본부","지점":"대교 하남 Hive","센터":"대교 하남 Hive 001팀","센터타입":"LC","교사명":"윤희경","회원번호":"000S-1001001016","회원명":"홍민준","생년월일":"2018-07-29","리그명":"B.초1","조명":"07조","학습점수":"492","시간점수":"14.8","출결점수":"58","학습가산점":"1","리셋감점":"0","총점":"565.8","상위가점":"0","하위감점":"0","상하위진도수":"0/6/12/0","총학습수":"18","가감총점":"565.8","평균":"94.3","랭킹":"16","본부랭킹":"2","학습평균":"82.0","전국학습평균":"77.2","학습상위":"19%","시간평균":"2.47","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"94.3","전국총점평균":"91.2","총점상위":"19%","학습포인트":"392","출결포인트":"50","전체포인트":"442","복권이벤트":"-","전국랭킹":"402","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-1001001017","회원명":"신채은","생년월일":"2017-02-08","리그명":"B.초1","조명":"08조","학습점수":"478","시간점수":"13.2","출결점수":"58","학습가산점":"0","리셋감점":"0","총점":"549.2","상위가점":"0","하위감점":"-10","상하위진도수":"0/5/10/2","총학습수":"17","가감총점":"539.2","평균":"89.87","랭킹":"17","본부랭킹":"3","학습평균":"79.67","전국학습평균":"77.2","학습상위":"22%","시간평균":"2.2","전국시간평균":"3.68","시간상위":"85%","출결평균":"9.67","전국출결평균":"8.9","출결상위":"28%","총점평균":"89.87","전국총점평균":"91.2","총점상위":"22%","학습포인트":"378","출결포인트":"50","전체포인트":"428","복권이벤트":"-","전국랭킹":"468","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 경기본부","지점":"대교 경기평택 Hive","센터":"[HI]비전","센터타입":"LC","교사명":"김소미","회원번호":"000S-1001001018","회원명":"문도현","생년월일":"2017-10-16","리그명":"B.초1","조명":"08조","학습점수":"460","시간점수":"11.5","출결점수":"54","학습가산점":"0","리셋감점":"0","총점":"525.5","상위가점":"0","하위감점":"-20","상하위진도수":"0/4/8/4","총학습수":"16","가감총점":"505.5","평균":"84.25","랭킹":"18","본부랭킹":"4","학습평균":"76.67","전국학습평균":"77.2","학습상위":"28%","시간평균":"1.92","전국시간평균":"3.68","시간상위":"88%","출결평균":"9.0","전국출결평균":"8.9","출결상위":"45%","총점평균":"84.25","전국총점평균":"91.2","총점상위":"28%","학습포인트":"360","출결포인트":"46","전체포인트":"406","복권이벤트":"-","전국랭킹":"542","전국회원수":"2654","최종랭킹":""},
      {"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-1001001019","회원명":"장민서","생년월일":"2019-01-22","리그명":"B.초1","조명":"09조","학습점수":"380","시간점수":"7.2","출결점수":"40","학습가산점":"0","리셋감점":"0","총점":"427.2","상위가점":"0","하위감점":"-30","상하위진도수":"0/2/6/6","총학습수":"14","가감총점":"397.2","평균":"66.2","랭킹":"19","본부랭킹":"3","학습평균":"63.33","전국학습평균":"77.2","학습상위":"42%","시간평균":"1.2","전국시간평균":"3.68","시간상위":"95%","출결평균":"6.67","전국출결평균":"8.9","출결상위":"72%","총점평균":"66.2","전국총점평균":"91.2","총점상위":"45%","학습포인트":"280","출결포인트":"30","전체포인트":"310","복권이벤트":"-","전국랭킹":"1842","전국회원수":"2654","최종랭킹":"최하고정"},
      {"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-1001001020","회원명":"권예빈","생년월일":"2019-03-15","리그명":"B.초1","조명":"09조","학습점수":"310","시간점수":"4.8","출결점수":"30","학습가산점":"0","리셋감점":"0","총점":"344.8","상위가점":"0","하위감점":"-30","상하위진도수":"0/1/4/8","총학습수":"13","가감총점":"314.8","평균":"52.47","랭킹":"20","본부랭킹":"2","학습평균":"51.67","전국학습평균":"77.2","학습상위":"58%","시간평균":"0.8","전국시간평균":"3.68","시간상위":"98%","출결평균":"5.0","전국출결평균":"8.9","출결상위":"85%","총점평균":"52.47","전국총점평균":"91.2","총점상위":"62%","학습포인트":"210","출결포인트":"22","전체포인트":"232","복권이벤트":"-","전국랭킹":"2201","전국회원수":"2654","최종랭킹":"최하고정"}
    ]
  };

  // ── 2025 윈터 (목업 15건)
  LEAGUE_DATA['2025_winter'] = {
    label: '2025 윈터 리그오브매스',
    finalized: true,
    totalWeeks:6,
  weeks:{  "1":[{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"B.초4","조명":"01조","학습점수":"100.34","시간점수":"5.49","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"118.83","상위가점":"0","하위감점":"0","상하위진도수":"25/0/0/0","총학습수":"4","가감총점":"118.83","평균":"29.71","랭킹":"5","본부랭킹":"0","학습평균":"96.69","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.95","전국시간평균":"3.95","시간상위":"5%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"120.13","전국총점평균":"112.8","총점상위":"1%","학습포인트":"90.31","출결포인트":"12","전체포인트":"102.31","복권이벤트":"-","전국랭킹":"73","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"B.초1","조명":"01조","학습점수":"98.68","시간점수":"5.77","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"117.45","상위가점":"0","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"4","가감총점":"117.45","평균":"29.36","랭킹":"3","본부랭킹":"0","학습평균":"99.69","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.62","전국시간평균":"3.95","시간상위":"6%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.7","전국총점평균":"112.8","총점상위":"1%","학습포인트":"88.81","출결포인트":"12","전체포인트":"100.81","복권이벤트":"-","전국랭킹":"35","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"B.초5","조명":"01조","학습점수":"100.03","시간점수":"5.76","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"118.79","상위가점":"0","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"4","가감총점":"118.79","평균":"29.7","랭킹":"1","본부랭킹":"0","학습평균":"94.0","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.92","전국시간평균":"3.95","시간상위":"4%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.98","전국총점평균":"112.8","총점상위":"1%","학습포인트":"90.03","출결포인트":"12","전체포인트":"102.03","복권이벤트":"-","전국랭킹":"78","전국회원수":"2412","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"103.38","시간점수":"4.9","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"121.28","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"4","가감총점":"121.28","평균":"30.32","랭킹":"4","본부랭킹":"0","학습평균":"97.22","전국학습평균":"94.5","학습상위":"2%","시간평균":"4.94","전국시간평균":"3.95","시간상위":"8%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.73","전국총점평균":"112.8","총점상위":"2%","학습포인트":"93.04","출결포인트":"12","전체포인트":"105.04","복권이벤트":"-","전국랭킹":"26","전국회원수":"2412","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"102.77","시간점수":"5.45","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"121.22","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"4","가감총점":"121.22","평균":"30.3","랭킹":"4","본부랭킹":"0","학습평균":"98.96","전국학습평균":"94.5","학습상위":"2%","시간평균":"4.99","전국시간평균":"3.95","시간상위":"9%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.3","전국총점평균":"112.8","총점상위":"2%","학습포인트":"92.49","출결포인트":"12","전체포인트":"104.49","복권이벤트":"-","전국랭킹":"1","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"102.32","시간점수":"4.38","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"119.7","상위가점":"0","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"4","가감총점":"119.7","평균":"29.93","랭킹":"6","본부랭킹":"0","학습평균":"99.77","전국학습평균":"94.5","학습상위":"3%","시간평균":"4.43","전국시간평균":"3.95","시간상위":"15%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"115.75","전국총점평균":"112.8","총점상위":"3%","학습포인트":"92.09","출결포인트":"12","전체포인트":"104.09","복권이벤트":"-","전국랭킹":"1","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"94.87","시간점수":"3.84","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"110.71","상위가점":"0","하위감점":"0","상하위진도수":"0/16/0/0","총학습수":"3","가감총점":"110.71","평균":"36.9","랭킹":"4","본부랭킹":"0","학습평균":"88.21","전국학습평균":"94.5","학습상위":"5%","시간평균":"3.93","전국시간평균":"3.95","시간상위":"38%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"110.87","전국총점평균":"112.8","총점상위":"5%","학습포인트":"85.38","출결포인트":"12","전체포인트":"97.38","복권이벤트":"-","전국랭킹":"75","전국회원수":"2412","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"92.33","시간점수":"4.16","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"109.49","상위가산":"10","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"4","가감총점":"109.49","평균":"27.37","랭킹":"7","본부랭킹":"0","학습평균":"87.51","전국학습평균":"94.5","학습상위":"6%","시간평균":"4.13","전국시간평균":"3.95","시간상위":"40%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"111.47","전국총점평균":"112.8","총점상위":"6%","학습포인트":"83.1","출결포인트":"12","전체포인트":"95.1","복권이벤트":"-","전국랭킹":"66","전국회원수":"2412","최종랭킹":"","상위가점":"0"},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"97.36","시간점수":"3.81","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"114.17","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"4","가감총점":"114.17","평균":"28.54","랭킹":"12","본부랭킹":"0","학습평균":"87.93","전국학습평균":"94.5","학습상위":"7%","시간평균":"3.6","전국시간평균":"3.95","시간상위":"45%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"110.65","전국총점평균":"112.8","총점상위":"7%","학습포인트":"87.62","출결포인트":"12","전체포인트":"99.62","복권이벤트":"-","전국랭킹":"76","전국회원수":"2412","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"96.07","시간점수":"3.6","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"112.67","상위가점":"0","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"4","가감총점":"112.67","평균":"28.17","랭킹":"8","본부랭킹":"0","학습평균":"92.12","전국학습평균":"94.5","학습상위":"8%","시간평균":"3.46","전국시간평균":"3.95","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"108.75","전국총점평균":"112.8","총점상위":"8%","학습포인트":"86.46","출결포인트":"12","전체포인트":"98.46","복권이벤트":"-","전국랭킹":"189","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"86.81","시간점수":"3.01","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"102.82","상위가점":"0","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"4","가감총점":"102.82","평균":"25.7","랭킹":"10","본부랭킹":"0","학습평균":"91.65","전국학습평균":"94.5","학습상위":"9%","시간평균":"3.24","전국시간평균":"3.95","시간상위":"60%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"107.3","전국총점평균":"112.8","총점상위":"9%","학습포인트":"78.13","출결포인트":"12","전체포인트":"90.13","복권이벤트":"-","전국랭킹":"155","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"91.19","시간점수":"2.81","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"106.0","상위가점":"0","하위감점":"0","상하위진도수":"0/6/10/0","총학습수":"3","가감총점":"106.0","평균":"35.33","랭킹":"9","본부랭킹":"0","학습평균":"84.61","전국학습평균":"94.5","학습상위":"11%","시간평균":"2.71","전국시간평균":"3.95","시간상위":"68%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"102.2","전국총점평균":"112.8","총점상위":"11%","학습포인트":"82.07","출결포인트":"12","전체포인트":"94.07","복권이벤트":"-","전국랭킹":"281","전국회원수":"2412","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"75.75","시간점수":"2.39","출결점수":"11","학습가산점":"0","리셋감점":"0","총점":"89.14","상위가점":"0","하위감점":"0","상하위진도수":"0/16/8/0","총학습수":"4","가감총점":"89.14","평균":"22.29","랭킹":"0","본부랭킹":"0","학습평균":"79.28","전국학습평균":"94.5","학습상위":"32%","시간평균":"2.4","전국시간평균":"3.95","시간상위":"82%","출결평균":"9.0","전국출결평균":"9.1","출결상위":"55%","총점평균":"86.15","전국총점평균":"112.8","총점상위":"42%","학습포인트":"68.17","출결포인트":"11","전체포인트":"79.17","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"78.17","시간점수":"2.81","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"92.98","상위가점":"0","하위감점":"0","상하위진도수":"0/18/8/0","총학습수":"4","가감총점":"92.98","평균":"23.25","랭킹":"0","본부랭킹":"0","학습평균":"79.68","전국학습평균":"94.5","학습상위":"28%","시간평균":"2.45","전국시간평균":"3.95","시간상위":"78%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"89.55","전국총점평균":"112.8","총점상위":"38%","학습포인트":"70.35","출결포인트":"12","전체포인트":"82.35","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"87.13","시간점수":"3.14","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"103.27","상위가점":"0","하위감점":"0","상하위진도수":"0/30/0/0","총학습수":"5","가감총점":"103.27","평균":"20.65","랭킹":"0","본부랭킹":"0","학습평균":"81.29","전국학습평균":"94.5","학습상위":"15%","시간평균":"3.23","전국시간평균":"3.95","시간상위":"63%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"101.02","전국총점평균":"112.8","총점상위":"18%","학습포인트":"78.42","출결포인트":"12","전체포인트":"90.42","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}],
  "2":[{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"B.초4","조명":"01조","학습점수":"202.3","시간점수":"10.86","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"237.16","상위가점":"0","하위감점":"0","상하위진도수":"25/0/0/0","총학습수":"8","가감총점":"237.16","평균":"29.64","랭킹":"2","본부랭킹":"0","학습평균":"98.64","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.29","전국시간평균":"3.95","시간상위":"5%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"120.13","전국총점평균":"112.8","총점상위":"1%","학습포인트":"182.07","출결포인트":"22","전체포인트":"204.07","복권이벤트":"-","전국랭킹":"1","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"B.초1","조명":"01조","학습점수":"209.49","시간점수":"10.07","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"243.56","상위가점":"0","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"9","가감총점":"243.56","평균":"27.06","랭킹":"4","본부랭킹":"0","학습평균":"97.07","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.8","전국시간평균":"3.95","시간상위":"6%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.7","전국총점평균":"112.8","총점상위":"1%","학습포인트":"188.54","출결포인트":"22","전체포인트":"210.54","복권이벤트":"-","전국랭킹":"45","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"B.초5","조명":"01조","학습점수":"201.08","시간점수":"11.47","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"235.55","상위가점":"0","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"9","가감총점":"235.55","평균":"26.17","랭킹":"2","본부랭킹":"0","학습평균":"98.36","전국학습평균":"94.5","학습상위":"1%","시간평균":"6.26","전국시간평균":"3.95","시간상위":"4%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.98","전국총점평균":"112.8","총점상위":"1%","학습포인트":"180.97","출결포인트":"22","전체포인트":"202.97","복권이벤트":"-","전국랭킹":"1","전국회원수":"2412","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"194.42","시간점수":"9.75","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"228.17","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"8","가감총점":"228.17","평균":"28.52","랭킹":"7","본부랭킹":"0","학습평균":"95.13","전국학습평균":"94.5","학습상위":"2%","시간평균":"5.45","전국시간평균":"3.95","시간상위":"8%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.73","전국총점평균":"112.8","총점상위":"2%","학습포인트":"174.98","출결포인트":"22","전체포인트":"196.98","복권이벤트":"-","전국랭킹":"1","전국회원수":"2412","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"201.21","시간점수":"10.77","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"235.98","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"8","가감총점":"235.98","평균":"29.5","랭킹":"7","본부랭킹":"0","학습평균":"94.69","전국학습평균":"94.5","학습상위":"2%","시간평균":"4.81","전국시간평균":"3.95","시간상위":"9%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.3","전국총점평균":"112.8","총점상위":"2%","학습포인트":"181.09","출결포인트":"22","전체포인트":"203.09","복권이벤트":"-","전국랭킹":"78","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"197.57","시간점수":"9.71","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"231.28","상위가점":"0","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"9","가감총점":"231.28","평균":"25.7","랭킹":"4","본부랭킹":"0","학습평균":"98.12","전국학습평균":"94.5","학습상위":"3%","시간평균":"4.61","전국시간평균":"3.95","시간상위":"15%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"115.75","전국총점평균":"112.8","총점상위":"3%","학습포인트":"177.81","출결포인트":"22","전체포인트":"199.81","복권이벤트":"-","전국랭킹":"94","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"194.39","시간점수":"8.02","출결점수":"21","학습가산점":"0","리셋감점":"0","총점":"223.41","상위가점":"0","하위감점":"0","상하위진도수":"0/16/0/0","총학습수":"5","가감총점":"223.41","평균":"44.68","랭킹":"10","본부랭킹":"0","학습평균":"88.31","전국학습평균":"94.5","학습상위":"5%","시간평균":"4.1","전국시간평균":"3.95","시간상위":"38%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"110.87","전국총점평균":"112.8","총점상위":"5%","학습포인트":"174.95","출결포인트":"21","전체포인트":"195.95","복권이벤트":"-","전국랭킹":"39","전국회원수":"2412","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"188.86","시간점수":"7.49","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"220.35","상위가산":"10","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"8","가감총점":"220.35","평균":"27.54","랭킹":"5","본부랭킹":"0","학습평균":"89.14","전국학습평균":"94.5","학습상위":"6%","시간평균":"3.6","전국시간평균":"3.95","시간상위":"40%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"111.47","전국총점평균":"112.8","총점상위":"6%","학습포인트":"169.97","출결포인트":"22","전체포인트":"191.97","복권이벤트":"-","전국랭킹":"139","전국회원수":"2412","최종랭킹":"","상위가점":"0"},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"196.5","시간점수":"7.46","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"227.96","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"8","가감총점":"227.96","평균":"28.5","랭킹":"12","본부랭킹":"0","학습평균":"91.09","전국학습평균":"94.5","학습상위":"7%","시간평균":"3.46","전국시간평균":"3.95","시간상위":"45%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"110.65","전국총점평균":"112.8","총점상위":"7%","학습포인트":"176.85","출결포인트":"22","전체포인트":"198.85","복권이벤트":"-","전국랭킹":"127","전국회원수":"2412","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"188.73","시간점수":"6.76","출결점수":"21","학습가산점":"2","리셋감점":"0","총점":"218.49","상위가점":"0","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"8","가감총점":"218.49","평균":"27.31","랭킹":"13","본부랭킹":"0","학습평균":"86.0","전국학습평균":"94.5","학습상위":"8%","시간평균":"3.57","전국시간평균":"3.95","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"108.75","전국총점평균":"112.8","총점상위":"8%","학습포인트":"169.86","출결포인트":"21","전체포인트":"190.86","복권이벤트":"-","전국랭킹":"191","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"178.52","시간점수":"6.73","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"209.25","상위가점":"0","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"9","가감총점":"209.25","평균":"23.25","랭킹":"11","본부랭킹":"0","학습평균":"90.81","전국학습평균":"94.5","학습상위":"9%","시간평균":"3.41","전국시간평균":"3.95","시간상위":"60%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"107.3","전국총점평균":"112.8","총점상위":"9%","학습포인트":"160.67","출결포인트":"22","전체포인트":"182.67","복권이벤트":"-","전국랭킹":"179","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"176.31","시간점수":"6.0","출결점수":"22","학습가산점":"0","리셋감점":"0","총점":"204.31","상위가점":"0","하위감점":"0","상하위진도수":"0/6/10/0","총학습수":"5","가감총점":"204.31","평균":"40.86","랭킹":"12","본부랭킹":"0","학습평균":"86.47","전국학습평균":"94.5","학습상위":"11%","시간평균":"2.98","전국시간평균":"3.95","시간상위":"68%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"102.2","전국총점평균":"112.8","총점상위":"11%","학습포인트":"158.68","출결포인트":"22","전체포인트":"180.68","복권이벤트":"-","전국랭킹":"270","전국회원수":"2412","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"158.97","시간점수":"5.07","출결점수":"20","학습가산점":"1","리셋감점":"0","총점":"185.04","상위가점":"0","하위감점":"0","상하위진도수":"0/16/8/0","총학습수":"8","가감총점":"185.04","평균":"23.13","랭킹":"0","본부랭킹":"0","학습평균":"78.75","전국학습평균":"94.5","학습상위":"32%","시간평균":"2.26","전국시간평균":"3.95","시간상위":"82%","출결평균":"9.0","전국출결평균":"9.1","출결상위":"55%","총점평균":"86.15","전국총점평균":"112.8","총점상위":"42%","학습포인트":"143.07","출결포인트":"20","전체포인트":"163.07","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"164.33","시간점수":"5.56","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"192.89","상위가점":"0","하위감점":"0","상하위진도수":"0/18/8/0","총학습수":"9","가감총점":"192.89","평균":"21.43","랭킹":"0","본부랭킹":"0","학습평균":"79.26","전국학습평균":"94.5","학습상위":"28%","시간평균":"2.58","전국시간평균":"3.95","시간상위":"78%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"89.55","전국총점평균":"112.8","총점상위":"38%","학습포인트":"147.9","출결포인트":"22","전체포인트":"169.9","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"166.69","시간점수":"6.69","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"196.38","상위가점":"0","하위감점":"0","상하위진도수":"0/30/0/0","총학습수":"10","가감총점":"196.38","평균":"19.64","랭킹":"0","본부랭킹":"0","학습평균":"82.71","전국학습평균":"94.5","학습상위":"15%","시간평균":"3.32","전국시간평균":"3.95","시간상위":"63%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"101.02","전국총점평균":"112.8","총점상위":"18%","학습포인트":"150.02","출결포인트":"22","전체포인트":"172.02","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}],
  "3":[{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"B.초4","조명":"01조","학습점수":"297.78","시간점수":"17.46","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"350.24","상위가점":"20.0","하위감점":"0","상하위진도수":"25/0/0/0","총학습수":"12","가감총점":"370.24","평균":"30.85","랭킹":"1","본부랭킹":"0","학습평균":"92.42","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.98","전국시간평균":"3.95","시간상위":"5%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"120.13","전국총점평균":"112.8","총점상위":"1%","학습포인트":"268.0","출결포인트":"32","전체포인트":"300.0","복권이벤트":"-","전국랭킹":"30","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"B.초1","조명":"01조","학습점수":"295.58","시간점수":"17.43","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"347.01","상위가점":"20.0","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"14","가감총점":"367.01","평균":"26.21","랭킹":"2","본부랭킹":"0","학습평균":"101.8","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.76","전국시간평균":"3.95","시간상위":"6%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.7","전국총점평균":"112.8","총점상위":"1%","학습포인트":"266.02","출결포인트":"32","전체포인트":"298.02","복권이벤트":"-","전국랭킹":"57","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"B.초5","조명":"01조","학습점수":"287.25","시간점수":"17.87","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"339.12","상위가점":"20.0","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"14","가감총점":"359.12","평균":"25.65","랭킹":"1","본부랭킹":"0","학습평균":"100.01","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.99","전국시간평균":"3.95","시간상위":"4%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.98","전국총점평균":"112.8","총점상위":"1%","학습포인트":"258.53","출결포인트":"32","전체포인트":"290.53","복권이벤트":"-","전국랭킹":"39","전국회원수":"2412","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"312.54","시간점수":"14.93","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"362.47","상위가점":"10.0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"12","가감총점":"372.47","평균":"31.04","랭킹":"5","본부랭킹":"0","학습평균":"99.48","전국학습평균":"94.5","학습상위":"2%","시간평균":"4.89","전국시간평균":"3.95","시간상위":"8%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.73","전국총점평균":"112.8","총점상위":"2%","학습포인트":"281.29","출결포인트":"32","전체포인트":"313.29","복권이벤트":"-","전국랭킹":"65","전국회원수":"2412","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"285.1","시간점수":"16.17","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"336.27","상위가점":"10.0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"12","가감총점":"346.27","평균":"28.86","랭킹":"4","본부랭킹":"0","학습평균":"95.19","전국학습평균":"94.5","학습상위":"2%","시간평균":"5.22","전국시간평균":"3.95","시간상위":"9%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.3","전국총점평균":"112.8","총점상위":"2%","학습포인트":"256.59","출결포인트":"32","전체포인트":"288.59","복권이벤트":"-","전국랭킹":"28","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"298.1","시간점수":"14.28","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"347.38","상위가점":"10.0","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"13","가감총점":"357.38","평균":"27.49","랭킹":"5","본부랭킹":"0","학습평균":"94.83","전국학습평균":"94.5","학습상위":"3%","시간평균":"4.33","전국시간평균":"3.95","시간상위":"15%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"115.75","전국총점평균":"112.8","총점상위":"3%","학습포인트":"268.29","출결포인트":"32","전체포인트":"300.29","복권이벤트":"-","전국랭킹":"35","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"275.64","시간점수":"11.56","출결점수":"30","학습가산점":"0","리셋감점":"0","총점":"317.2","상위가점":"10.0","하위감점":"0","상하위진도수":"0/16/0/0","총학습수":"8","가감총점":"327.2","평균":"40.9","랭킹":"6","본부랭킹":"0","학습평균":"90.36","전국학습평균":"94.5","학습상위":"5%","시간평균":"4.21","전국시간평균":"3.95","시간상위":"38%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"110.87","전국총점평균":"112.8","총점상위":"5%","학습포인트":"248.08","출결포인트":"30","전체포인트":"278.08","복권이벤트":"-","전국랭킹":"105","전국회원수":"2412","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"271.01","시간점수":"11.04","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"317.05","상위가산":"10","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"12","가감총점":"317.05","평균":"26.42","랭킹":"9","본부랭킹":"0","학습평균":"95.91","전국학습평균":"94.5","학습상위":"6%","시간평균":"3.64","전국시간평균":"3.95","시간상위":"40%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"111.47","전국총점평균":"112.8","총점상위":"6%","학습포인트":"243.91","출결포인트":"32","전체포인트":"275.91","복권이벤트":"-","전국랭킹":"87","전국회원수":"2412","최종랭킹":"","상위가점":"0.0"},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"290.27","시간점수":"11.51","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"336.78","상위가점":"10.0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"12","가감총점":"346.78","평균":"28.9","랭킹":"7","본부랭킹":"0","학습평균":"89.33","전국학습평균":"94.5","학습상위":"7%","시간평균":"3.96","전국시간평균":"3.95","시간상위":"45%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"110.65","전국총점평균":"112.8","총점상위":"7%","학습포인트":"261.24","출결포인트":"32","전체포인트":"293.24","복권이벤트":"-","전국랭킹":"136","전국회원수":"2412","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"278.75","시간점수":"9.87","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"320.62","상위가점":"10.0","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"12","가감총점":"330.62","평균":"27.55","랭킹":"13","본부랭킹":"0","학습평균":"89.76","전국학습평균":"94.5","학습상위":"8%","시간평균":"3.7","전국시간평균":"3.95","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"108.75","전국총점평균":"112.8","총점상위":"8%","학습포인트":"250.88","출결포인트":"30","전체포인트":"280.88","복권이벤트":"-","전국랭킹":"101","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"272.5","시간점수":"9.04","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"316.54","상위가점":"10.0","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"13","가감총점":"326.54","평균":"25.12","랭킹":"13","본부랭킹":"0","학습평균":"93.03","전국학습평균":"94.5","학습상위":"9%","시간평균":"3.3","전국시간평균":"3.95","시간상위":"60%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"107.3","전국총점평균":"112.8","총점상위":"9%","학습포인트":"245.25","출결포인트":"32","전체포인트":"277.25","복권이벤트":"-","전국랭킹":"236","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"273.11","시간점수":"8.45","출결점수":"32","학습가산점":"0","리셋감점":"0","총점":"313.56","상위가점":"0.0","하위감점":"0","상하위진도수":"0/6/10/0","총학습수":"8","가감총점":"313.56","평균":"39.2","랭킹":"11","본부랭킹":"0","학습평균":"89.63","전국학습평균":"94.5","학습상위":"11%","시간평균":"2.89","전국시간평균":"3.95","시간상위":"68%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"102.2","전국총점평균":"112.8","총점상위":"11%","학습포인트":"245.8","출결포인트":"32","전체포인트":"277.8","복권이벤트":"-","전국랭킹":"220","전국회원수":"2412","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"248.17","시간점수":"7.42","출결점수":"28","학습가산점":"1","리셋감점":"0","총점":"284.59","상위가점":"0.0","하위감점":"0","상하위진도수":"0/16/8/0","총학습수":"12","가감총점":"284.59","평균":"23.72","랭킹":"0","본부랭킹":"0","학습평균":"79.28","전국학습평균":"94.5","학습상위":"32%","시간평균":"2.42","전국시간평균":"3.95","시간상위":"82%","출결평균":"9.0","전국출결평균":"9.1","출결상위":"55%","총점평균":"86.15","전국총점평균":"112.8","총점상위":"42%","학습포인트":"223.35","출결포인트":"28","전체포인트":"251.35","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"234.76","시간점수":"7.58","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"276.34","상위가점":"0.0","하위감점":"0","상하위진도수":"0/18/8/0","총학습수":"13","가감총점":"276.34","평균":"21.26","랭킹":"0","본부랭킹":"0","학습평균":"75.95","전국학습평균":"94.5","학습상위":"28%","시간평균":"2.77","전국시간평균":"3.95","시간상위":"78%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"89.55","전국총점평균":"112.8","총점상위":"38%","학습포인트":"211.28","출결포인트":"32","전체포인트":"243.28","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"248.64","시간점수":"9.88","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"292.52","상위가점":"0.0","하위감점":"0","상하위진도수":"0/30/0/0","총학습수":"15","가감총점":"292.52","평균":"19.5","랭킹":"0","본부랭킹":"0","학습평균":"83.25","전국학습평균":"94.5","학습상위":"15%","시간평균":"3.42","전국시간평균":"3.95","시간상위":"63%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"101.02","전국총점평균":"112.8","총점상위":"18%","학습포인트":"223.78","출결포인트":"32","전체포인트":"255.78","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}],
  "4":[{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"B.초4","조명":"01조","학습점수":"402.07","시간점수":"23.01","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"470.08","상위가점":"20.0","하위감점":"0.0","상하위진도수":"25/0/0/0","총학습수":"17","가감총점":"490.08","평균":"28.83","랭킹":"1","본부랭킹":"0","학습평균":"95.09","전국학습평균":"94.5","학습상위":"1%","시간평균":"6.09","전국시간평균":"3.95","시간상위":"5%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"120.13","전국총점평균":"112.8","총점상위":"1%","학습포인트":"361.86","출결포인트":"41","전체포인트":"402.86","복권이벤트":"-","전국랭킹":"1","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"B.초1","조명":"01조","학습점수":"408.75","시간점수":"21.67","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"474.42","상위가점":"20.0","하위감점":"0.0","상하위진도수":"27/0/0/0","총학습수":"18","가감총점":"494.42","평균":"27.47","랭킹":"6","본부랭킹":"0","학습평균":"100.23","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.04","전국시간평균":"3.95","시간상위":"6%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.7","전국총점평균":"112.8","총점상위":"1%","학습포인트":"367.88","출결포인트":"41","전체포인트":"408.88","복권이벤트":"-","전국랭킹":"28","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"B.초5","조명":"01조","학습점수":"418.9","시간점수":"23.85","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"486.75","상위가점":"20.0","하위감점":"0.0","상하위진도수":"27/0/0/0","총학습수":"18","가감총점":"506.75","평균":"28.15","랭킹":"2","본부랭킹":"0","학습평균":"98.8","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.69","전국시간평균":"3.95","시간상위":"4%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.98","전국총점평균":"112.8","총점상위":"1%","학습포인트":"377.01","출결포인트":"41","전체포인트":"418.01","복권이벤트":"-","전국랭킹":"33","전국회원수":"2412","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"413.73","시간점수":"21.97","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"480.7","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"16","가감총점":"490.7","평균":"30.67","랭킹":"6","본부랭킹":"0","학습평균":"93.51","전국학습평균":"94.5","학습상위":"2%","시간평균":"5.64","전국시간평균":"3.95","시간상위":"8%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.73","전국총점평균":"112.8","총점상위":"2%","학습포인트":"372.36","출결포인트":"41","전체포인트":"413.36","복권이벤트":"-","전국랭킹":"54","전국회원수":"2412","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"394.66","시간점수":"21.98","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"461.64","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"16","가감총점":"471.64","평균":"29.48","랭킹":"2","본부랭킹":"0","학습평균":"92.62","전국학습평균":"94.5","학습상위":"2%","시간평균":"4.89","전국시간평균":"3.95","시간상위":"9%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.3","전국총점평균":"112.8","총점상위":"2%","학습포인트":"355.19","출결포인트":"41","전체포인트":"396.19","복권이벤트":"-","전국랭킹":"88","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"380.14","시간점수":"18.02","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"443.16","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/26/0/0","총학습수":"17","가감총점":"453.16","평균":"26.66","랭킹":"8","본부랭킹":"0","학습평균":"93.87","전국학습평균":"94.5","학습상위":"3%","시간평균":"4.95","전국시간평균":"3.95","시간상위":"15%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"115.75","전국총점평균":"112.8","총점상위":"3%","학습포인트":"342.13","출결포인트":"41","전체포인트":"383.13","복권이벤트":"-","전국랭킹":"16","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"396.39","시간점수":"16.57","출결점수":"40","학습가산점":"1","리셋감점":"0","총점":"453.96","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/16/0/0","총학습수":"11","가감총점":"463.96","평균":"42.18","랭킹":"6","본부랭킹":"0","학습평균":"93.76","전국학습평균":"94.5","학습상위":"5%","시간평균":"3.96","전국시간평균":"3.95","시간상위":"38%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"110.87","전국총점평균":"112.8","총점상위":"5%","학습포인트":"356.75","출결포인트":"40","전체포인트":"396.75","복권이벤트":"-","전국랭킹":"47","전국회원수":"2412","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"365.11","시간점수":"15.0","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"425.11","상위가산":"10","하위감점":"0.0","상하위진도수":"0/25/0/0","총학습수":"17","가감총점":"425.11","평균":"25.01","랭킹":"9","본부랭킹":"0","학습평균":"92.01","전국학습평균":"94.5","학습상위":"6%","시간평균":"3.67","전국시간평균":"3.95","시간상위":"40%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"111.47","전국총점평균":"112.8","총점상위":"6%","학습포인트":"328.6","출결포인트":"41","전체포인트":"369.6","복권이벤트":"-","전국랭킹":"49","전국회원수":"2412","최종랭킹":"","상위가점":"0.0"},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"393.3","시간점수":"14.09","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"452.39","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"16","가감총점":"462.39","평균":"28.9","랭킹":"11","본부랭킹":"0","학습평균":"93.42","전국학습평균":"94.5","학습상위":"7%","시간평균":"3.78","전국시간평균":"3.95","시간상위":"45%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"110.65","전국총점평균":"112.8","총점상위":"7%","학습포인트":"353.97","출결포인트":"41","전체포인트":"394.97","복권이벤트":"-","전국랭킹":"137","전국회원수":"2412","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"384.74","시간점수":"14.11","출결점수":"40","학습가산점":"3","리셋감점":"0","총점":"441.85","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/25/0/0","총학습수":"17","가감총점":"451.85","평균":"26.58","랭킹":"13","본부랭킹":"0","학습평균":"85.82","전국학습평균":"94.5","학습상위":"8%","시간평균":"3.25","전국시간평균":"3.95","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"108.75","전국총점평균":"112.8","총점상위":"8%","학습포인트":"346.27","출결포인트":"40","전체포인트":"386.27","복권이벤트":"-","전국랭킹":"202","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"370.5","시간점수":"13.02","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"428.52","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/26/0/0","총학습수":"17","가감총점":"438.52","평균":"25.8","랭킹":"13","본부랭킹":"0","학습평균":"91.03","전국학습평균":"94.5","학습상위":"9%","시간평균":"3.18","전국시간평균":"3.95","시간상위":"60%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"107.3","전국총점평균":"112.8","총점상위":"9%","학습포인트":"333.45","출결포인트":"41","전체포인트":"374.45","복권이벤트":"-","전국랭킹":"154","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"361.62","시간점수":"11.18","출결점수":"41","학습가산점":"1","리셋감점":"0","총점":"414.8","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/6/10/0","총학습수":"11","가감총점":"414.8","평균":"37.71","랭킹":"14","본부랭킹":"0","학습평균":"84.62","전국학습평균":"94.5","학습상위":"11%","시간평균":"2.99","전국시간평균":"3.95","시간상위":"68%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"102.2","전국총점평균":"112.8","총점상위":"11%","학습포인트":"325.46","출결포인트":"41","전체포인트":"366.46","복권이벤트":"-","전국랭킹":"251","전국회원수":"2412","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"316.79","시간점수":"10.14","출결점수":"37","학습가산점":"1","리셋감점":"0","총점":"364.93","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0/16/8/0","총학습수":"16","가감총점":"334.93","평균":"20.93","랭킹":"0","본부랭킹":"0","학습평균":"78.42","전국학습평균":"94.5","학습상위":"32%","시간평균":"2.34","전국시간평균":"3.95","시간상위":"82%","출결평균":"9.0","전국출결평균":"9.1","출결상위":"55%","총점평균":"86.15","전국총점평균":"112.8","총점상위":"42%","학습포인트":"285.11","출결포인트":"37","전체포인트":"322.11","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"311.44","시간점수":"9.88","출결점수":"41","학습가산점":"2","리셋감점":"0","총점":"364.32","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0/18/8/0","총학습수":"17","가감총점":"334.32","평균":"19.67","랭킹":"0","본부랭킹":"0","학습평균":"78.4","전국학습평균":"94.5","학습상위":"28%","시간평균":"2.65","전국시간평균":"3.95","시간상위":"78%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"89.55","전국총점평균":"112.8","총점상위":"38%","학습포인트":"280.3","출결포인트":"41","전체포인트":"321.3","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"337.7","시간점수":"13.28","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"394.98","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/30/0/0","총학습수":"20","가감총점":"394.98","평균":"19.75","랭킹":"0","본부랭킹":"0","학습평균":"82.76","전국학습평균":"94.5","학습상위":"15%","시간평균":"3.38","전국시간평균":"3.95","시간상위":"63%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"101.02","전국총점평균":"112.8","총점상위":"18%","학습포인트":"303.93","출결포인트":"41","전체포인트":"344.93","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}],
  "5":[{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"B.초4","조명":"01조","학습점수":"511.71","시간점수":"29.84","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"596.55","상위가점":"20.0","하위감점":"0.0","상하위진도수":"25/0/0/0","총학습수":"21","가감총점":"616.55","평균":"29.36","랭킹":"2","본부랭킹":"0","학습평균":"99.61","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.67","전국시간평균":"3.95","시간상위":"5%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"120.13","전국총점평균":"112.8","총점상위":"1%","학습포인트":"460.54","출결포인트":"50","전체포인트":"510.54","복권이벤트":"-","전국랭킹":"1","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"B.초1","조명":"01조","학습점수":"480.31","시간점수":"25.9","출결점수":"50","학습가산점":"4","리셋감점":"0","총점":"560.21","상위가점":"20.0","하위감점":"0.0","상하위진도수":"27/0/0/0","총학습수":"22","가감총점":"580.21","평균":"26.37","랭킹":"1","본부랭킹":"0","학습평균":"96.5","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.09","전국시간평균":"3.95","시간상위":"6%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.7","전국총점평균":"112.8","총점상위":"1%","학습포인트":"432.28","출결포인트":"50","전체포인트":"482.28","복권이벤트":"-","전국랭킹":"10","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"B.초5","조명":"01조","학습점수":"477.53","시간점수":"31.17","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"561.7","상위가점":"20.0","하위감점":"0.0","상하위진도수":"27/0/0/0","총학습수":"22","가감총점":"581.7","평균":"26.44","랭킹":"5","본부랭킹":"0","학습평균":"96.18","전국학습평균":"94.5","학습상위":"1%","시간평균":"6.25","전국시간평균":"3.95","시간상위":"4%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.98","전국총점평균":"112.8","총점상위":"1%","학습포인트":"429.78","출결포인트":"50","전체포인트":"479.78","복권이벤트":"-","전국랭킹":"52","전국회원수":"2412","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"518.38","시간점수":"27.59","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"600.97","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"20","가감총점":"610.97","평균":"30.55","랭킹":"5","본부랭킹":"0","학습평균":"94.81","전국학습평균":"94.5","학습상위":"2%","시간평균":"5.48","전국시간평균":"3.95","시간상위":"8%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.73","전국총점평균":"112.8","총점상위":"2%","학습포인트":"466.54","출결포인트":"50","전체포인트":"516.54","복권이벤트":"-","전국랭킹":"71","전국회원수":"2412","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"496.58","시간점수":"25.9","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"577.48","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"20","가감총점":"587.48","평균":"29.37","랭킹":"5","본부랭킹":"0","학습평균":"96.32","전국학습평균":"94.5","학습상위":"2%","시간평균":"4.84","전국시간평균":"3.95","시간상위":"9%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.3","전국총점평균":"112.8","총점상위":"2%","학습포인트":"446.92","출결포인트":"50","전체포인트":"496.92","복권이벤트":"-","전국랭킹":"21","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"486.42","시간점수":"23.0","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"564.42","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/26/0/0","총학습수":"22","가감총점":"574.42","평균":"26.11","랭킹":"4","본부랭킹":"0","학습평균":"96.2","전국학습평균":"94.5","학습상위":"3%","시간평균":"4.31","전국시간평균":"3.95","시간상위":"15%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"115.75","전국총점평균":"112.8","총점상위":"3%","학습포인트":"437.78","출결포인트":"50","전체포인트":"487.78","복권이벤트":"-","전국랭킹":"15","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"466.24","시간점수":"19.96","출결점수":"49","학습가산점":"1","리셋감점":"0","총점":"536.2","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/16/0/0","총학습수":"13","가감총점":"546.2","평균":"42.02","랭킹":"10","본부랭킹":"0","학습평균":"94.11","전국학습평균":"94.5","학습상위":"5%","시간평균":"3.8","전국시간평균":"3.95","시간상위":"38%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"110.87","전국총점평균":"112.8","총점상위":"5%","학습포인트":"419.62","출결포인트":"49","전체포인트":"468.62","복권이벤트":"-","전국랭킹":"105","전국회원수":"2412","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"450.85","시간점수":"18.17","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"524.02","상위가산":"10","하위감점":"0.0","상하위진도수":"0/25/0/0","총학습수":"21","가감총점":"524.02","평균":"24.95","랭킹":"6","본부랭킹":"0","학습평균":"94.14","전국학습평균":"94.5","학습상위":"6%","시간평균":"4.03","전국시간평균":"3.95","시간상위":"40%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"111.47","전국총점평균":"112.8","총점상위":"6%","학습포인트":"405.77","출결포인트":"50","전체포인트":"455.77","복권이벤트":"-","전국랭킹":"71","전국회원수":"2412","최종랭킹":"","상위가점":"0.0"},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"464.52","시간점수":"18.32","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"537.84","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"20","가감총점":"547.84","평균":"27.39","랭킹":"10","본부랭킹":"0","학습평균":"88.47","전국학습평균":"94.5","학습상위":"7%","시간평균":"3.75","전국시간평균":"3.95","시간상위":"45%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"110.65","전국총점평균":"112.8","총점상위":"7%","학습포인트":"418.07","출결포인트":"50","전체포인트":"468.07","복권이벤트":"-","전국랭킹":"129","전국회원수":"2412","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"445.17","시간점수":"17.48","출결점수":"49","학습가산점":"4","리셋감점":"0","총점":"515.65","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/25/0/0","총학습수":"21","가감총점":"525.65","평균":"25.03","랭킹":"13","본부랭킹":"0","학습평균":"88.16","전국학습평균":"94.5","학습상위":"8%","시간평균":"3.75","전국시간평균":"3.95","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"108.75","전국총점평균":"112.8","총점상위":"8%","학습포인트":"400.65","출결포인트":"49","전체포인트":"449.65","복권이벤트":"-","전국랭킹":"162","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"464.9","시간점수":"15.14","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"535.04","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/26/0/0","총학습수":"22","가감총점":"545.04","평균":"24.77","랭킹":"8","본부랭킹":"0","학습평균":"87.43","전국학습평균":"94.5","학습상위":"9%","시간평균":"3.46","전국시간평균":"3.95","시간상위":"60%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"107.3","전국총점평균":"112.8","총점상위":"9%","학습포인트":"418.41","출결포인트":"50","전체포인트":"468.41","복권이벤트":"-","전국랭킹":"178","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"448.41","시간점수":"13.69","출결점수":"50","학습가산점":"1","리셋감점":"0","총점":"513.1","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/6/10/0","총학습수":"13","가감총점":"513.1","평균":"39.47","랭킹":"10","본부랭킹":"0","학습평균":"87.41","전국학습평균":"94.5","학습상위":"11%","시간평균":"2.76","전국시간평균":"3.95","시간상위":"68%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"102.2","전국총점평균":"112.8","총점상위":"11%","학습포인트":"403.57","출결포인트":"50","전체포인트":"453.57","복권이벤트":"-","전국랭킹":"207","전국회원수":"2412","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"378.43","시간점수":"11.25","출결점수":"45","학습가산점":"2","리셋감점":"0","총점":"436.68","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0/16/8/0","총학습수":"20","가감총점":"406.68","평균":"20.33","랭킹":"0","본부랭킹":"0","학습평균":"78.64","전국학습평균":"94.5","학습상위":"32%","시간평균":"2.53","전국시간평균":"3.95","시간상위":"82%","출결평균":"9.0","전국출결평균":"9.1","출결상위":"55%","총점평균":"86.15","전국총점평균":"112.8","총점상위":"42%","학습포인트":"340.59","출결포인트":"45","전체포인트":"385.59","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"407.45","시간점수":"12.53","출결점수":"50","학습가산점":"2","리셋감점":"0","총점":"471.98","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0/18/8/0","총학습수":"22","가감총점":"441.98","평균":"20.09","랭킹":"0","본부랭킹":"0","학습평균":"82.09","전국학습평균":"94.5","학습상위":"28%","시간평균":"2.51","전국시간평균":"3.95","시간상위":"78%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"89.55","전국총점평균":"112.8","총점상위":"38%","학습포인트":"366.7","출결포인트":"50","전체포인트":"416.7","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"453.76","시간점수":"15.88","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"522.64","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/30/0/0","총학습수":"25","가감총점":"522.64","평균":"20.91","랭킹":"0","본부랭킹":"0","학습평균":"83.46","전국학습평균":"94.5","학습상위":"15%","시간평균":"3.32","전국시간평균":"3.95","시간상위":"63%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"101.02","전국총점평균":"112.8","총점상위":"18%","학습포인트":"408.38","출결포인트":"50","전체포인트":"458.38","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}],
  "6":[{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"B.초4","조명":"01조","학습점수":"600","시간점수":"34.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"700.8","상위가점":"20","하위감점":"0","상하위진도수":"25/0/0/0","총학습수":"25","가감총점":"720.8","평균":"120.13","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.8","전국시간평균":"3.95","시간상위":"5%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"120.13","전국총점평균":"112.8","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"3","전국회원수":"2412","최종랭킹":"Grand Master"},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"33.2","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"698.2","상위가점":"20","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"27","가감총점":"718.2","평균":"119.7","랭킹":"2","본부랭킹":"2","학습평균":"100","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.53","전국시간평균":"3.95","시간상위":"6%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.7","전국총점평균":"112.8","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"6","전국회원수":"2412","최종랭킹":"Grand Master"},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"B.초5","조명":"01조","학습점수":"600","시간점수":"35.9","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"699.9","상위가점":"20","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"27","가감총점":"719.9","평균":"119.98","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.98","전국시간평균":"3.95","시간상위":"4%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.98","전국총점평균":"112.8","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"4","전국회원수":"2412","최종랭킹":"Grand Master"},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"598","시간점수":"32.4","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"696.4","상위가점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"706.4","평균":"117.73","랭킹":"3","본부랭킹":"1","학습평균":"99.67","전국학습평균":"94.5","학습상위":"2%","시간평균":"5.4","전국시간평균":"3.95","시간상위":"8%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.73","전국총점평균":"112.8","총점상위":"2%","학습포인트":"598","출결포인트":"60","전체포인트":"658","복권이벤트":"-","전국랭킹":"9","전국회원수":"2412","최종랭킹":"Master"},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"596","시간점수":"31.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"693.8","상위가점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"703.8","평균":"117.3","랭킹":"4","본부랭킹":"2","학습평균":"99.33","전국학습평균":"94.5","학습상위":"2%","시간평균":"5.3","전국시간평균":"3.95","시간상위":"9%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.3","전국총점평균":"112.8","총점상위":"2%","학습포인트":"596","출결포인트":"60","전체포인트":"656","복권이벤트":"-","전국랭킹":"12","전국회원수":"2412","최종랭킹":"Master"},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"590","시간점수":"28.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"684.5","상위가점":"10","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"26","가감총점":"694.5","평균":"115.75","랭킹":"5","본부랭킹":"1","학습평균":"98.33","전국학습평균":"94.5","학습상위":"3%","시간평균":"4.75","전국시간평균":"3.95","시간상위":"15%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"115.75","전국총점평균":"112.8","총점상위":"3%","학습포인트":"590","출결포인트":"60","전체포인트":"650","복권이벤트":"-","전국랭킹":"18","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"572","시간점수":"24.2","출결점수":"58","학습가산점":"1","리셋감점":"0","총점":"655.2","상위가점":"10","하위감점":"0","상하위진도수":"0/16/0/0","총학습수":"16","가감총점":"665.2","평균":"110.87","랭킹":"6","본부랭킹":"2","학습평균":"95.33","전국학습평균":"94.5","학습상위":"5%","시간평균":"4.03","전국시간평균":"3.95","시간상위":"38%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"110.87","전국총점평균":"112.8","총점상위":"5%","학습포인트":"472","출결포인트":"50","전체포인트":"522","복권이벤트":"-","전국랭킹":"52","전국회원수":"2412","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"569","시간점수":"23.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"658.8","상위가산":"10","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"25","가감총점":"668.8","평균":"111.47","랭킹":"7","본부랭킹":"1","학습평균":"94.83","전국학습평균":"94.5","학습상위":"6%","시간평균":"3.97","전국시간평균":"3.95","시간상위":"40%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"111.47","전국총점평균":"112.8","총점상위":"6%","학습포인트":"569","출결포인트":"60","전체포인트":"629","복권이벤트":"-","전국랭킹":"68","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"565","시간점수":"22.9","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"653.9","상위가점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"663.9","평균":"110.65","랭킹":"8","본부랭킹":"3","학습평균":"94.17","전국학습평균":"94.5","학습상위":"7%","시간평균":"3.82","전국시간평균":"3.95","시간상위":"45%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"110.65","전국총점평균":"112.8","총점상위":"7%","학습포인트":"565","출결포인트":"60","전체포인트":"625","복권이벤트":"-","전국랭킹":"88","전국회원수":"2412","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"558","시간점수":"21.5","출결점수":"58","학습가산점":"5","리셋감점":"0","총점":"642.5","상위가점":"10","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"25","가감총점":"652.5","평균":"108.75","랭킹":"9","본부랭킹":"1","학습평균":"93.0","전국학습평균":"94.5","학습상위":"8%","시간평균":"3.58","전국시간평균":"3.95","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"108.75","전국총점평균":"112.8","총점상위":"8%","학습포인트":"458","출결포인트":"50","전체포인트":"508","복권이벤트":"-","전국랭킹":"122","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"548","시간점수":"19.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"633.8","상위가점":"10","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"26","가감총점":"643.8","평균":"107.3","랭킹":"10","본부랭킹":"4","학습평균":"91.33","전국학습평균":"94.5","학습상위":"9%","시간평균":"3.3","전국시간평균":"3.95","시간상위":"60%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"107.3","전국총점평균":"112.8","총점상위":"9%","학습포인트":"548","출결포인트":"60","전체포인트":"608","복권이벤트":"-","전국랭킹":"158","전국회원수":"2412","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"535","시간점수":"17.2","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"613.2","상위가점":"0","하위감점":"0","상하위진도수":"0/6/10/0","총학습수":"16","가감총점":"613.2","평균":"102.2","랭킹":"11","본부랭킹":"5","학습평균":"89.17","전국학습평균":"94.5","학습상위":"11%","시간평균":"2.87","전국시간평균":"3.95","시간상위":"68%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"102.2","전국총점평균":"112.8","총점상위":"11%","학습포인트":"535","출결포인트":"60","전체포인트":"595","복권이벤트":"-","전국랭킹":"212","전국회원수":"2412","최종랭킹":""},{"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"476","시간점수":"14.9","출결점수":"54","학습가산점":"2","리셋감점":"0","총점":"546.9","상위가점":"0","하위감점":"-30","상하위진도수":"0/16/8/0","총학습수":"24","가감총점":"516.9","평균":"86.15","랭킹":"0","본부랭킹":"0","학습평균":"79.33","전국학습평균":"94.5","학습상위":"32%","시간평균":"2.48","전국시간평균":"3.95","시간상위":"82%","출결평균":"9.0","전국출결평균":"9.1","출결상위":"55%","총점평균":"86.15","전국총점평균":"112.8","총점상위":"42%","학습포인트":"476","출결포인트":"50","전체포인트":"526","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":"최하고정"},{"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"488","시간점수":"16.3","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"567.3","상위가점":"0","하위감점":"-30","상하위진도수":"0/18/8/0","총학습수":"26","가감총점":"537.3","평균":"89.55","랭킹":"0","본부랭킹":"0","학습평균":"81.33","전국학습평균":"94.5","학습상위":"28%","시간평균":"2.72","전국시간평균":"3.95","시간상위":"78%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"89.55","전국총점평균":"112.8","총점상위":"38%","학습포인트":"488","출결포인트":"60","전체포인트":"548","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":"최하고정"},{"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"522","시간점수":"20.1","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"606.1","상위가점":"0","하위감점":"0","상하위진도수":"0/30/0/0","총학습수":"30","가감총점":"606.1","평균":"101.02","랭킹":"0","본부랭킹":"0","학습평균":"87.0","전국학습평균":"94.5","학습상위":"15%","시간평균":"3.35","전국시간평균":"3.95","시간상위":"63%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"101.02","전국총점평균":"112.8","총점상위":"18%","학습포인트":"522","출결포인트":"60","전체포인트":"582","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}]},
  data: [
      {"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"B.초4","조명":"01조","학습점수":"600","시간점수":"34.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"700.8","상위가점":"20","하위감점":"0","상하위진도수":"25/0/0/0","총학습수":"25","가감총점":"720.8","평균":"120.13","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.8","전국시간평균":"3.95","시간상위":"5%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"120.13","전국총점평균":"112.8","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"3","전국회원수":"2412","최종랭킹":"Grand Master"},
      {"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055697580","회원명":"김나경","생년월일":"2017-09-29","리그명":"B.초1","조명":"01조","학습점수":"600","시간점수":"33.2","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"698.2","상위가점":"20","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"27","가감총점":"718.2","평균":"119.7","랭킹":"2","본부랭킹":"2","학습평균":"100","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.53","전국시간평균":"3.95","시간상위":"6%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.7","전국총점평균":"112.8","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"6","전국회원수":"2412","최종랭킹":"Grand Master"},
      {"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"B.초5","조명":"01조","학습점수":"600","시간점수":"35.9","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"699.9","상위가점":"20","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"27","가감총점":"719.9","평균":"119.98","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"94.5","학습상위":"1%","시간평균":"5.98","전국시간평균":"3.95","시간상위":"4%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"119.98","전국총점평균":"112.8","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"4","전국회원수":"2412","최종랭킹":"Grand Master"},
      {"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"B.초1","조명":"01조","학습점수":"598","시간점수":"32.4","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"696.4","상위가점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"706.4","평균":"117.73","랭킹":"3","본부랭킹":"1","학습평균":"99.67","전국학습평균":"94.5","학습상위":"2%","시간평균":"5.4","전국시간평균":"3.95","시간상위":"8%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.73","전국총점평균":"112.8","총점상위":"2%","학습포인트":"598","출결포인트":"60","전체포인트":"658","복권이벤트":"-","전국랭킹":"9","전국회원수":"2412","최종랭킹":"Master"},
      {"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056215512","회원명":"강용호","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"596","시간점수":"31.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"693.8","상위가점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"703.8","평균":"117.3","랭킹":"4","본부랭킹":"2","학습평균":"99.33","전국학습평균":"94.5","학습상위":"2%","시간평균":"5.3","전국시간평균":"3.95","시간상위":"9%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"117.3","전국총점평균":"112.8","총점상위":"2%","학습포인트":"596","출결포인트":"60","전체포인트":"656","복권이벤트":"-","전국랭킹":"12","전국회원수":"2412","최종랭킹":"Master"},
      {"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"B.초1","조명":"01조","학습점수":"590","시간점수":"28.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"684.5","상위가점":"10","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"26","가감총점":"694.5","평균":"115.75","랭킹":"5","본부랭킹":"1","학습평균":"98.33","전국학습평균":"94.5","학습상위":"3%","시간평균":"4.75","전국시간평균":"3.95","시간상위":"15%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"115.75","전국총점평균":"112.8","총점상위":"3%","학습포인트":"590","출결포인트":"60","전체포인트":"650","복권이벤트":"-","전국랭킹":"18","전국회원수":"2412","최종랭킹":""},
      {"본부":"대교 경인본부","지점":"대교 김포한강 Hive","센터":"[LC]북변","센터타입":"LC","교사명":"유영선","회원번호":"000S-0056237070","회원명":"선시우","생년월일":"2019-06-05","리그명":"B.초1","조명":"01조","학습점수":"572","시간점수":"24.2","출결점수":"58","학습가산점":"1","리셋감점":"0","총점":"655.2","상위가점":"10","하위감점":"0","상하위진도수":"0/16/0/0","총학습수":"16","가감총점":"665.2","평균":"110.87","랭킹":"6","본부랭킹":"2","학습평균":"95.33","전국학습평균":"94.5","학습상위":"5%","시간평균":"4.03","전국시간평균":"3.95","시간상위":"38%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"110.87","전국총점평균":"112.8","총점상위":"5%","학습포인트":"472","출결포인트":"50","전체포인트":"522","복권이벤트":"-","전국랭킹":"52","전국회원수":"2412","최종랭킹":""},
      {"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"B.초1","조명":"01조","학습점수":"569","시간점수":"23.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"658.8","상위가산":"10","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"25","가감총점":"668.8","평균":"111.47","랭킹":"7","본부랭킹":"1","학습평균":"94.83","전국학습평균":"94.5","학습상위":"6%","시간평균":"3.97","전국시간평균":"3.95","시간상위":"40%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"111.47","전국총점평균":"112.8","총점상위":"6%","학습포인트":"569","출결포인트":"60","전체포인트":"629","복권이벤트":"-","전국랭킹":"68","전국회원수":"2412","최종랭킹":""},
      {"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"B.초1","조명":"01조","학습점수":"565","시간점수":"22.9","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"653.9","상위가점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"663.9","평균":"110.65","랭킹":"8","본부랭킹":"3","학습평균":"94.17","전국학습평균":"94.5","학습상위":"7%","시간평균":"3.82","전국시간평균":"3.95","시간상위":"45%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"110.65","전국총점평균":"112.8","총점상위":"7%","학습포인트":"565","출결포인트":"60","전체포인트":"625","복권이벤트":"-","전국랭킹":"88","전국회원수":"2412","최종랭킹":""},
      {"본부":"대교 서울강원본부","지점":"성동광진 교육국","센터":"[YC]중곡","센터타입":"YC","교사명":"이민경","회원번호":"000S-0056050651","회원명":"길민호","생년월일":"2018-05-18","리그명":"B.초1","조명":"01조","학습점수":"558","시간점수":"21.5","출결점수":"58","학습가산점":"5","리셋감점":"0","총점":"642.5","상위가점":"10","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"25","가감총점":"652.5","평균":"108.75","랭킹":"9","본부랭킹":"1","학습평균":"93.0","전국학습평균":"94.5","학습상위":"8%","시간평균":"3.58","전국시간평균":"3.95","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.1","출결상위":"28%","총점평균":"108.75","전국총점평균":"112.8","총점상위":"8%","학습포인트":"458","출결포인트":"50","전체포인트":"508","복권이벤트":"-","전국랭킹":"122","전국회원수":"2412","최종랭킹":""},
      {"본부":"대교 경산본부","지점":"대교 동대구 Hive","센터":"[YC]대산","센터타입":"YC","교사명":"윤희순","회원번호":"000S-0056161782","회원명":"김하민","생년월일":"2018-10-02","리그명":"B.초1","조명":"01조","학습점수":"548","시간점수":"19.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"633.8","상위가점":"10","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"26","가감총점":"643.8","평균":"107.3","랭킹":"10","본부랭킹":"4","학습평균":"91.33","전국학습평균":"94.5","학습상위":"9%","시간평균":"3.3","전국시간평균":"3.95","시간상위":"60%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"107.3","전국총점평균":"112.8","총점상위":"9%","학습포인트":"548","출결포인트":"60","전체포인트":"608","복권이벤트":"-","전국랭킹":"158","전국회원수":"2412","최종랭킹":""},
      {"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"문인숙","회원번호":"000S-0056063042","회원명":"권시완","생년월일":"2018-07-28","리그명":"B.초1","조명":"01조","학습점수":"535","시간점수":"17.2","출결점수":"60","학습가산점":"1","리셋감점":"0","총점":"613.2","상위가점":"0","하위감점":"0","상하위진도수":"0/6/10/0","총학습수":"16","가감총점":"613.2","평균":"102.2","랭킹":"11","본부랭킹":"5","학습평균":"89.17","전국학습평균":"94.5","학습상위":"11%","시간평균":"2.87","전국시간평균":"3.95","시간상위":"68%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"102.2","전국총점평균":"112.8","총점상위":"11%","학습포인트":"535","출결포인트":"60","전체포인트":"595","복권이벤트":"-","전국랭킹":"212","전국회원수":"2412","최종랭킹":""},
      {"본부":"대교 충남본부","지점":"대교 수원남부 Hive","센터":"[대]아라","센터타입":"YC","교사명":"최대교","회원번호":"000S-0055921135","회원명":"박서준","생년월일":"2014-06-28","리그명":"-","조명":"-","학습점수":"476","시간점수":"14.9","출결점수":"54","학습가산점":"2","리셋감점":"0","총점":"546.9","상위가점":"0","하위감점":"-30","상하위진도수":"0/16/8/0","총학습수":"24","가감총점":"516.9","평균":"86.15","랭킹":"0","본부랭킹":"0","학습평균":"79.33","전국학습평균":"94.5","학습상위":"32%","시간평균":"2.48","전국시간평균":"3.95","시간상위":"82%","출결평균":"9.0","전국출결평균":"9.1","출결상위":"55%","총점평균":"86.15","전국총점평균":"112.8","총점상위":"42%","학습포인트":"476","출결포인트":"50","전체포인트":"526","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":"최하고정"},
      {"본부":"대교 충남본부","지점":"대교 세종 Hive","센터":"[LC]권선","센터타입":"LC","교사명":"이대교","회원번호":"000S-0055472486","회원명":"문지호","생년월일":"2016-11-09","리그명":"-","조명":"-","학습점수":"488","시간점수":"16.3","출결점수":"60","학습가산점":"3","리셋감점":"0","총점":"567.3","상위가점":"0","하위감점":"-30","상하위진도수":"0/18/8/0","총학습수":"26","가감총점":"537.3","평균":"89.55","랭킹":"0","본부랭킹":"0","학습평균":"81.33","전국학습평균":"94.5","학습상위":"28%","시간평균":"2.72","전국시간평균":"3.95","시간상위":"78%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"89.55","전국총점평균":"112.8","총점상위":"38%","학습포인트":"488","출결포인트":"60","전체포인트":"548","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":"최하고정"},
      {"본부":"대교 서울북부본부","지점":"대교 창원 Hive","센터":"[LC]해운대","센터타입":"LC","교사명":"한대교","회원번호":"000S-0055852237","회원명":"허도현","생년월일":"2016-08-22","리그명":"-","조명":"-","학습점수":"522","시간점수":"20.1","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"606.1","상위가점":"0","하위감점":"0","상하위진도수":"0/30/0/0","총학습수":"30","가감총점":"606.1","평균":"101.02","랭킹":"0","본부랭킹":"0","학습평균":"87.0","전국학습평균":"94.5","학습상위":"15%","시간평균":"3.35","전국시간평균":"3.95","시간상위":"63%","출결평균":"10","전국출결평균":"9.1","출결상위":"1%","총점평균":"101.02","전국총점평균":"112.8","총점상위":"18%","학습포인트":"522","출결포인트":"60","전체포인트":"582","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}
    ]
  };

  // ── 2024 서머 (목업 12건)
  LEAGUE_DATA['2024_summer'] = {
    label: '2024 서머 리그오브매스',
    finalized: true,
    totalWeeks:6,
  weeks:{  "1":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"103.43","시간점수":"5.97","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"122.4","상위가점":"0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"5","가감총점":"122.4","평균":"24.48","랭킹":"3","본부랭킹":"0","학습평균":"97.1","전국학습평균":"93.2","학습상위":"1%","시간평균":"5.87","전국시간평균":"3.88","시간상위":"3%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.37","전국총점평균":"111.5","총점상위":"1%","학습포인트":"93.09","출결포인트":"12","전체포인트":"105.09","복권이벤트":"-","전국랭킹":"77","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"100.46","시간점수":"5.68","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"119.14","상위가점":"0","하위감점":"0","상하위진도수":"24/0/0/0","총학습수":"4","가감총점":"119.14","평균":"29.79","랭킹":"1","본부랭킹":"0","학습평균":"95.15","전국학습평균":"93.2","학습상위":"1%","시간평균":"5.36","전국시간평균":"3.88","시간상위":"4%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.02","전국총점평균":"111.5","총점상위":"1%","학습포인트":"90.41","출결포인트":"12","전체포인트":"102.41","복권이벤트":"-","전국랭킹":"19","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"98.83","시간점수":"5.44","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"117.27","상위가점":"0","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"4","가감총점":"117.27","평균":"29.32","랭킹":"6","본부랭킹":"0","학습평균":"97.97","전국학습평균":"93.2","학습상위":"2%","시간평균":"5.69","전국시간평균":"3.88","시간상위":"5%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"119.42","전국총점평균":"111.5","총점상위":"1%","학습포인트":"88.95","출결포인트":"12","전체포인트":"100.95","복권이벤트":"-","전국랭킹":"62","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"96.03","시간점수":"4.69","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"113.72","상위가점":"0","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"4","가감총점":"113.72","평균":"28.43","랭킹":"8","본부랭킹":"0","학습평균":"96.14","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.74","전국시간평균":"3.88","시간상위":"16%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.7","전국총점평균":"111.5","총점상위":"3%","학습포인트":"86.43","출결포인트":"12","전체포인트":"98.43","복권이벤트":"-","전국랭킹":"55","전국회원수":"2301","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"98.82","시간점수":"4.24","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"116.06","상위가산점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"4","가감총점":"116.06","평균":"29.02","랭킹":"8","본부랭킹":"0","학습평균":"96.23","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.7","전국시간평균":"3.88","시간상위":"18%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.25","전국총점평균":"111.5","총점상위":"3%","학습포인트":"88.94","출결포인트":"12","전체포인트":"100.94","복권이벤트":"-","전국랭킹":"77","전국회원수":"2301","최종랭킹":"","상위가점":"0"},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"93.26","시간점수":"4.31","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"110.57","상위가점":"0","하위감점":"0","상하위진도수":"0/20/4/0","총학습수":"4","가감총점":"110.57","평균":"27.64","랭킹":"4","본부랭킹":"0","학습평균":"98.1","전국학습평균":"93.2","학습상위":"5%","시간평균":"3.94","전국시간평균":"3.88","시간상위":"22%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"113.3","전국총점평균":"111.5","총점상위":"5%","학습포인트":"83.93","출결포인트":"12","전체포인트":"95.93","복권이벤트":"-","전국랭킹":"71","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"90.75","시간점수":"3.76","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"107.51","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"4","가감총점":"107.51","평균":"26.88","랭킹":"6","본부랭킹":"0","학습평균":"94.29","전국학습평균":"93.2","학습상위":"6%","시간평균":"3.82","전국시간평균":"3.88","시간상위":"30%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"111.97","전국총점평균":"111.5","총점상위":"6%","학습포인트":"81.67","출결포인트":"12","전체포인트":"93.67","복권이벤트":"-","전국랭킹":"67","전국회원수":"2301","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"96.58","시간점수":"3.72","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"113.3","상위가점":"0","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"4","가감총점":"113.3","평균":"28.32","랭킹":"12","본부랭킹":"0","학습평균":"93.4","전국학습평균":"93.2","학습상위":"7%","시간평균":"3.26","전국시간평균":"3.88","시간상위":"40%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"110.25","전국총점평균":"111.5","총점상위":"7%","학습포인트":"86.92","출결포인트":"12","전체포인트":"98.92","복권이벤트":"-","전국랭킹":"140","전국회원수":"2301","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"89.15","시간점수":"2.98","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"104.13","상위가점":"0","하위감점":"0","상하위진도수":"0/12/8/0","총학습수":"3","가감총점":"104.13","평균":"34.71","랭킹":"9","본부랭킹":"0","학습평균":"89.52","전국학습평균":"93.2","학습상위":"9%","시간평균":"3.06","전국시간평균":"3.88","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"105.87","전국총점평균":"111.5","총점상위":"9%","학습포인트":"80.24","출결포인트":"12","전체포인트":"92.24","복권이벤트":"-","전국랭킹":"152","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 광명 Hive","센터":"[LC]광명하안","센터타입":"LC","교사명":"최민호","회원번호":"000S-2001001002","회원명":"박하진","생년월일":"2018-01-12","리그명":"-","조명":"-","학습점수":"94.98","시간점수":"2.87","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"109.85","상위가점":"0","하위감점":"0","상하위진도수":"0/11/9/0","총학습수":"3","가감총점":"109.85","평균":"36.62","랭킹":"12","본부랭킹":"0","학습평균":"88.53","전국학습평균":"93.2","학습상위":"11%","시간평균":"2.97","전국시간평균":"3.88","시간상위":"60%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"103.8","전국총점평균":"111.5","총점상위":"11%","학습포인트":"85.48","출결포인트":"12","전체포인트":"97.48","복권이벤트":"-","전국랭킹":"161","전국회원수":"2301","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"87.09","시간점수":"2.54","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"102.63","상위가점":"0","하위감점":"0","상하위진도수":"0/28/2/0","총학습수":"5","가감총점":"102.63","평균":"20.53","랭킹":"0","본부랭킹":"0","학습평균":"84.03","전국학습평균":"93.2","학습상위":"18%","시간평균":"2.38","전국시간평균":"3.88","시간상위":"70%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"96.87","전국총점평균":"111.5","총점상위":"22%","학습포인트":"78.38","출결포인트":"12","전체포인트":"90.38","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"85.2","시간점수":"2.92","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"101.12","상위가점":"0","하위감점":"0","상하위진도수":"0/29/0/0","총학습수":"5","가감총점":"101.12","평균":"20.22","랭킹":"0","본부랭킹":"0","학습평균":"80.88","전국학습평균":"93.2","학습상위":"16%","시간평균":"2.65","전국시간평균":"3.88","시간상위":"65%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"98.97","전국총점평균":"111.5","총점상위":"20%","학습포인트":"76.68","출결포인트":"12","전체포인트":"88.68","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}],
  "2":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"208.83","시간점수":"12.64","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"245.47","상위가점":"0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"11","가감총점":"245.47","평균":"22.32","랭킹":"5","본부랭킹":"0","학습평균":"99.05","전국학습평균":"93.2","학습상위":"1%","시간평균":"6.05","전국시간평균":"3.88","시간상위":"3%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.37","전국총점평균":"111.5","총점상위":"1%","학습포인트":"187.95","출결포인트":"22","전체포인트":"209.95","복권이벤트":"-","전국랭킹":"7","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"199.45","시간점수":"11.37","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"234.82","상위가점":"0","하위감점":"0","상하위진도수":"24/0/0/0","총학습수":"8","가감총점":"234.82","평균":"29.35","랭킹":"4","본부랭킹":"0","학습평균":"99.05","전국학습평균":"93.2","학습상위":"1%","시간평균":"5.52","전국시간평균":"3.88","시간상위":"4%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.02","전국총점평균":"111.5","총점상위":"1%","학습포인트":"179.5","출결포인트":"22","전체포인트":"201.5","복권이벤트":"-","전국랭킹":"73","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"200.8","시간점수":"11.29","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"235.09","상위가점":"0","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"9","가감총점":"235.09","평균":"26.12","랭킹":"4","본부랭킹":"0","학습평균":"95.14","전국학습평균":"93.2","학습상위":"2%","시간평균":"5.84","전국시간평균":"3.88","시간상위":"5%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"119.42","전국총점평균":"111.5","총점상위":"1%","학습포인트":"180.72","출결포인트":"22","전체포인트":"202.72","복권이벤트":"-","전국랭킹":"78","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"189.71","시간점수":"8.52","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"222.23","상위가점":"0","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"9","가감총점":"222.23","평균":"24.69","랭킹":"7","본부랭킹":"0","학습평균":"93.87","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.54","전국시간평균":"3.88","시간상위":"16%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.7","전국총점평균":"111.5","총점상위":"3%","학습포인트":"170.74","출결포인트":"22","전체포인트":"192.74","복권이벤트":"-","전국랭킹":"1","전국회원수":"2301","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"191.23","시간점수":"8.91","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"224.14","상위가산점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"8","가감총점":"224.14","평균":"28.02","랭킹":"4","본부랭킹":"0","학습평균":"95.44","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.76","전국시간평균":"3.88","시간상위":"18%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.25","전국총점평균":"111.5","총점상위":"3%","학습포인트":"172.11","출결포인트":"22","전체포인트":"194.11","복권이벤트":"-","전국랭킹":"90","전국회원수":"2301","최종랭킹":"","상위가점":"0"},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"197.13","시간점수":"7.92","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"228.05","상위가점":"0","하위감점":"0","상하위진도수":"0/20/4/0","총학습수":"8","가감총점":"228.05","평균":"28.51","랭킹":"8","본부랭킹":"0","학습평균":"94.61","전국학습평균":"93.2","학습상위":"5%","시간평균":"4.03","전국시간평균":"3.88","시간상위":"22%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"113.3","전국총점평균":"111.5","총점상위":"5%","학습포인트":"177.42","출결포인트":"22","전체포인트":"199.42","복권이벤트":"-","전국랭킹":"92","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"193.9","시간점수":"7.77","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"225.67","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"8","가감총점":"225.67","평균":"28.21","랭킹":"10","본부랭킹":"0","학습평균":"88.2","전국학습평균":"93.2","학습상위":"6%","시간평균":"3.82","전국시간평균":"3.88","시간상위":"30%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"111.97","전국총점평균":"111.5","총점상위":"6%","학습포인트":"174.51","출결포인트":"22","전체포인트":"196.51","복권이벤트":"-","전국랭킹":"44","전국회원수":"2301","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"192.09","시간점수":"6.56","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"222.65","상위가점":"0","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"8","가감총점":"222.65","평균":"27.83","랭킹":"12","본부랭킹":"0","학습평균":"86.53","전국학습평균":"93.2","학습상위":"7%","시간평균":"3.52","전국시간평균":"3.88","시간상위":"40%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"110.25","전국총점평균":"111.5","총점상위":"7%","학습포인트":"172.88","출결포인트":"22","전체포인트":"194.88","복권이벤트":"-","전국랭킹":"49","전국회원수":"2301","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"192.94","시간점수":"6.15","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"221.09","상위가점":"0","하위감점":"0","상하위진도수":"0/12/8/0","총학습수":"7","가감총점":"221.09","평균":"31.58","랭킹":"10","본부랭킹":"0","학습평균":"91.12","전국학습평균":"93.2","학습상위":"9%","시간평균":"3.24","전국시간평균":"3.88","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"105.87","전국총점평균":"111.5","총점상위":"9%","학습포인트":"173.65","출결포인트":"21","전체포인트":"194.65","복권이벤트":"-","전국랭킹":"129","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 광명 Hive","센터":"[LC]광명하안","센터타입":"LC","교사명":"최민호","회원번호":"000S-2001001002","회원명":"박하진","생년월일":"2018-01-12","리그명":"-","조명":"-","학습점수":"177.8","시간점수":"5.59","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"205.39","상위가점":"0","하위감점":"0","상하위진도수":"0/11/9/0","총학습수":"7","가감총점":"205.39","평균":"29.34","랭킹":"8","본부랭킹":"0","학습평균":"84.38","전국학습평균":"93.2","학습상위":"11%","시간평균":"2.93","전국시간평균":"3.88","시간상위":"60%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"103.8","전국총점평균":"111.5","총점상위":"11%","학습포인트":"160.02","출결포인트":"21","전체포인트":"181.02","복권이벤트":"-","전국랭킹":"216","전국회원수":"2301","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"168.59","시간점수":"5.11","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"195.7","상위가점":"0","하위감점":"0","상하위진도수":"0/28/2/0","총학습수":"10","가감총점":"195.7","평균":"19.57","랭킹":"0","본부랭킹":"0","학습평균":"85.15","전국학습평균":"93.2","학습상위":"18%","시간평균":"2.62","전국시간평균":"3.88","시간상위":"70%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"96.87","전국총점평균":"111.5","총점상위":"22%","학습포인트":"151.73","출결포인트":"21","전체포인트":"172.73","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"165.12","시간점수":"5.78","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"194.9","상위가점":"0","하위감점":"0","상하위진도수":"0/29/0/0","총학습수":"10","가감총점":"194.9","평균":"19.49","랭킹":"0","본부랭킹":"0","학습평균":"80.0","전국학습평균":"93.2","학습상위":"16%","시간평균":"2.91","전국시간평균":"3.88","시간상위":"65%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"98.97","전국총점평균":"111.5","총점상위":"20%","학습포인트":"148.61","출결포인트":"22","전체포인트":"170.61","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}],
  "3":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"314.92","시간점수":"17.37","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"367.29","상위가점":"20.0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"16","가감총점":"387.29","평균":"24.21","랭킹":"2","본부랭킹":"0","학습평균":"101.37","전국학습평균":"93.2","학습상위":"1%","시간평균":"6.3","전국시간평균":"3.88","시간상위":"3%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.37","전국총점평균":"111.5","총점상위":"1%","학습포인트":"283.43","출결포인트":"32","전체포인트":"315.43","복권이벤트":"-","전국랭킹":"1","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"312.26","시간점수":"18.1","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"365.36","상위가점":"20.0","하위감점":"0","상하위진도수":"24/0/0/0","총학습수":"12","가감총점":"385.36","평균":"32.11","랭킹":"1","본부랭킹":"0","학습평균":"97.51","전국학습평균":"93.2","학습상위":"1%","시간평균":"5.36","전국시간평균":"3.88","시간상위":"4%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.02","전국총점평균":"111.5","총점상위":"1%","학습포인트":"281.03","출결포인트":"32","전체포인트":"313.03","복권이벤트":"-","전국랭킹":"10","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"313.44","시간점수":"16.26","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"363.7","상위가점":"20.0","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"14","가감총점":"383.7","평균":"27.41","랭킹":"6","본부랭킹":"0","학습평균":"96.92","전국학습평균":"93.2","학습상위":"2%","시간평균":"5.94","전국시간평균":"3.88","시간상위":"5%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"119.42","전국총점평균":"111.5","총점상위":"1%","학습포인트":"282.1","출결포인트":"32","전체포인트":"314.1","복권이벤트":"-","전국랭킹":"43","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"284.21","시간점수":"13.76","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"332.97","상위가점":"10.0","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"13","가감총점":"342.97","평균":"26.38","랭킹":"4","본부랭킹":"0","학습평균":"98.42","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.46","전국시간평균":"3.88","시간상위":"16%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.7","전국총점평균":"111.5","총점상위":"3%","학습포인트":"255.79","출결포인트":"32","전체포인트":"287.79","복권이벤트":"-","전국랭킹":"5","전국회원수":"2301","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"300.79","시간점수":"13.71","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"349.5","상위가산점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"12","가감총점":"349.5","평균":"29.12","랭킹":"8","본부랭킹":"0","학습평균":"90.3","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.35","전국시간평균":"3.88","시간상위":"18%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.25","전국총점평균":"111.5","총점상위":"3%","학습포인트":"270.71","출결포인트":"32","전체포인트":"302.71","복권이벤트":"-","전국랭킹":"8","전국회원수":"2301","최종랭킹":"","상위가점":"0.0"},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"284.06","시간점수":"12.91","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"330.97","상위가점":"10.0","하위감점":"0","상하위진도수":"0/20/4/0","총학습수":"12","가감총점":"340.97","평균":"28.41","랭킹":"5","본부랭킹":"0","학습평균":"94.84","전국학습평균":"93.2","학습상위":"5%","시간평균":"4.28","전국시간평균":"3.88","시간상위":"22%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"113.3","전국총점평균":"111.5","총점상위":"5%","학습포인트":"255.65","출결포인트":"32","전체포인트":"287.65","복권이벤트":"-","전국랭킹":"20","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"283.3","시간점수":"11.47","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"329.77","상위가점":"10.0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"12","가감총점":"339.77","평균":"28.31","랭킹":"7","본부랭킹":"0","학습평균":"91.52","전국학습평균":"93.2","학습상위":"6%","시간평균":"3.63","전국시간평균":"3.88","시간상위":"30%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"111.97","전국총점평균":"111.5","총점상위":"6%","학습포인트":"254.97","출결포인트":"32","전체포인트":"286.97","복권이벤트":"-","전국랭킹":"26","전국회원수":"2301","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"295.58","시간점수":"10.44","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"341.02","상위가점":"10.0","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"12","가감총점":"351.02","평균":"29.25","랭킹":"7","본부랭킹":"0","학습평균":"88.93","전국학습평균":"93.2","학습상위":"7%","시간평균":"3.35","전국시간평균":"3.88","시간상위":"40%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"110.25","전국총점평균":"111.5","총점상위":"7%","학습포인트":"266.02","출결포인트":"32","전체포인트":"298.02","복권이벤트":"-","전국랭킹":"32","전국회원수":"2301","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"284.54","시간점수":"10.01","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"326.55","상위가점":"0.0","하위감점":"0","상하위진도수":"0/12/8/0","총학습수":"10","가감총점":"326.55","평균":"32.66","랭킹":"9","본부랭킹":"0","학습평균":"91.79","전국학습평균":"93.2","학습상위":"9%","시간평균":"2.89","전국시간평균":"3.88","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"105.87","전국총점평균":"111.5","총점상위":"9%","학습포인트":"256.09","출결포인트":"30","전체포인트":"286.09","복권이벤트":"-","전국랭킹":"142","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 광명 Hive","센터":"[LC]광명하안","센터타입":"LC","교사명":"최민호","회원번호":"000S-2001001002","회원명":"박하진","생년월일":"2018-01-12","리그명":"-","조명":"-","학습점수":"276.69","시간점수":"8.93","출결점수":"30","학습가산점":"1","리셋감점":"0","총점":"316.62","상위가점":"0.0","하위감점":"0","상하위진도수":"0/11/9/0","총학습수":"10","가감총점":"316.62","평균":"31.66","랭킹":"8","본부랭킹":"0","학습평균":"84.64","전국학습평균":"93.2","학습상위":"11%","시간평균":"2.81","전국시간평균":"3.88","시간상위":"60%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"103.8","전국총점평균":"111.5","총점상위":"11%","학습포인트":"249.02","출결포인트":"30","전체포인트":"279.02","복권이벤트":"-","전국랭킹":"203","전국회원수":"2301","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"249.62","시간점수":"7.41","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"289.03","상위가점":"0.0","하위감점":"0","상하위진도수":"0/28/2/0","총학습수":"15","가감총점":"289.03","평균":"19.27","랭킹":"0","본부랭킹":"0","학습평균":"84.8","전국학습평균":"93.2","학습상위":"18%","시간평균":"2.54","전국시간평균":"3.88","시간상위":"70%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"96.87","전국총점평균":"111.5","총점상위":"22%","학습포인트":"224.66","출결포인트":"30","전체포인트":"254.66","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"251.16","시간점수":"7.71","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"292.87","상위가점":"0.0","하위감점":"0","상하위진도수":"0/29/0/0","총학습수":"14","가감총점":"292.87","평균":"20.92","랭킹":"0","본부랭킹":"0","학습평균":"86.32","전국학습평균":"93.2","학습상위":"16%","시간평균":"2.64","전국시간평균":"3.88","시간상위":"65%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"98.97","전국총점평균":"111.5","총점상위":"20%","학습포인트":"226.04","출결포인트":"32","전체포인트":"258.04","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}],
  "4":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"404.59","시간점수":"22.51","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"472.1","상위가점":"20.0","하위감점":"0.0","상하위진도수":"32/0/0/0","총학습수":"21","가감총점":"492.1","평균":"23.43","랭킹":"1","본부랭킹":"0","학습평균":"93.53","전국학습평균":"93.2","학습상위":"1%","시간평균":"6.1","전국시간평균":"3.88","시간상위":"3%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.37","전국총점평균":"111.5","총점상위":"1%","학습포인트":"364.13","출결포인트":"41","전체포인트":"405.13","복권이벤트":"-","전국랭킹":"32","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"403.56","시간점수":"22.52","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"471.08","상위가점":"20.0","하위감점":"0.0","상하위진도수":"24/0/0/0","총학습수":"16","가감총점":"491.08","평균":"30.69","랭킹":"4","본부랭킹":"0","학습평균":"99.4","전국학습평균":"93.2","학습상위":"1%","시간평균":"5.97","전국시간평균":"3.88","시간상위":"4%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.02","전국총점평균":"111.5","총점상위":"1%","학습포인트":"363.2","출결포인트":"41","전체포인트":"404.2","복권이벤트":"-","전국랭킹":"32","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"411.65","시간점수":"23.33","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"478.98","상위가점":"20.0","하위감점":"0.0","상하위진도수":"27/0/0/0","총학습수":"18","가감총점":"498.98","평균":"27.72","랭킹":"6","본부랭킹":"0","학습평균":"97.63","전국학습평균":"93.2","학습상위":"2%","시간평균":"5.85","전국시간평균":"3.88","시간상위":"5%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"119.42","전국총점평균":"111.5","총점상위":"1%","학습포인트":"370.49","출결포인트":"41","전체포인트":"411.49","복권이벤트":"-","전국랭킹":"70","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"394.34","시간점수":"18.41","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"457.75","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/26/0/0","총학습수":"17","가감총점":"467.75","평균":"27.51","랭킹":"4","본부랭킹":"0","학습평균":"99.48","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.31","전국시간평균":"3.88","시간상위":"16%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.7","전국총점평균":"111.5","총점상위":"3%","학습포인트":"354.91","출결포인트":"41","전체포인트":"395.91","복권이벤트":"-","전국랭킹":"1","전국회원수":"2301","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"404.89","시간점수":"18.98","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"468.87","상위가산점":"10","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"16","가감총점":"468.87","평균":"29.3","랭킹":"4","본부랭킹":"0","학습평균":"95.42","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.24","전국시간평균":"3.88","시간상위":"18%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.25","전국총점평균":"111.5","총점상위":"3%","학습포인트":"364.4","출결포인트":"41","전체포인트":"405.4","복권이벤트":"-","전국랭킹":"58","전국회원수":"2301","최종랭킹":"","상위가점":"0.0"},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"400.37","시간점수":"16.62","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"460.99","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/20/4/0","총학습수":"16","가감총점":"470.99","평균":"29.44","랭킹":"9","본부랭킹":"0","학습평균":"95.87","전국학습평균":"93.2","학습상위":"5%","시간평균":"4.19","전국시간평균":"3.88","시간상위":"22%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"113.3","전국총점평균":"111.5","총점상위":"5%","학습포인트":"360.33","출결포인트":"41","전체포인트":"401.33","복권이벤트":"-","전국랭킹":"24","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"396.54","시간점수":"15.34","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"456.88","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"16","가감총점":"466.88","평균":"29.18","랭킹":"5","본부랭킹":"0","학습평균":"88.96","전국학습평균":"93.2","학습상위":"6%","시간평균":"3.82","전국시간평균":"3.88","시간상위":"30%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"111.97","전국총점평균":"111.5","총점상위":"6%","학습포인트":"356.89","출결포인트":"41","전체포인트":"397.89","복권이벤트":"-","전국랭킹":"73","전국회원수":"2301","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"378.4","시간점수":"14.1","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"437.5","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/25/0/0","총학습수":"17","가감총점":"447.5","평균":"26.32","랭킹":"11","본부랭킹":"0","학습평균":"89.38","전국학습평균":"93.2","학습상위":"7%","시간평균":"3.23","전국시간평균":"3.88","시간상위":"40%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"110.25","전국총점평균":"111.5","총점상위":"7%","학습포인트":"340.56","출결포인트":"41","전체포인트":"381.56","복권이벤트":"-","전국랭킹":"135","전국회원수":"2301","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"360.91","시간점수":"11.53","출결점수":"40","학습가산점":"2","리셋감점":"0","총점":"414.44","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/12/8/0","총학습수":"13","가감총점":"414.44","평균":"31.88","랭킹":"8","본부랭킹":"0","학습평균":"85.78","전국학습평균":"93.2","학습상위":"9%","시간평균":"3.08","전국시간평균":"3.88","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"105.87","전국총점평균":"111.5","총점상위":"9%","학습포인트":"324.82","출결포인트":"40","전체포인트":"364.82","복권이벤트":"-","전국랭킹":"142","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 광명 Hive","센터":"[LC]광명하안","센터타입":"LC","교사명":"최민호","회원번호":"000S-2001001002","회원명":"박하진","생년월일":"2018-01-12","리그명":"-","조명":"-","학습점수":"370.61","시간점수":"11.64","출결점수":"40","학습가산점":"1","리셋감점":"0","총점":"423.25","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/11/9/0","총학습수":"13","가감총점":"423.25","평균":"32.56","랭킹":"8","본부랭킹":"0","학습평균":"92.52","전국학습평균":"93.2","학습상위":"11%","시간평균":"2.88","전국시간평균":"3.88","시간상위":"60%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"103.8","전국총점평균":"111.5","총점상위":"11%","학습포인트":"333.55","출결포인트":"40","전체포인트":"373.55","복권이벤트":"-","전국랭킹":"126","전국회원수":"2301","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"328.85","시간점수":"9.39","출결점수":"40","학습가산점":"3","리셋감점":"0","총점":"381.24","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/28/2/0","총학습수":"20","가감총점":"381.24","평균":"19.06","랭킹":"0","본부랭킹":"0","학습평균":"78.42","전국학습평균":"93.2","학습상위":"18%","시간평균":"2.52","전국시간평균":"3.88","시간상위":"70%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"96.87","전국총점평균":"111.5","총점상위":"22%","학습포인트":"295.97","출결포인트":"40","전체포인트":"335.97","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"349.16","시간점수":"11.7","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"404.86","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/29/0/0","총학습수":"19","가감총점":"404.86","평균":"21.31","랭킹":"0","본부랭킹":"0","학습평균":"81.7","전국학습평균":"93.2","학습상위":"16%","시간평균":"2.89","전국시간평균":"3.88","시간상위":"65%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"98.97","전국총점평균":"111.5","총점상위":"20%","학습포인트":"314.24","출결포인트":"41","전체포인트":"355.24","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}],
  "5":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"497.43","시간점수":"31.3","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"583.73","상위가점":"20.0","하위감점":"0.0","상하위진도수":"32/0/0/0","총학습수":"27","가감총점":"603.73","평균":"22.36","랭킹":"2","본부랭킹":"0","학습평균":"92.8","전국학습평균":"93.2","학습상위":"1%","시간평균":"6.3","전국시간평균":"3.88","시간상위":"3%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.37","전국총점평균":"111.5","총점상위":"1%","학습포인트":"447.69","출결포인트":"50","전체포인트":"497.69","복권이벤트":"-","전국랭킹":"19","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"517.86","시간점수":"26.91","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"599.77","상위가점":"20.0","하위감점":"0.0","상하위진도수":"24/0/0/0","총학습수":"20","가감총점":"619.77","평균":"30.99","랭킹":"6","본부랭킹":"0","학습평균":"93.03","전국학습평균":"93.2","학습상위":"1%","시간평균":"6.14","전국시간평균":"3.88","시간상위":"4%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.02","전국총점평균":"111.5","총점상위":"1%","학습포인트":"466.07","출결포인트":"50","전체포인트":"516.07","복권이벤트":"-","전국랭킹":"16","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"493.0","시간점수":"26.42","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"572.42","상위가점":"20.0","하위감점":"0.0","상하위진도수":"27/0/0/0","총학습수":"22","가감총점":"592.42","평균":"26.93","랭킹":"2","본부랭킹":"0","학습평균":"91.73","전국학습평균":"93.2","학습상위":"2%","시간평균":"5.19","전국시간평균":"3.88","시간상위":"5%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"119.42","전국총점평균":"111.5","총점상위":"1%","학습포인트":"443.7","출결포인트":"50","전체포인트":"493.7","복권이벤트":"-","전국랭킹":"80","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"481.75","시간점수":"23.52","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"560.27","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/26/0/0","총학습수":"22","가감총점":"570.27","평균":"25.92","랭킹":"6","본부랭킹":"0","학습평균":"95.69","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.81","전국시간평균":"3.88","시간상위":"16%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.7","전국총점평균":"111.5","총점상위":"3%","학습포인트":"433.57","출결포인트":"50","전체포인트":"483.57","복권이벤트":"-","전국랭킹":"35","전국회원수":"2301","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"477.63","시간점수":"21.81","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"554.44","상위가산점":"10","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"20","가감총점":"554.44","평균":"27.72","랭킹":"5","본부랭킹":"0","학습평균":"99.35","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.62","전국시간평균":"3.88","시간상위":"18%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.25","전국총점평균":"111.5","총점상위":"3%","학습포인트":"429.87","출결포인트":"50","전체포인트":"479.87","복권이벤트":"-","전국랭킹":"9","전국회원수":"2301","최종랭킹":"","상위가점":"0.0"},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"464.62","시간점수":"21.96","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"539.58","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/20/4/0","총학습수":"20","가감총점":"549.58","평균":"27.48","랭킹":"7","본부랭킹":"0","학습평균":"96.34","전국학습평균":"93.2","학습상위":"5%","시간평균":"4.44","전국시간평균":"3.88","시간상위":"22%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"113.3","전국총점평균":"111.5","총점상위":"5%","학습포인트":"418.16","출결포인트":"50","전체포인트":"468.16","복권이벤트":"-","전국랭킹":"76","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"453.58","시간점수":"18.46","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"527.04","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"20","가감총점":"537.04","평균":"26.85","랭킹":"5","본부랭킹":"0","학습평균":"88.02","전국학습평균":"93.2","학습상위":"6%","시간평균":"3.93","전국시간평균":"3.88","시간상위":"30%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"111.97","전국총점평균":"111.5","총점상위":"6%","학습포인트":"408.22","출결포인트":"50","전체포인트":"458.22","복권이벤트":"-","전국랭킹":"91","전국회원수":"2301","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"479.55","시간점수":"16.26","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"550.81","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/25/0/0","총학습수":"21","가감총점":"560.81","평균":"26.71","랭킹":"11","본부랭킹":"0","학습평균":"90.26","전국학습평균":"93.2","학습상위":"7%","시간평균":"3.35","전국시간평균":"3.88","시간상위":"40%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"110.25","전국총점평균":"111.5","총점상위":"7%","학습포인트":"431.6","출결포인트":"50","전체포인트":"481.6","복권이벤트":"-","전국랭킹":"37","전국회원수":"2301","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"449.42","시간점수":"16.47","출결점수":"49","학습가산점":"2","리셋감점":"0","총점":"516.89","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/12/8/0","총학습수":"17","가감총점":"516.89","평균":"30.41","랭킹":"7","본부랭킹":"0","학습평균":"89.76","전국학습평균":"93.2","학습상위":"9%","시간평균":"3.02","전국시간평균":"3.88","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"105.87","전국총점평균":"111.5","총점상위":"9%","학습포인트":"404.48","출결포인트":"49","전체포인트":"453.48","복권이벤트":"-","전국랭킹":"85","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 광명 Hive","센터":"[LC]광명하안","센터타입":"LC","교사명":"최민호","회원번호":"000S-2001001002","회원명":"박하진","생년월일":"2018-01-12","리그명":"-","조명":"-","학습점수":"468.51","시간점수":"14.98","출결점수":"49","학습가산점":"2","리셋감점":"0","총점":"534.49","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/11/9/0","총학습수":"17","가감총점":"534.49","평균":"31.44","랭킹":"10","본부랭킹":"0","학습평균":"88.99","전국학습평균":"93.2","학습상위":"11%","시간평균":"2.97","전국시간평균":"3.88","시간상위":"60%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"103.8","전국총점평균":"111.5","총점상위":"11%","학습포인트":"421.66","출결포인트":"49","전체포인트":"470.66","복권이벤트":"-","전국랭킹":"191","전국회원수":"2301","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"412.47","시간점수":"11.97","출결점수":"49","학습가산점":"3","리셋감점":"0","총점":"476.44","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/28/2/0","총학습수":"25","가감총점":"476.44","평균":"19.06","랭킹":"0","본부랭킹":"0","학습평균":"78.48","전국학습평균":"93.2","학습상위":"18%","시간평균":"2.53","전국시간평균":"3.88","시간상위":"70%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"96.87","전국총점평균":"111.5","총점상위":"22%","학습포인트":"371.22","출결포인트":"49","전체포인트":"420.22","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"414.76","시간점수":"13.23","출결점수":"50","학습가산점":"4","리셋감점":"0","총점":"481.99","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/29/0/0","총학습수":"24","가감총점":"481.99","평균":"20.08","랭킹":"0","본부랭킹":"0","학습평균":"79.02","전국학습평균":"93.2","학습상위":"16%","시간평균":"2.92","전국시간평균":"3.88","시간상위":"65%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"98.97","전국총점평균":"111.5","총점상위":"20%","학습포인트":"373.28","출결포인트":"50","전체포인트":"423.28","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}],
  "6":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"600","시간점수":"36.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"702.2","상위가점":"20","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"32","가감총점":"722.2","평균":"120.37","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"93.2","학습상위":"1%","시간평균":"6.03","전국시간평균":"3.88","시간상위":"3%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.37","전국총점평균":"111.5","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"1","전국회원수":"2301","최종랭킹":"Grand Master"},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"599","시간점수":"35.1","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"700.1","상위가점":"20","하위감점":"0","상하위진도수":"24/0/0/0","총학습수":"24","가감총점":"720.1","평균":"120.02","랭킹":"2","본부랭킹":"1","학습평균":"99.83","전국학습평균":"93.2","학습상위":"1%","시간평균":"5.85","전국시간평균":"3.88","시간상위":"4%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.02","전국총점평균":"111.5","총점상위":"1%","학습포인트":"599","출결포인트":"60","전체포인트":"659","복권이벤트":"-","전국랭킹":"2","전국회원수":"2301","최종랭킹":"Grand Master"},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"598","시간점수":"34.5","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"696.5","상위가점":"20","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"27","가감총점":"716.5","평균":"119.42","랭킹":"3","본부랭킹":"2","학습평균":"99.67","전국학습평균":"93.2","학습상위":"2%","시간평균":"5.75","전국시간평균":"3.88","시간상위":"5%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"119.42","전국총점평균":"111.5","총점상위":"1%","학습포인트":"598","출결포인트":"60","전체포인트":"658","복권이벤트":"-","전국랭킹":"4","전국회원수":"2301","최종랭킹":"Grand Master"},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"590","시간점수":"28.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"684.2","상위가점":"10","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"26","가감총점":"694.2","평균":"115.7","랭킹":"4","본부랭킹":"1","학습평균":"98.33","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.7","전국시간평균":"3.88","시간상위":"16%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.7","전국총점평균":"111.5","총점상위":"3%","학습포인트":"590","출결포인트":"60","전체포인트":"650","복권이벤트":"-","전국랭킹":"11","전국회원수":"2301","최종랭킹":"Master"},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"588","시간점수":"27.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"681.5","상위가산점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"691.5","평균":"115.25","랭킹":"5","본부랭킹":"2","학습평균":"98.0","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.58","전국시간평균":"3.88","시간상위":"18%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.25","전국총점평균":"111.5","총점상위":"3%","학습포인트":"588","출결포인트":"60","전체포인트":"648","복권이벤트":"-","전국랭킹":"15","전국회원수":"2301","최종랭킹":"Master"},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"580","시간점수":"25.8","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"669.8","상위가점":"10","하위감점":"0","상하위진도수":"0/20/4/0","총학습수":"24","가감총점":"679.8","평균":"113.3","랭킹":"6","본부랭킹":"1","학습평균":"96.67","전국학습평균":"93.2","학습상위":"5%","시간평균":"4.3","전국시간평균":"3.88","시간상위":"22%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"113.3","전국총점평균":"111.5","총점상위":"5%","학습포인트":"580","출결포인트":"60","전체포인트":"640","복권이벤트":"-","전국랭킹":"28","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"572","시간점수":"23.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"661.8","상위가점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"671.8","평균":"111.97","랭킹":"7","본부랭킹":"3","학습평균":"95.33","전국학습평균":"93.2","학습상위":"6%","시간평균":"3.97","전국시간평균":"3.88","시간상위":"30%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"111.97","전국총점평균":"111.5","총점상위":"6%","학습포인트":"572","출결포인트":"60","전체포인트":"632","복권이벤트":"-","전국랭킹":"45","전국회원수":"2301","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"564","시간점수":"21.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"651.5","상위가점":"10","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"25","가감총점":"661.5","평균":"110.25","랭킹":"8","본부랭킹":"1","학습평균":"94.0","전국학습평균":"93.2","학습상위":"7%","시간평균":"3.58","전국시간평균":"3.88","시간상위":"40%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"110.25","전국총점평균":"111.5","총점상위":"7%","학습포인트":"564","출결포인트":"60","전체포인트":"624","복권이벤트":"-","전국랭킹":"62","전국회원수":"2301","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"555","시간점수":"19.2","출결점수":"58","학습가산점":"3","리셋감점":"0","총점":"635.2","상위가점":"0","하위감점":"0","상하위진도수":"0/12/8/0","총학습수":"20","가감총점":"635.2","평균":"105.87","랭킹":"9","본부랭킹":"1","학습평균":"92.5","전국학습평균":"93.2","학습상위":"9%","시간평균":"3.2","전국시간평균":"3.88","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"105.87","전국총점평균":"111.5","총점상위":"9%","학습포인트":"455","출결포인트":"50","전체포인트":"505","복권이벤트":"-","전국랭킹":"98","전국회원수":"2301","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 광명 Hive","센터":"[LC]광명하안","센터타입":"LC","교사명":"최민호","회원번호":"000S-2001001002","회원명":"박하진","생년월일":"2018-01-12","리그명":"-","조명":"-","학습점수":"545","시간점수":"17.8","출결점수":"58","학습가산점":"2","리셋감점":"0","총점":"622.8","상위가점":"0","하위감점":"0","상하위진도수":"0/11/9/0","총학습수":"20","가감총점":"622.8","평균":"103.8","랭킹":"10","본부랭킹":"2","학습평균":"90.83","전국학습평균":"93.2","학습상위":"11%","시간평균":"2.97","전국시간평균":"3.88","시간상위":"60%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"103.8","전국총점평균":"111.5","총점상위":"11%","학습포인트":"445","출결포인트":"50","전체포인트":"495","복권이벤트":"-","전국랭킹":"148","전국회원수":"2301","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"504","시간점수":"15.2","출결점수":"58","학습가산점":"4","리셋감점":"0","총점":"581.2","상위가점":"0","하위감점":"0","상하위진도수":"0/28/2/0","총학습수":"30","가감총점":"581.2","평균":"96.87","랭킹":"0","본부랭킹":"0","학습평균":"84.0","전국학습평균":"93.2","학습상위":"18%","시간평균":"2.53","전국시간평균":"3.88","시간상위":"70%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"96.87","전국총점평균":"111.5","총점상위":"22%","학습포인트":"504","출결포인트":"50","전체포인트":"554","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},{"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"512","시간점수":"16.8","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"593.8","상위가점":"0","하위감점":"0","상하위진도수":"0/29/0/0","총학습수":"29","가감총점":"593.8","평균":"98.97","랭킹":"0","본부랭킹":"0","학습평균":"85.33","전국학습평균":"93.2","학습상위":"16%","시간평균":"2.8","전국시간평균":"3.88","시간상위":"65%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"98.97","전국총점평균":"111.5","총점상위":"20%","학습포인트":"512","출결포인트":"60","전체포인트":"572","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}]},
  data: [
      {"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"600","시간점수":"36.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"702.2","상위가점":"20","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"32","가감총점":"722.2","평균":"120.37","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"93.2","학습상위":"1%","시간평균":"6.03","전국시간평균":"3.88","시간상위":"3%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.37","전국총점평균":"111.5","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"1","전국회원수":"2301","최종랭킹":"Grand Master"},
      {"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"599","시간점수":"35.1","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"700.1","상위가점":"20","하위감점":"0","상하위진도수":"24/0/0/0","총학습수":"24","가감총점":"720.1","평균":"120.02","랭킹":"2","본부랭킹":"1","학습평균":"99.83","전국학습평균":"93.2","학습상위":"1%","시간평균":"5.85","전국시간평균":"3.88","시간상위":"4%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"120.02","전국총점평균":"111.5","총점상위":"1%","학습포인트":"599","출결포인트":"60","전체포인트":"659","복권이벤트":"-","전국랭킹":"2","전국회원수":"2301","최종랭킹":"Grand Master"},
      {"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"598","시간점수":"34.5","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"696.5","상위가점":"20","하위감점":"0","상하위진도수":"27/0/0/0","총학습수":"27","가감총점":"716.5","평균":"119.42","랭킹":"3","본부랭킹":"2","학습평균":"99.67","전국학습평균":"93.2","학습상위":"2%","시간평균":"5.75","전국시간평균":"3.88","시간상위":"5%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"119.42","전국총점평균":"111.5","총점상위":"1%","학습포인트":"598","출결포인트":"60","전체포인트":"658","복권이벤트":"-","전국랭킹":"4","전국회원수":"2301","최종랭킹":"Grand Master"},
      {"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"590","시간점수":"28.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"684.2","상위가점":"10","하위감점":"0","상하위진도수":"0/26/0/0","총학습수":"26","가감총점":"694.2","평균":"115.7","랭킹":"4","본부랭킹":"1","학습평균":"98.33","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.7","전국시간평균":"3.88","시간상위":"16%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.7","전국총점평균":"111.5","총점상위":"3%","학습포인트":"590","출결포인트":"60","전체포인트":"650","복권이벤트":"-","전국랭킹":"11","전국회원수":"2301","최종랭킹":"Master"},
      {"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"588","시간점수":"27.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"681.5","상위가산점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"691.5","평균":"115.25","랭킹":"5","본부랭킹":"2","학습평균":"98.0","전국학습평균":"93.2","학습상위":"3%","시간평균":"4.58","전국시간평균":"3.88","시간상위":"18%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"115.25","전국총점평균":"111.5","총점상위":"3%","학습포인트":"588","출결포인트":"60","전체포인트":"648","복권이벤트":"-","전국랭킹":"15","전국회원수":"2301","최종랭킹":"Master"},
      {"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"580","시간점수":"25.8","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"669.8","상위가점":"10","하위감점":"0","상하위진도수":"0/20/4/0","총학습수":"24","가감총점":"679.8","평균":"113.3","랭킹":"6","본부랭킹":"1","학습평균":"96.67","전국학습평균":"93.2","학습상위":"5%","시간평균":"4.3","전국시간평균":"3.88","시간상위":"22%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"113.3","전국총점평균":"111.5","총점상위":"5%","학습포인트":"580","출결포인트":"60","전체포인트":"640","복권이벤트":"-","전국랭킹":"28","전국회원수":"2301","최종랭킹":""},
      {"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"572","시간점수":"23.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"661.8","상위가점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"671.8","평균":"111.97","랭킹":"7","본부랭킹":"3","학습평균":"95.33","전국학습평균":"93.2","학습상위":"6%","시간평균":"3.97","전국시간평균":"3.88","시간상위":"30%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"111.97","전국총점평균":"111.5","총점상위":"6%","학습포인트":"572","출결포인트":"60","전체포인트":"632","복권이벤트":"-","전국랭킹":"45","전국회원수":"2301","최종랭킹":""},
      {"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"564","시간점수":"21.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"651.5","상위가점":"10","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"25","가감총점":"661.5","평균":"110.25","랭킹":"8","본부랭킹":"1","학습평균":"94.0","전국학습평균":"93.2","학습상위":"7%","시간평균":"3.58","전국시간평균":"3.88","시간상위":"40%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"110.25","전국총점평균":"111.5","총점상위":"7%","학습포인트":"564","출결포인트":"60","전체포인트":"624","복권이벤트":"-","전국랭킹":"62","전국회원수":"2301","최종랭킹":""},
      {"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"555","시간점수":"19.2","출결점수":"58","학습가산점":"3","리셋감점":"0","총점":"635.2","상위가점":"0","하위감점":"0","상하위진도수":"0/12/8/0","총학습수":"20","가감총점":"635.2","평균":"105.87","랭킹":"9","본부랭킹":"1","학습평균":"92.5","전국학습평균":"93.2","학습상위":"9%","시간평균":"3.2","전국시간평균":"3.88","시간상위":"52%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"105.87","전국총점평균":"111.5","총점상위":"9%","학습포인트":"455","출결포인트":"50","전체포인트":"505","복권이벤트":"-","전국랭킹":"98","전국회원수":"2301","최종랭킹":""},
      {"본부":"대교 경기본부","지점":"대교 광명 Hive","센터":"[LC]광명하안","센터타입":"LC","교사명":"최민호","회원번호":"000S-2001001002","회원명":"박하진","생년월일":"2018-01-12","리그명":"-","조명":"-","학습점수":"545","시간점수":"17.8","출결점수":"58","학습가산점":"2","리셋감점":"0","총점":"622.8","상위가점":"0","하위감점":"0","상하위진도수":"0/11/9/0","총학습수":"20","가감총점":"622.8","평균":"103.8","랭킹":"10","본부랭킹":"2","학습평균":"90.83","전국학습평균":"93.2","학습상위":"11%","시간평균":"2.97","전국시간평균":"3.88","시간상위":"60%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"103.8","전국총점평균":"111.5","총점상위":"11%","학습포인트":"445","출결포인트":"50","전체포인트":"495","복권이벤트":"-","전국랭킹":"148","전국회원수":"2301","최종랭킹":""},
      {"본부":"대교 충청본부","지점":"대교 청주 Hive","센터":"[YC]청주봉명","센터타입":"YC","교사명":"오대교","회원번호":"000S-0055018293","회원명":"황준서","생년월일":"2015-09-03","리그명":"-","조명":"-","학습점수":"504","시간점수":"15.2","출결점수":"58","학습가산점":"4","리셋감점":"0","총점":"581.2","상위가점":"0","하위감점":"0","상하위진도수":"0/28/2/0","총학습수":"30","가감총점":"581.2","평균":"96.87","랭킹":"0","본부랭킹":"0","학습평균":"84.0","전국학습평균":"93.2","학습상위":"18%","시간평균":"2.53","전국시간평균":"3.88","시간상위":"70%","출결평균":"9.67","전국출결평균":"9.0","출결상위":"28%","총점평균":"96.87","전국총점평균":"111.5","총점상위":"22%","학습포인트":"504","출결포인트":"50","전체포인트":"554","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""},
      {"본부":"대교 서울강원본부","지점":"강원 교육국","센터":"[LC]춘천","센터타입":"LC","교사명":"김대교","회원번호":"000S-0055847302","회원명":"임도현","생년월일":"2016-10-14","리그명":"-","조명":"-","학습점수":"512","시간점수":"16.8","출결점수":"60","학습가산점":"5","리셋감점":"0","총점":"593.8","상위가점":"0","하위감점":"0","상하위진도수":"0/29/0/0","총학습수":"29","가감총점":"593.8","평균":"98.97","랭킹":"0","본부랭킹":"0","학습평균":"85.33","전국학습평균":"93.2","학습상위":"16%","시간평균":"2.8","전국시간평균":"3.88","시간상위":"65%","출결평균":"10","전국출결평균":"9.0","출결상위":"1%","총점평균":"98.97","전국총점평균":"111.5","총점상위":"20%","학습포인트":"512","출결포인트":"60","전체포인트":"572","복권이벤트":"-","전국랭킹":"0","전국회원수":"7","최종랭킹":""}
    ]
  };

  // ── 2024 윈터 / 2023 서머 / 2023 윈터 (각 10건 요약)
  LEAGUE_DATA['2024_winter'] = {
    label: '2024 윈터 리그오브매스',
    finalized: true,
    totalWeeks:6,
  weeks:{  "1":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"103.8","시간점수":"6.19","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"122.99","상위가점":"0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"5","가감총점":"122.99","평균":"24.6","랭킹":"4","본부랭킹":"0","학습평균":"96.27","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.82","전국시간평균":"3.82","시간상위":"3%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"120.3","전국총점평균":"110.9","총점상위":"1%","학습포인트":"93.42","출결포인트":"12","전체포인트":"105.42","복권이벤트":"-","전국랭킹":"57","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"104.2","시간점수":"5.94","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"123.14","상위가점":"0","하위감점":"0","상하위진도수":"23/0/0/0","총학습수":"4","가감총점":"123.14","평균":"30.79","랭킹":"5","본부랭킹":"0","학습평균":"99.36","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.4","전국시간평균":"3.82","시간상위":"5%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"119.53","전국총점평균":"110.9","총점상위":"1%","학습포인트":"93.78","출결포인트":"12","전체포인트":"105.78","복권이벤트":"-","전국랭킹":"21","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"98.34","시간점수":"5.15","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"116.49","상위가점":"0","하위감점":"0","상하위진도수":"26/0/0/0","총학습수":"4","가감총점":"116.49","평균":"29.12","랭킹":"4","본부랭킹":"0","학습평균":"98.72","전국학습평균":"92.8","학습상위":"2%","시간평균":"5.42","전국시간평균":"3.82","시간상위":"6%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"118.75","전국총점평균":"110.9","총점상위":"2%","학습포인트":"88.51","출결포인트":"12","전체포인트":"100.51","복권이벤트":"-","전국랭킹":"1","전국회원수":"2198","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"100.91","시간점수":"4.22","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"118.13","상위가점":"0","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"4","가감총점":"118.13","평균":"29.53","랭킹":"7","본부랭킹":"0","학습평균":"97.56","전국학습평균":"92.8","학습상위":"4%","시간평균":"4.64","전국시간평균":"3.82","시간상위":"20%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"114.63","전국총점평균":"110.9","총점상위":"4%","학습포인트":"90.82","출결포인트":"12","전체포인트":"102.82","복권이벤트":"-","전국랭킹":"6","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"97.27","시간점수":"4.39","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"114.66","상위가점":"0","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"4","가감총점":"114.66","평균":"28.66","랭킹":"7","본부랭킹":"0","학습평균":"90.23","전국학습평균":"92.8","학습상위":"5%","시간평균":"3.93","전국시간평균":"3.82","시간상위":"24%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"113.53","전국총점평균":"110.9","총점상위":"5%","학습포인트":"87.54","출결포인트":"12","전체포인트":"99.54","복권이벤트":"-","전국랭킹":"59","전국회원수":"2198","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"92.51","시간점수":"3.79","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"109.3","상위가점":"0","하위감점":"0","상하위진도수":"0/19/4/0","총학습수":"4","가감총점":"109.3","평균":"27.32","랭킹":"7","본부랭킹":"0","학습평균":"91.24","전국학습평균":"92.8","학습상위":"6%","시간평균":"3.73","전국시간평균":"3.82","시간상위":"42%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"111.47","전국총점평균":"110.9","총점상위":"6%","학습포인트":"83.26","출결포인트":"12","전체포인트":"95.26","복권이벤트":"-","전국랭킹":"116","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"96.75","시간점수":"3.1","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"112.85","상위가점":"0","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"4","가감총점":"112.85","평균":"28.21","랭킹":"8","본부랭킹":"0","학습평균":"91.84","전국학습평균":"92.8","학습상위":"8%","시간평균":"3.1","전국시간평균":"3.82","시간상위":"48%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"109.75","전국총점평균":"110.9","총점상위":"7%","학습포인트":"87.08","출결포인트":"12","전체포인트":"99.08","복권이벤트":"-","전국랭킹":"111","전국회원수":"2198","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"88.55","시간점수":"3.2","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"104.75","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"4","가감총점":"104.75","평균":"26.19","랭킹":"10","본부랭킹":"0","학습평균":"91.31","전국학습평균":"92.8","학습상위":"9%","시간평균":"2.92","전국시간평균":"3.82","시간상위":"55%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"106.63","전국총점평균":"110.9","총점상위":"9%","학습포인트":"79.69","출결포인트":"12","전체포인트":"91.69","복권이벤트":"-","전국랭킹":"140","전국회원수":"2198","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"87.7","시간점수":"2.9","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"102.6","상위가점":"0","하위감점":"0","상하위진도수":"0/11/9/0","총학습수":"3","가감총점":"102.6","평균":"34.2","랭킹":"9","본부랭킹":"0","학습평균":"85.02","전국학습평균":"92.8","학습상위":"11%","시간평균":"2.6","전국시간평균":"3.82","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.95","출결상위":"28%","총점평균":"103.3","전국총점평균":"110.9","총점상위":"11%","학습포인트":"78.93","출결포인트":"12","전체포인트":"90.93","복권이벤트":"-","전국랭킹":"99","전국회원수":"2198","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"83.3","시간점수":"2.11","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"97.41","상위가점":"0","하위감점":"0","상하위진도수":"0/8/10/4","총학습수":"4","가감총점":"97.41","평균":"24.35","랭킹":"14","본부랭킹":"0","학습평균":"82.26","전국학습평균":"92.8","학습상위":"22%","시간평균":"2.09","전국시간평균":"3.82","시간상위":"78%","출결평균":"9.33","전국출결평균":"8.95","출결상위":"38%","총점평균":"89.75","전국총점평균":"110.9","총점상위":"22%","학습포인트":"74.97","출결포인트":"12","전체포인트":"86.97","복권이벤트":"-","전국랭킹":"483","전국회원수":"2198","최종랭킹":""}],
  "2":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"204.08","시간점수":"11.45","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"239.53","상위가점":"0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"11","가감총점":"239.53","평균":"21.78","랭킹":"1","본부랭킹":"0","학습평균":"95.22","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.63","전국시간평균":"3.82","시간상위":"3%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"120.3","전국총점평균":"110.9","총점상위":"1%","학습포인트":"183.67","출결포인트":"22","전체포인트":"205.67","복권이벤트":"-","전국랭킹":"41","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"198.33","시간점수":"11.37","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"233.7","상위가점":"0","하위감점":"0","상하위진도수":"23/0/0/0","총학습수":"8","가감총점":"233.7","평균":"29.21","랭킹":"2","본부랭킹":"0","학습평균":"95.12","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.88","전국시간평균":"3.82","시간상위":"5%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"119.53","전국총점평균":"110.9","총점상위":"1%","학습포인트":"178.5","출결포인트":"22","전체포인트":"200.5","복권이벤트":"-","전국랭킹":"6","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"197.66","시간점수":"11.39","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"232.05","상위가점":"0","하위감점":"0","상하위진도수":"26/0/0/0","총학습수":"9","가감총점":"232.05","평균":"25.78","랭킹":"6","본부랭킹":"0","학습평균":"98.79","전국학습평균":"92.8","학습상위":"2%","시간평균":"5.29","전국시간평균":"3.82","시간상위":"6%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"118.75","전국총점평균":"110.9","총점상위":"2%","학습포인트":"177.89","출결포인트":"22","전체포인트":"199.89","복권이벤트":"-","전국랭킹":"35","전국회원수":"2198","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"189.21","시간점수":"8.46","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"221.67","상위가점":"0","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"8","가감총점":"221.67","평균":"27.71","랭킹":"2","본부랭킹":"0","학습평균":"98.12","전국학습평균":"92.8","학습상위":"4%","시간평균":"4.52","전국시간평균":"3.82","시간상위":"20%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"114.63","전국총점평균":"110.9","총점상위":"4%","학습포인트":"170.29","출결포인트":"22","전체포인트":"192.29","복권이벤트":"-","전국랭킹":"60","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"183.98","시간점수":"8.26","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"216.24","상위가점":"0","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"8","가감총점":"216.24","평균":"27.03","랭킹":"7","본부랭킹":"0","학습평균":"95.9","전국학습평균":"92.8","학습상위":"5%","시간평균":"3.97","전국시간평균":"3.82","시간상위":"24%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"113.53","전국총점평균":"110.9","총점상위":"5%","학습포인트":"165.58","출결포인트":"22","전체포인트":"187.58","복권이벤트":"-","전국랭킹":"66","전국회원수":"2198","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"184.87","시간점수":"7.1","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"214.97","상위가점":"0","하위감점":"0","상하위진도수":"0/19/4/0","총학습수":"8","가감총점":"214.97","평균":"26.87","랭킹":"8","본부랭킹":"0","학습평균":"90.05","전국학습평균":"92.8","학습상위":"6%","시간평균":"3.73","전국시간평균":"3.82","시간상위":"42%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"111.47","전국총점평균":"110.9","총점상위":"6%","학습포인트":"166.38","출결포인트":"22","전체포인트":"188.38","복권이벤트":"-","전국랭킹":"114","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"195.64","시간점수":"6.5","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"226.14","상위가점":"0","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"8","가감총점":"226.14","평균":"28.27","랭킹":"11","본부랭킹":"0","학습평균":"90.75","전국학습평균":"92.8","학습상위":"8%","시간평균":"3.45","전국시간평균":"3.82","시간상위":"48%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"109.75","전국총점평균":"110.9","총점상위":"7%","학습포인트":"176.08","출결포인트":"22","전체포인트":"198.08","복권이벤트":"-","전국랭킹":"130","전국회원수":"2198","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"189.43","시간점수":"6.07","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"219.5","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"8","가감총점":"219.5","평균":"27.44","랭킹":"11","본부랭킹":"0","학습평균":"88.36","전국학습평균":"92.8","학습상위":"9%","시간평균":"2.88","전국시간평균":"3.82","시간상위":"55%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"106.63","전국총점평균":"110.9","총점상위":"9%","학습포인트":"170.49","출결포인트":"22","전체포인트":"192.49","복권이벤트":"-","전국랭킹":"149","전국회원수":"2198","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"181.51","시간점수":"5.19","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"208.7","상위가점":"0","하위감점":"0","상하위진도수":"0/11/9/0","총학습수":"7","가감총점":"208.7","평균":"29.81","랭킹":"11","본부랭킹":"0","학습평균":"91.75","전국학습평균":"92.8","학습상위":"11%","시간평균":"2.74","전국시간평균":"3.82","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.95","출결상위":"28%","총점평균":"103.3","전국총점평균":"110.9","총점상위":"11%","학습포인트":"163.36","출결포인트":"21","전체포인트":"184.36","복권이벤트":"-","전국랭킹":"180","전국회원수":"2198","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"168.18","시간점수":"3.8","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"193.98","상위가점":"0","하위감점":"0","상하위진도수":"0/8/10/4","총학습수":"7","가감총점":"193.98","평균":"27.71","랭킹":"14","본부랭킹":"0","학습평균":"75.22","전국학습평균":"92.8","학습상위":"22%","시간평균":"1.87","전국시간평균":"3.82","시간상위":"78%","출결평균":"9.33","전국출결평균":"8.95","출결상위":"38%","총점평균":"89.75","전국총점평균":"110.9","총점상위":"22%","학습포인트":"151.36","출결포인트":"21","전체포인트":"172.36","복권이벤트":"-","전국랭킹":"507","전국회원수":"2198","최종랭킹":""}],
  "3":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"289.12","시간점수":"17.8","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"341.92","상위가점":"20.0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"16","가감총점":"361.92","평균":"22.62","랭킹":"1","본부랭킹":"0","학습평균":"93.51","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.57","전국시간평균":"3.82","시간상위":"3%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"120.3","전국총점평균":"110.9","총점상위":"1%","학습포인트":"260.21","출결포인트":"32","전체포인트":"292.21","복권이벤트":"-","전국랭킹":"61","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"297.19","시간점수":"15.55","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"347.74","상위가점":"20.0","하위감점":"0","상하위진도수":"23/0/0/0","총학습수":"12","가감총점":"367.74","평균":"30.64","랭킹":"5","본부랭킹":"0","학습평균":"100.83","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.91","전국시간평균":"3.82","시간상위":"5%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"119.53","전국총점평균":"110.9","총점상위":"1%","학습포인트":"267.47","출결포인트":"32","전체포인트":"299.47","복권이벤트":"-","전국랭킹":"58","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"302.24","시간점수":"15.11","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"351.35","상위가점":"20.0","하위감점":"0","상하위진도수":"26/0/0/0","총학습수":"13","가감총점":"371.35","평균":"28.57","랭킹":"5","본부랭킹":"0","학습평균":"95.32","전국학습평균":"92.8","학습상위":"2%","시간평균":"5.04","전국시간평균":"3.82","시간상위":"6%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"118.75","전국총점평균":"110.9","총점상위":"2%","학습포인트":"272.02","출결포인트":"32","전체포인트":"304.02","복권이벤트":"-","전국랭킹":"45","전국회원수":"2198","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"299.0","시간점수":"13.14","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"347.14","상위가점":"10.0","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"12","가감총점":"357.14","평균":"29.76","랭킹":"4","본부랭킹":"0","학습평균":"94.6","전국학습평균":"92.8","학습상위":"4%","시간평균":"4.49","전국시간평균":"3.82","시간상위":"20%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"114.63","전국총점평균":"110.9","총점상위":"4%","학습포인트":"269.1","출결포인트":"32","전체포인트":"301.1","복권이벤트":"-","전국랭킹":"1","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"287.99","시간점수":"13.12","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"336.11","상위가점":"10.0","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"12","가감총점":"346.11","평균":"28.84","랭킹":"4","본부랭킹":"0","학습평균":"97.81","전국학습평균":"92.8","학습상위":"5%","시간평균":"4.11","전국시간평균":"3.82","시간상위":"24%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"113.53","전국총점평균":"110.9","총점상위":"5%","학습포인트":"259.19","출결포인트":"32","전체포인트":"291.19","복권이벤트":"-","전국랭킹":"5","전국회원수":"2198","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"278.59","시간점수":"11.32","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"323.91","상위가점":"10.0","하위감점":"0","상하위진도수":"0/19/4/0","총학습수":"12","가감총점":"333.91","평균":"27.83","랭킹":"6","본부랭킹":"0","학습평균":"91.08","전국학습평균":"92.8","학습상위":"6%","시간평균":"3.87","전국시간평균":"3.82","시간상위":"42%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"111.47","전국총점평균":"110.9","총점상위":"6%","학습포인트":"250.73","출결포인트":"32","전체포인트":"282.73","복권이벤트":"-","전국랭킹":"112","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"269.17","시간점수":"10.7","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"314.87","상위가점":"10.0","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"12","가감총점":"324.87","평균":"27.07","랭킹":"8","본부랭킹":"0","학습평균":"88.45","전국학습평균":"92.8","학습상위":"8%","시간평균":"3.44","전국시간평균":"3.82","시간상위":"48%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"109.75","전국총점평균":"110.9","총점상위":"7%","학습포인트":"242.25","출결포인트":"32","전체포인트":"274.25","복권이벤트":"-","전국랭킹":"97","전국회원수":"2198","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"271.95","시간점수":"9.63","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"316.58","상위가점":"0.0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"12","가감총점":"316.58","평균":"26.38","랭킹":"6","본부랭킹":"0","학습평균":"94.27","전국학습평균":"92.8","학습상위":"9%","시간평균":"3.12","전국시간평균":"3.82","시간상위":"55%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"106.63","전국총점평균":"110.9","총점상위":"9%","학습포인트":"244.75","출결포인트":"32","전체포인트":"276.75","복권이벤트":"-","전국랭킹":"131","전국회원수":"2198","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"258.31","시간점수":"8.07","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"298.38","상위가점":"0.0","하위감점":"0","상하위진도수":"0/11/9/0","총학습수":"10","가감총점":"298.38","평균":"29.84","랭킹":"10","본부랭킹":"0","학습평균":"87.4","전국학습평균":"92.8","학습상위":"11%","시간평균":"2.79","전국시간평균":"3.82","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.95","출결상위":"28%","총점평균":"103.3","전국총점평균":"110.9","총점상위":"11%","학습포인트":"232.48","출결포인트":"30","전체포인트":"262.48","복권이벤트":"-","전국랭킹":"168","전국회원수":"2198","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"248.95","시간점수":"5.7","출결점수":"29","학습가산점":"1","리셋감점":"0","총점":"284.65","상위가점":"0.0","하위감점":"0","상하위진도수":"0/8/10/4","총학습수":"11","가감총점":"284.65","평균":"25.88","랭킹":"14","본부랭킹":"0","학습평균":"80.07","전국학습평균":"92.8","학습상위":"22%","시간평균":"1.98","전국시간평균":"3.82","시간상위":"78%","출결평균":"9.33","전국출결평균":"8.95","출결상위":"38%","총점평균":"89.75","전국총점평균":"110.9","총점상위":"22%","학습포인트":"224.06","출결포인트":"29","전체포인트":"253.06","복권이벤트":"-","전국랭킹":"477","전국회원수":"2198","최종랭킹":""}],
  "4":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"419.09","시간점수":"24.97","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"489.06","상위가점":"20.0","하위감점":"0.0","상하위진도수":"32/0/0/0","총학습수":"21","가감총점":"509.06","평균":"24.24","랭킹":"3","본부랭킹":"0","학습평균":"94.3","전국학습평균":"92.8","학습상위":"1%","시간평균":"6.18","전국시간평균":"3.82","시간상위":"3%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"120.3","전국총점평균":"110.9","총점상위":"1%","학습포인트":"377.18","출결포인트":"41","전체포인트":"418.18","복권이벤트":"-","전국랭킹":"1","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"405.65","시간점수":"22.46","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"473.11","상위가점":"20.0","하위감점":"0.0","상하위진도수":"23/0/0/0","총학습수":"15","가감총점":"493.11","평균":"32.87","랭킹":"2","본부랭킹":"0","학습평균":"100.74","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.72","전국시간평균":"3.82","시간상위":"5%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"119.53","전국총점평균":"110.9","총점상위":"1%","학습포인트":"365.08","출결포인트":"41","전체포인트":"406.08","복권이벤트":"-","전국랭킹":"1","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"387.95","시간점수":"21.92","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"453.87","상위가점":"20.0","하위감점":"0.0","상하위진도수":"26/0/0/0","총학습수":"17","가감총점":"473.87","평균":"27.87","랭킹":"6","본부랭킹":"0","학습평균":"93.02","전국학습평균":"92.8","학습상위":"2%","시간평균":"5.73","전국시간평균":"3.82","시간상위":"6%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"118.75","전국총점평균":"110.9","총점상위":"2%","학습포인트":"349.15","출결포인트":"41","전체포인트":"390.15","복권이벤트":"-","전국랭킹":"1","전국회원수":"2198","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"371.11","시간점수":"16.64","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"432.75","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/23/0/0","총학습수":"15","가감총점":"442.75","평균":"29.52","랭킹":"3","본부랭킹":"0","학습평균":"97.7","전국학습평균":"92.8","학습상위":"4%","시간평균":"4.57","전국시간평균":"3.82","시간상위":"20%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"114.63","전국총점평균":"110.9","총점상위":"4%","학습포인트":"334.0","출결포인트":"41","전체포인트":"375.0","복권이벤트":"-","전국랭킹":"84","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"403.25","시간점수":"15.87","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"464.12","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/25/0/0","총학습수":"17","가감총점":"474.12","평균":"27.89","랭킹":"7","본부랭킹":"0","학습평균":"94.41","전국학습평균":"92.8","학습상위":"5%","시간평균":"4.32","전국시간평균":"3.82","시간상위":"24%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"113.53","전국총점평균":"110.9","총점상위":"5%","학습포인트":"362.93","출결포인트":"41","전체포인트":"403.93","복권이벤트":"-","전국랭킹":"22","전국회원수":"2198","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"388.08","시간점수":"14.91","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"446.99","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/19/4/0","총학습수":"15","가감총점":"456.99","평균":"30.47","랭킹":"7","본부랭킹":"0","학습평균":"94.76","전국학습평균":"92.8","학습상위":"6%","시간평균":"3.87","전국시간평균":"3.82","시간상위":"42%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"111.47","전국총점평균":"110.9","총점상위":"6%","학습포인트":"349.27","출결포인트":"41","전체포인트":"390.27","복권이벤트":"-","전국랭킹":"104","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"381.76","시간점수":"12.46","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"439.22","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/23/0/0","총학습수":"15","가감총점":"449.22","평균":"29.95","랭킹":"10","본부랭킹":"0","학습평균":"86.68","전국학습평균":"92.8","학습상위":"8%","시간평균":"3.3","전국시간평균":"3.82","시간상위":"48%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"109.75","전국총점평균":"110.9","총점상위":"7%","학습포인트":"343.58","출결포인트":"41","전체포인트":"384.58","복권이벤트":"-","전국랭킹":"69","전국회원수":"2198","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"382.53","시간점수":"11.92","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"439.45","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"16","가감총점":"439.45","평균":"27.47","랭킹":"12","본부랭킹":"0","학습평균":"93.93","전국학습평균":"92.8","학습상위":"9%","시간평균":"3.0","전국시간평균":"3.82","시간상위":"55%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"106.63","전국총점평균":"110.9","총점상위":"9%","학습포인트":"344.28","출결포인트":"41","전체포인트":"385.28","복권이벤트":"-","전국랭킹":"126","전국회원수":"2198","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"371.22","시간점수":"10.13","출결점수":"40","학습가산점":"2","리셋감점":"0","총점":"423.35","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/11/9/0","총학습수":"13","가감총점":"423.35","평균":"32.57","랭킹":"9","본부랭킹":"0","학습평균":"92.07","전국학습평균":"92.8","학습상위":"11%","시간평균":"2.73","전국시간평균":"3.82","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.95","출결상위":"28%","총점평균":"103.3","전국총점평균":"110.9","총점상위":"11%","학습포인트":"334.1","출결포인트":"40","전체포인트":"374.1","복권이벤트":"-","전국랭킹":"198","전국회원수":"2198","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"320.64","시간점수":"8.68","출결점수":"38","학습가산점":"1","리셋감점":"0","총점":"368.32","상위가점":"0.0","하위감점":"-20.0","상하위진도수":"0/8/10/4","총학습수":"15","가감총점":"348.32","평균":"23.22","랭킹":"11","본부랭킹":"0","학습평균":"80.35","전국학습평균":"92.8","학습상위":"22%","시간평균":"2.08","전국시간평균":"3.82","시간상위":"78%","출결평균":"9.33","전국출결평균":"8.95","출결상위":"38%","총점평균":"89.75","전국총점평균":"110.9","총점상위":"22%","학습포인트":"288.58","출결포인트":"38","전체포인트":"326.58","복권이벤트":"-","전국랭킹":"445","전국회원수":"2198","최종랭킹":""}],
  "5":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"479.28","시간점수":"29.62","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"563.9","상위가점":"20.0","하위감점":"0.0","상하위진도수":"32/0/0/0","총학습수":"27","가감총점":"583.9","평균":"21.63","랭킹":"5","본부랭킹":"0","학습평균":"99.13","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.45","전국시간평균":"3.82","시간상위":"3%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"120.3","전국총점평균":"110.9","총점상위":"1%","학습포인트":"431.35","출결포인트":"50","전체포인트":"481.35","복권이벤트":"-","전국랭킹":"2","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"480.3","시간점수":"28.69","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"563.99","상위가점":"20.0","하위감점":"0.0","상하위진도수":"23/0/0/0","총학습수":"19","가감총점":"583.99","평균":"30.74","랭킹":"5","본부랭킹":"0","학습평균":"98.9","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.4","전국시간평균":"3.82","시간상위":"5%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"119.53","전국총점평균":"110.9","총점상위":"1%","학습포인트":"432.27","출결포인트":"50","전체포인트":"482.27","복권이벤트":"-","전국랭킹":"1","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"476.32","시간점수":"25.15","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"554.47","상위가점":"20.0","하위감점":"0.0","상하위진도수":"26/0/0/0","총학습수":"22","가감총점":"574.47","평균":"26.11","랭킹":"3","본부랭킹":"0","학습평균":"94.81","전국학습평균":"92.8","학습상위":"2%","시간평균":"5.25","전국시간평균":"3.82","시간상위":"6%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"118.75","전국총점평균":"110.9","총점상위":"2%","학습포인트":"428.69","출결포인트":"50","전체포인트":"478.69","복권이벤트":"-","전국랭킹":"31","전국회원수":"2198","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"469.58","시간점수":"20.73","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"545.31","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/23/0/0","총학습수":"19","가감총점":"555.31","평균":"29.23","랭킹":"5","본부랭킹":"0","학습평균":"95.11","전국학습평균":"92.8","학습상위":"4%","시간평균":"4.3","전국시간평균":"3.82","시간상위":"20%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"114.63","전국총점평균":"110.9","총점상위":"4%","학습포인트":"422.62","출결포인트":"50","전체포인트":"472.62","복권이벤트":"-","전국랭킹":"59","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"460.44","시간점수":"20.01","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"535.45","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/25/0/0","총학습수":"21","가감총점":"545.45","평균":"25.97","랭킹":"3","본부랭킹":"0","학습평균":"94.72","전국학습평균":"92.8","학습상위":"5%","시간평균":"3.98","전국시간평균":"3.82","시간상위":"24%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"113.53","전국총점평균":"110.9","총점상위":"5%","학습포인트":"414.4","출결포인트":"50","전체포인트":"464.4","복권이벤트":"-","전국랭킹":"68","전국회원수":"2198","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"471.2","시간점수":"17.93","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"542.13","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/19/4/0","총학습수":"19","가감총점":"552.13","평균":"29.06","랭킹":"7","본부랭킹":"0","학습평균":"88.51","전국학습평균":"92.8","학습상위":"6%","시간평균":"3.93","전국시간평균":"3.82","시간상위":"42%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"111.47","전국총점평균":"110.9","총점상위":"6%","학습포인트":"424.08","출결포인트":"50","전체포인트":"474.08","복권이벤트":"-","전국랭킹":"107","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"487.31","시간점수":"17.88","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"560.19","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/23/0/0","총학습수":"19","가감총점":"570.19","평균":"30.01","랭킹":"9","본부랭킹":"0","학습평균":"87.76","전국학습평균":"92.8","학습상위":"8%","시간평균":"3.27","전국시간평균":"3.82","시간상위":"48%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"109.75","전국총점평균":"110.9","총점상위":"7%","학습포인트":"438.58","출결포인트":"50","전체포인트":"488.58","복권이벤트":"-","전국랭킹":"91","전국회원수":"2198","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"445.8","시간점수":"14.81","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"515.61","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"20","가감총점":"515.61","평균":"25.78","랭킹":"9","본부랭킹":"0","학습평균":"85.69","전국학습평균":"92.8","학습상위":"9%","시간평균":"3.02","전국시간평균":"3.82","시간상위":"55%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"106.63","전국총점평균":"110.9","총점상위":"9%","학습포인트":"401.22","출결포인트":"50","전체포인트":"451.22","복권이벤트":"-","전국랭킹":"66","전국회원수":"2198","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"448.1","시간점수":"13.62","출결점수":"49","학습가산점":"2","리셋감점":"0","총점":"512.72","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/11/9/0","총학습수":"17","가감총점":"512.72","평균":"30.16","랭킹":"7","본부랭킹":"0","학습평균":"85.38","전국학습평균":"92.8","학습상위":"11%","시간평균":"2.62","전국시간평균":"3.82","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.95","출결상위":"28%","총점평균":"103.3","전국총점평균":"110.9","총점상위":"11%","학습포인트":"403.29","출결포인트":"49","전체포인트":"452.29","복권이벤트":"-","전국랭킹":"144","전국회원수":"2198","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"411.75","시간점수":"10.3","출결점수":"47","학습가산점":"2","리셋감점":"0","총점":"471.05","상위가점":"0.0","하위감점":"-20.0","상하위진도수":"0/8/10/4","총학습수":"18","가감총점":"451.05","평균":"25.06","랭킹":"9","본부랭킹":"0","학습평균":"75.69","전국학습평균":"92.8","학습상위":"22%","시간평균":"1.97","전국시간평균":"3.82","시간상위":"78%","출결평균":"9.33","전국출결평균":"8.95","출결상위":"38%","총점평균":"89.75","전국총점평균":"110.9","총점상위":"22%","학습포인트":"370.57","출결포인트":"47","전체포인트":"417.57","복권이벤트":"-","전국랭킹":"480","전국회원수":"2198","최종랭킹":""}],
  "6":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"600","시간점수":"35.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"701.8","상위가점":"20","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"32","가감총점":"721.8","평균":"120.3","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.97","전국시간평균":"3.82","시간상위":"3%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"120.3","전국총점평균":"110.9","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"1","전국회원수":"2198","최종랭킹":"Grand Master"},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"597","시간점수":"34.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"697.2","상위가점":"20","하위감점":"0","상하위진도수":"23/0/0/0","총학습수":"23","가감총점":"717.2","평균":"119.53","랭킹":"2","본부랭킹":"1","학습평균":"99.5","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.7","전국시간평균":"3.82","시간상위":"5%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"119.53","전국총점평균":"110.9","총점상위":"1%","학습포인트":"597","출결포인트":"60","전체포인트":"657","복권이벤트":"-","전국랭킹":"3","전국회원수":"2198","최종랭킹":"Grand Master"},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"595","시간점수":"33.5","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"692.5","상위가점":"20","하위감점":"0","상하위진도수":"26/0/0/0","총학습수":"26","가감총점":"712.5","평균":"118.75","랭킹":"3","본부랭킹":"2","학습평균":"99.17","전국학습평균":"92.8","학습상위":"2%","시간평균":"5.58","전국시간평균":"3.82","시간상위":"6%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"118.75","전국총점평균":"110.9","총점상위":"2%","학습포인트":"595","출결포인트":"60","전체포인트":"655","복권이벤트":"-","전국랭킹":"5","전국회원수":"2198","최종랭킹":"Grand Master"},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"585","시간점수":"26.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"677.8","상위가점":"10","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"23","가감총점":"687.8","평균":"114.63","랭킹":"4","본부랭킹":"2","학습평균":"97.5","전국학습평균":"92.8","학습상위":"4%","시간평균":"4.47","전국시간평균":"3.82","시간상위":"20%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"114.63","전국총점평균":"110.9","총점상위":"4%","학습포인트":"585","출결포인트":"60","전체포인트":"645","복권이벤트":"-","전국랭킹":"18","전국회원수":"2198","최종랭킹":"Master"},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"580","시간점수":"25.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"671.2","상위가점":"10","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"25","가감총점":"681.2","평균":"113.53","랭킹":"5","본부랭킹":"1","학습평균":"96.67","전국학습평균":"92.8","학습상위":"5%","시간평균":"4.2","전국시간평균":"3.82","시간상위":"24%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"113.53","전국총점평균":"110.9","총점상위":"5%","학습포인트":"580","출결포인트":"60","전체포인트":"640","복권이벤트":"-","전국랭킹":"22","전국회원수":"2198","최종랭킹":"Master"},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"572","시간점수":"22.8","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"658.8","상위가점":"10","하위감점":"0","상하위진도수":"0/19/4/0","총학습수":"23","가감총점":"668.8","평균":"111.47","랭킹":"6","본부랭킹":"1","학습평균":"95.33","전국학습평균":"92.8","학습상위":"6%","시간평균":"3.8","전국시간평균":"3.82","시간상위":"42%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"111.47","전국총점평균":"110.9","총점상위":"6%","학습포인트":"572","출결포인트":"60","전체포인트":"632","복권이벤트":"-","전국랭킹":"38","전국회원수":"2198","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"562","시간점수":"20.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"648.5","상위가점":"10","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"23","가감총점":"658.5","평균":"109.75","랭킹":"7","본부랭킹":"4","학습평균":"93.67","전국학습평균":"92.8","학습상위":"8%","시간평균":"3.42","전국시간평균":"3.82","시간상위":"48%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"109.75","전국총점평균":"110.9","총점상위":"7%","학습포인트":"562","출결포인트":"60","전체포인트":"622","복권이벤트":"-","전국랭킹":"55","전국회원수":"2198","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"555","시간점수":"18.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"639.8","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"639.8","평균":"106.63","랭킹":"8","본부랭킹":"2","학습평균":"92.5","전국학습평균":"92.8","학습상위":"9%","시간평균":"3.13","전국시간평균":"3.82","시간상위":"55%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"106.63","전국총점평균":"110.9","총점상위":"9%","학습포인트":"555","출결포인트":"60","전체포인트":"615","복권이벤트":"-","전국랭킹":"78","전국회원수":"2198","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"542","시간점수":"16.8","출결점수":"58","학습가산점":"3","리셋감점":"0","총점":"619.8","상위가점":"0","하위감점":"0","상하위진도수":"0/11/9/0","총학습수":"20","가감총점":"619.8","평균":"103.3","랭킹":"9","본부랭킹":"1","학습평균":"90.33","전국학습평균":"92.8","학습상위":"11%","시간평균":"2.8","전국시간평균":"3.82","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.95","출결상위":"28%","총점평균":"103.3","전국총점평균":"110.9","총점상위":"11%","학습포인트":"442","출결포인트":"50","전체포인트":"492","복권이벤트":"-","전국랭킹":"128","전국회원수":"2198","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"488","시간점수":"12.5","출결점수":"56","학습가산점":"2","리셋감점":"0","총점":"558.5","상위가점":"0","하위감점":"-20","상하위진도수":"0/8/10/4","총학습수":"22","가감총점":"538.5","평균":"89.75","랭킹":"10","본부랭킹":"2","학습평균":"81.33","전국학습평균":"92.8","학습상위":"22%","시간평균":"2.08","전국시간평균":"3.82","시간상위":"78%","출결평균":"9.33","전국출결평균":"8.95","출결상위":"38%","총점평균":"89.75","전국총점평균":"110.9","총점상위":"22%","학습포인트":"388","출결포인트":"48","전체포인트":"436","복권이벤트":"-","전국랭킹":"452","전국회원수":"2198","최종랭킹":"최하고정"}]},
  data: [
      {"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"600","시간점수":"35.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"701.8","상위가점":"20","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"32","가감총점":"721.8","평균":"120.3","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.97","전국시간평균":"3.82","시간상위":"3%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"120.3","전국총점평균":"110.9","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"1","전국회원수":"2198","최종랭킹":"Grand Master"},
      {"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"597","시간점수":"34.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"697.2","상위가점":"20","하위감점":"0","상하위진도수":"23/0/0/0","총학습수":"23","가감총점":"717.2","평균":"119.53","랭킹":"2","본부랭킹":"1","학습평균":"99.5","전국학습평균":"92.8","학습상위":"1%","시간평균":"5.7","전국시간평균":"3.82","시간상위":"5%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"119.53","전국총점평균":"110.9","총점상위":"1%","학습포인트":"597","출결포인트":"60","전체포인트":"657","복권이벤트":"-","전국랭킹":"3","전국회원수":"2198","최종랭킹":"Grand Master"},
      {"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"595","시간점수":"33.5","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"692.5","상위가점":"20","하위감점":"0","상하위진도수":"26/0/0/0","총학습수":"26","가감총점":"712.5","평균":"118.75","랭킹":"3","본부랭킹":"2","학습평균":"99.17","전국학습평균":"92.8","학습상위":"2%","시간평균":"5.58","전국시간평균":"3.82","시간상위":"6%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"118.75","전국총점평균":"110.9","총점상위":"2%","학습포인트":"595","출결포인트":"60","전체포인트":"655","복권이벤트":"-","전국랭킹":"5","전국회원수":"2198","최종랭킹":"Grand Master"},
      {"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"585","시간점수":"26.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"677.8","상위가점":"10","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"23","가감총점":"687.8","평균":"114.63","랭킹":"4","본부랭킹":"2","학습평균":"97.5","전국학습평균":"92.8","학습상위":"4%","시간평균":"4.47","전국시간평균":"3.82","시간상위":"20%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"114.63","전국총점평균":"110.9","총점상위":"4%","학습포인트":"585","출결포인트":"60","전체포인트":"645","복권이벤트":"-","전국랭킹":"18","전국회원수":"2198","최종랭킹":"Master"},
      {"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"580","시간점수":"25.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"671.2","상위가점":"10","하위감점":"0","상하위진도수":"0/25/0/0","총학습수":"25","가감총점":"681.2","평균":"113.53","랭킹":"5","본부랭킹":"1","학습평균":"96.67","전국학습평균":"92.8","학습상위":"5%","시간평균":"4.2","전국시간평균":"3.82","시간상위":"24%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"113.53","전국총점평균":"110.9","총점상위":"5%","학습포인트":"580","출결포인트":"60","전체포인트":"640","복권이벤트":"-","전국랭킹":"22","전국회원수":"2198","최종랭킹":"Master"},
      {"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"572","시간점수":"22.8","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"658.8","상위가점":"10","하위감점":"0","상하위진도수":"0/19/4/0","총학습수":"23","가감총점":"668.8","평균":"111.47","랭킹":"6","본부랭킹":"1","학습평균":"95.33","전국학습평균":"92.8","학습상위":"6%","시간평균":"3.8","전국시간평균":"3.82","시간상위":"42%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"111.47","전국총점평균":"110.9","총점상위":"6%","학습포인트":"572","출결포인트":"60","전체포인트":"632","복권이벤트":"-","전국랭킹":"38","전국회원수":"2198","최종랭킹":""},
      {"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"562","시간점수":"20.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"648.5","상위가점":"10","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"23","가감총점":"658.5","평균":"109.75","랭킹":"7","본부랭킹":"4","학습평균":"93.67","전국학습평균":"92.8","학습상위":"8%","시간평균":"3.42","전국시간평균":"3.82","시간상위":"48%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"109.75","전국총점평균":"110.9","총점상위":"7%","학습포인트":"562","출결포인트":"60","전체포인트":"622","복권이벤트":"-","전국랭킹":"55","전국회원수":"2198","최종랭킹":""},
      {"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"555","시간점수":"18.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"639.8","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"639.8","평균":"106.63","랭킹":"8","본부랭킹":"2","학습평균":"92.5","전국학습평균":"92.8","학습상위":"9%","시간평균":"3.13","전국시간평균":"3.82","시간상위":"55%","출결평균":"10","전국출결평균":"8.95","출결상위":"1%","총점평균":"106.63","전국총점평균":"110.9","총점상위":"9%","학습포인트":"555","출결포인트":"60","전체포인트":"615","복권이벤트":"-","전국랭킹":"78","전국회원수":"2198","최종랭킹":""},
      {"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"542","시간점수":"16.8","출결점수":"58","학습가산점":"3","리셋감점":"0","총점":"619.8","상위가점":"0","하위감점":"0","상하위진도수":"0/11/9/0","총학습수":"20","가감총점":"619.8","평균":"103.3","랭킹":"9","본부랭킹":"1","학습평균":"90.33","전국학습평균":"92.8","학습상위":"11%","시간평균":"2.8","전국시간평균":"3.82","시간상위":"62%","출결평균":"9.67","전국출결평균":"8.95","출결상위":"28%","총점평균":"103.3","전국총점평균":"110.9","총점상위":"11%","학습포인트":"442","출결포인트":"50","전체포인트":"492","복권이벤트":"-","전국랭킹":"128","전국회원수":"2198","최종랭킹":""},
      {"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"488","시간점수":"12.5","출결점수":"56","학습가산점":"2","리셋감점":"0","총점":"558.5","상위가점":"0","하위감점":"-20","상하위진도수":"0/8/10/4","총학습수":"22","가감총점":"538.5","평균":"89.75","랭킹":"10","본부랭킹":"2","학습평균":"81.33","전국학습평균":"92.8","학습상위":"22%","시간평균":"2.08","전국시간평균":"3.82","시간상위":"78%","출결평균":"9.33","전국출결평균":"8.95","출결상위":"38%","총점평균":"89.75","전국총점평균":"110.9","총점상위":"22%","학습포인트":"388","출결포인트":"48","전체포인트":"436","복권이벤트":"-","전국랭킹":"452","전국회원수":"2198","최종랭킹":"최하고정"}
    ]
  };

  LEAGUE_DATA['2023_summer'] = {
    label: '2023 서머 리그오브매스',
    finalized: true,
    totalWeeks:6,
  weeks:{  "1":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"104.49","시간점수":"5.78","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"123.27","상위가점":"0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"5","가감총점":"123.27","평균":"24.65","랭킹":"3","본부랭킹":"0","학습평균":"100.04","전국학습평균":"92.1","학습상위":"1%","시간평균":"5.77","전국시간평균":"3.75","시간상위":"2%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"120.42","전국총점평균":"109.8","총점상위":"1%","학습포인트":"94.04","출결포인트":"12","전체포인트":"106.04","복권이벤트":"-","전국랭킹":"19","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"97.53","시간점수":"5.76","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"116.29","상위가점":"0","하위감점":"0","상하위진도수":"22/0/0/0","총학습수":"4","가감총점":"116.29","평균":"29.07","랭킹":"6","본부랭킹":"0","학습평균":"100.9","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.18","전국시간평균":"3.75","시간상위":"5%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"119.13","전국총점평균":"109.8","총점상위":"1%","학습포인트":"87.78","출결포인트":"12","전체포인트":"99.78","복권이벤트":"-","전국랭킹":"57","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"96.9","시간점수":"5.64","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"115.54","상위가점":"0","하위감점":"0","상하위진도수":"25/0/0/0","총학습수":"4","가감총점":"115.54","평균":"28.89","랭킹":"2","본부랭킹":"0","학습평균":"93.88","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.66","전국시간평균":"3.75","시간상위":"7%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"118.08","전국총점평균":"109.8","총점상위":"2%","학습포인트":"87.21","출결포인트":"12","전체포인트":"99.21","복권이벤트":"-","전국랭킹":"37","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"100.85","시간점수":"3.85","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"117.7","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"4","가감총점":"117.7","평균":"29.43","랭킹":"7","본부랭킹":"0","학습평균":"93.35","전국학습평균":"92.1","학습상위":"5%","시간평균":"4.02","전국시간평균":"3.75","시간상위":"25%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"113.08","전국총점평균":"109.8","총점상위":"4%","학습포인트":"90.77","출결포인트":"12","전체포인트":"102.77","복권이벤트":"-","전국랭킹":"76","전국회원수":"2088","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"92.88","시간점수":"3.63","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"109.51","상위가점":"0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"4","가감총점":"109.51","평균":"27.38","랭킹":"9","본부랭킹":"0","학습평균":"91.45","전국학습평균":"92.1","학습상위":"6%","시간평균":"3.48","전국시간평균":"3.75","시간상위":"38%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"111.8","전국총점평균":"109.8","총점상위":"5%","학습포인트":"83.59","출결포인트":"12","전체포인트":"95.59","복권이벤트":"-","전국랭킹":"105","전국회원수":"2088","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"94.77","시간점수":"3.43","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"111.2","상위가점":"0","하위감점":"0","상하위진도수":"0/18/4/0","총학습수":"4","가감총점":"111.2","평균":"27.8","랭킹":"8","본부랭킹":"0","학습평균":"93.06","전국학습평균":"92.1","학습상위":"7%","시간평균":"3.41","전국시간평균":"3.75","시간상위":"45%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"109.97","전국총점평균":"109.8","총점상위":"6%","학습포인트":"85.29","출결포인트":"12","전체포인트":"97.29","복권이벤트":"-","전국랭킹":"41","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"97.21","시간점수":"3.05","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"113.26","상위가점":"0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"4","가감총점":"113.26","평균":"28.32","랭킹":"10","본부랭킹":"0","학습평균":"89.64","전국학습평균":"92.1","학습상위":"9%","시간평균":"2.97","전국시간평균":"3.75","시간상위":"52%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"107.15","전국총점평균":"109.8","총점상위":"7%","학습포인트":"87.49","출결포인트":"12","전체포인트":"99.49","복권이벤트":"-","전국랭킹":"64","전국회원수":"2088","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"93.09","시간점수":"2.86","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"108.95","상위가점":"0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"4","가감총점":"108.95","평균":"27.24","랭킹":"12","본부랭킹":"0","학습평균":"87.76","전국학습평균":"92.1","학습상위":"10%","시간평균":"2.73","전국시간평균":"3.75","시간상위":"62%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"105.13","전국총점평균":"109.8","총점상위":"9%","학습포인트":"83.78","출결포인트":"12","전체포인트":"95.78","복권이벤트":"-","전국랭킹":"166","전국회원수":"2088","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"90.86","시간점수":"2.31","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"105.17","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"3","가감총점":"105.17","평균":"35.06","랭킹":"12","본부랭킹":"0","학습평균":"88.91","전국학습평균":"92.1","학습상위":"12%","시간평균":"2.52","전국시간평균":"3.75","시간상위":"70%","출결평균":"9.67","전국출결평균":"8.88","출결상위":"28%","총점평균":"102.3","전국총점평균":"109.8","총점상위":"12%","학습포인트":"81.77","출결포인트":"12","전체포인트":"93.77","복권이벤트":"-","전국랭킹":"134","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-3001001002","회원명":"한지호","생년월일":"2017-05-15","리그명":"-","조명":"-","학습점수":"74.2","시간점수":"1.78","출결점수":"11","학습가산점":"0","리셋감점":"0","총점":"86.98","상위가점":"0","하위감점":"0","상하위진도수":"0/5/8/5","총학습수":"3","가감총점":"86.98","평균":"28.99","랭킹":"11","본부랭킹":"0","학습평균":"74.41","전국학습평균":"92.1","학습상위":"35%","시간평균":"1.66","전국시간평균":"3.75","시간상위":"85%","출결평균":"8.67","전국출결평균":"8.88","출결상위":"58%","총점평균":"83.03","전국총점평균":"109.8","총점상위":"38%","학습포인트":"66.78","출결포인트":"11","전체포인트":"77.78","복권이벤트":"-","전국랭킹":"1592","전국회원수":"2088","최종랭킹":""}],
  "2":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"208.41","시간점수":"12.21","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"244.62","상위가점":"0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"11","가감총점":"244.62","평균":"22.24","랭킹":"3","본부랭킹":"0","학습평균":"99.91","전국학습평균":"92.1","학습상위":"1%","시간평균":"5.8","전국시간평균":"3.75","시간상위":"2%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"120.42","전국총점평균":"109.8","총점상위":"1%","학습포인트":"187.57","출결포인트":"22","전체포인트":"209.57","복권이벤트":"-","전국랭킹":"1","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"206.18","시간점수":"11.05","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"241.23","상위가점":"0","하위감점":"0","상하위진도수":"22/0/0/0","총학습수":"7","가감총점":"241.23","평균":"34.46","랭킹":"5","본부랭킹":"0","학습평균":"92.32","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.28","전국시간평균":"3.75","시간상위":"5%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"119.13","전국총점평균":"109.8","총점상위":"1%","학습포인트":"185.56","출결포인트":"22","전체포인트":"207.56","복권이벤트":"-","전국랭킹":"1","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"200.58","시간점수":"10.02","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"233.6","상위가점":"0","하위감점":"0","상하위진도수":"25/0/0/0","총학습수":"8","가감총점":"233.6","평균":"29.2","랭킹":"5","본부랭킹":"0","학습평균":"96.33","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.4","전국시간평균":"3.75","시간상위":"7%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"118.08","전국총점평균":"109.8","총점상위":"2%","학습포인트":"180.52","출결포인트":"22","전체포인트":"202.52","복권이벤트":"-","전국랭킹":"1","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"195.49","시간점수":"8.53","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"228.02","상위가점":"0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"8","가감총점":"228.02","평균":"28.5","랭킹":"4","본부랭킹":"0","학습평균":"92.77","전국학습평균":"92.1","학습상위":"5%","시간평균":"3.68","전국시간평균":"3.75","시간상위":"25%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"113.08","전국총점평균":"109.8","총점상위":"4%","학습포인트":"175.94","출결포인트":"22","전체포인트":"197.94","복권이벤트":"-","전국랭킹":"96","전국회원수":"2088","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"186.07","시간점수":"7.42","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"217.49","상위가점":"0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"7","가감총점":"217.49","평균":"31.07","랭킹":"7","본부랭킹":"0","학습평균":"93.24","전국학습평균":"92.1","학습상위":"6%","시간평균":"3.75","전국시간평균":"3.75","시간상위":"38%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"111.8","전국총점평균":"109.8","총점상위":"5%","학습포인트":"167.46","출결포인트":"22","전체포인트":"189.46","복권이벤트":"-","전국랭킹":"76","전국회원수":"2088","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"187.31","시간점수":"6.65","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"216.96","상위가점":"0","하위감점":"0","상하위진도수":"0/18/4/0","총학습수":"7","가감총점":"216.96","평균":"30.99","랭킹":"10","본부랭킹":"0","학습평균":"92.18","전국학습평균":"92.1","학습상위":"7%","시간평균":"3.38","전국시간평균":"3.75","시간상위":"45%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"109.97","전국총점평균":"109.8","총점상위":"6%","학습포인트":"168.58","출결포인트":"22","전체포인트":"190.58","복권이벤트":"-","전국랭킹":"104","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"183.12","시간점수":"5.69","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"212.81","상위가점":"0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"7","가감총점":"212.81","평균":"30.4","랭킹":"5","본부랭킹":"0","학습평균":"89.43","전국학습평균":"92.1","학습상위":"9%","시간평균":"3.29","전국시간평균":"3.75","시간상위":"52%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"107.15","전국총점평균":"109.8","총점상위":"7%","학습포인트":"164.81","출결포인트":"22","전체포인트":"186.81","복권이벤트":"-","전국랭킹":"75","전국회원수":"2088","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"175.65","시간점수":"5.83","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"205.48","상위가점":"0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"7","가감총점":"205.48","평균":"29.35","랭킹":"7","본부랭킹":"0","학습평균":"86.87","전국학습평균":"92.1","학습상위":"10%","시간평균":"2.71","전국시간평균":"3.75","시간상위":"62%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"105.13","전국총점평균":"109.8","총점상위":"9%","학습포인트":"158.09","출결포인트":"22","전체포인트":"180.09","복권이벤트":"-","전국랭킹":"109","전국회원수":"2088","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"174.08","시간점수":"4.8","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"200.88","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"7","가감총점":"200.88","평균":"28.7","랭킹":"10","본부랭킹":"0","학습평균":"86.43","전국학습평균":"92.1","학습상위":"12%","시간평균":"2.48","전국시간평균":"3.75","시간상위":"70%","출결평균":"9.67","전국출결평균":"8.88","출결상위":"28%","총점평균":"102.3","전국총점평균":"109.8","총점상위":"12%","학습포인트":"156.67","출결포인트":"21","전체포인트":"177.67","복권이벤트":"-","전국랭킹":"127","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-3001001002","회원명":"한지호","생년월일":"2017-05-15","리그명":"-","조명":"-","학습점수":"152.19","시간점수":"3.21","출결점수":"19","학습가산점":"0","리셋감점":"0","총점":"174.4","상위가점":"0","하위감점":"0","상하위진도수":"0/5/8/5","총학습수":"6","가감총점":"174.4","평균":"29.07","랭킹":"14","본부랭킹":"0","학습평균":"72.19","전국학습평균":"92.1","학습상위":"35%","시간평균":"1.75","전국시간평균":"3.75","시간상위":"85%","출결평균":"8.67","전국출결평균":"8.88","출결상위":"58%","총점평균":"83.03","전국총점평균":"109.8","총점상위":"38%","학습포인트":"136.97","출결포인트":"19","전체포인트":"155.97","복권이벤트":"-","전국랭킹":"1608","전국회원수":"2088","최종랭킹":""}],
  "3":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"304.44","시간점수":"18.28","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"357.72","상위가점":"20.0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"16","가감총점":"377.72","평균":"23.61","랭킹":"1","본부랭킹":"0","학습평균":"94.44","전국학습평균":"92.1","학습상위":"1%","시간평균":"5.63","전국시간평균":"3.75","시간상위":"2%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"120.42","전국총점평균":"109.8","총점상위":"1%","학습포인트":"274.0","출결포인트":"32","전체포인트":"306.0","복권이벤트":"-","전국랭킹":"65","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"287.39","시간점수":"16.63","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"339.02","상위가점":"20.0","하위감점":"0","상하위진도수":"22/0/0/0","총학습수":"11","가감총점":"359.02","평균":"32.64","랭킹":"3","본부랭킹":"0","학습평균":"99.15","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.6","전국시간평균":"3.75","시간상위":"5%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"119.13","전국총점평균":"109.8","총점상위":"1%","학습포인트":"258.65","출결포인트":"32","전체포인트":"290.65","복권이벤트":"-","전국랭킹":"3","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"286.72","시간점수":"16.23","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"336.95","상위가점":"20.0","하위감점":"0","상하위진도수":"25/0/0/0","총학습수":"12","가감총점":"356.95","평균":"29.75","랭킹":"4","본부랭킹":"0","학습평균":"98.05","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.6","전국시간평균":"3.75","시간상위":"7%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"118.08","전국총점평균":"109.8","총점상위":"2%","학습포인트":"258.05","출결포인트":"32","전체포인트":"290.05","복권이벤트":"-","전국랭킹":"1","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"287.54","시간점수":"11.81","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"334.35","상위가점":"10.0","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"12","가감총점":"344.35","평균":"28.7","랭킹":"2","본부랭킹":"0","학습평균":"90.69","전국학습평균":"92.1","학습상위":"5%","시간평균":"3.84","전국시간평균":"3.75","시간상위":"25%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"113.08","전국총점평균":"109.8","총점상위":"4%","학습포인트":"258.79","출결포인트":"32","전체포인트":"290.79","복권이벤트":"-","전국랭킹":"85","전국회원수":"2088","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"291.83","시간점수":"11.62","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"338.45","상위가점":"10.0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"11","가감총점":"348.45","평균":"31.68","랭킹":"7","본부랭킹":"0","학습평균":"95.33","전국학습평균":"92.1","학습상위":"6%","시간평균":"3.73","전국시간평균":"3.75","시간상위":"38%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"111.8","전국총점평균":"109.8","총점상위":"5%","학습포인트":"262.65","출결포인트":"32","전체포인트":"294.65","복권이벤트":"-","전국랭킹":"18","전국회원수":"2088","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"278.71","시간점수":"9.67","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"322.38","상위가점":"10.0","하위감점":"0","상하위진도수":"0/18/4/0","총학습수":"11","가감총점":"332.38","평균":"30.22","랭킹":"4","본부랭킹":"0","학습평균":"92.95","전국학습평균":"92.1","학습상위":"7%","시간평균":"3.38","전국시간평균":"3.75","시간상위":"45%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"109.97","전국총점평균":"109.8","총점상위":"6%","학습포인트":"250.84","출결포인트":"32","전체포인트":"282.84","복권이벤트":"-","전국랭킹":"51","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"292.0","시간점수":"8.95","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"335.95","상위가점":"0.0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"11","가감총점":"335.95","평균":"30.54","랭킹":"8","본부랭킹":"0","학습평균":"89.21","전국학습평균":"92.1","학습상위":"9%","시간평균":"2.89","전국시간평균":"3.75","시간상위":"52%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"107.15","전국총점평균":"109.8","총점상위":"7%","학습포인트":"262.8","출결포인트":"32","전체포인트":"294.8","복권이벤트":"-","전국랭킹":"116","전국회원수":"2088","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"269.94","시간점수":"8.14","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"313.08","상위가점":"0.0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"11","가감총점":"313.08","평균":"28.46","랭킹":"7","본부랭킹":"0","학습평균":"90.18","전국학습평균":"92.1","학습상위":"10%","시간평균":"2.86","전국시간평균":"3.75","시간상위":"62%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"105.13","전국총점평균":"109.8","총점상위":"9%","학습포인트":"242.95","출결포인트":"32","전체포인트":"274.95","복권이벤트":"-","전국랭킹":"169","전국회원수":"2088","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"280.26","시간점수":"7.32","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"319.58","상위가점":"0.0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"10","가감총점":"319.58","평균":"31.96","랭킹":"12","본부랭킹":"0","학습평균":"85.3","전국학습평균":"92.1","학습상위":"12%","시간평균":"2.31","전국시간평균":"3.75","시간상위":"70%","출결평균":"9.67","전국출결평균":"8.88","출결상위":"28%","총점평균":"102.3","전국총점평균":"109.8","총점상위":"12%","학습포인트":"252.23","출결포인트":"30","전체포인트":"282.23","복권이벤트":"-","전국랭킹":"132","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-3001001002","회원명":"한지호","생년월일":"2017-05-15","리그명":"-","조명":"-","학습점수":"223.59","시간점수":"4.88","출결점수":"27","학습가산점":"0","리셋감점":"0","총점":"255.47","상위가점":"0.0","하위감점":"0","상하위진도수":"0/5/8/5","총학습수":"9","가감총점":"255.47","평균":"28.39","랭킹":"9","본부랭킹":"0","학습평균":"74.31","전국학습평균":"92.1","학습상위":"35%","시간평균":"1.68","전국시간평균":"3.75","시간상위":"85%","출결평균":"8.67","전국출결평균":"8.88","출결상위":"58%","총점평균":"83.03","전국총점평균":"109.8","총점상위":"38%","학습포인트":"201.23","출결포인트":"27","전체포인트":"228.23","복권이벤트":"-","전국랭킹":"1583","전국회원수":"2088","최종랭킹":""}],
  "4":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"402.99","시간점수":"23.44","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"471.43","상위가점":"20.0","하위감점":"0.0","상하위진도수":"32/0/0/0","총학습수":"21","가감총점":"491.43","평균":"23.4","랭킹":"2","본부랭킹":"0","학습평균":"97.37","전국학습평균":"92.1","학습상위":"1%","시간평균":"6.31","전국시간평균":"3.75","시간상위":"2%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"120.42","전국총점평균":"109.8","총점상위":"1%","학습포인트":"362.69","출결포인트":"41","전체포인트":"403.69","복권이벤트":"-","전국랭킹":"52","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"413.75","시간점수":"20.87","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"479.62","상위가점":"20.0","하위감점":"0.0","상하위진도수":"22/0/0/0","총학습수":"15","가감총점":"499.62","평균":"33.31","랭킹":"1","본부랭킹":"0","학습평균":"94.1","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.23","전국시간평균":"3.75","시간상위":"5%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"119.13","전국총점평균":"109.8","총점상위":"1%","학습포인트":"372.38","출결포인트":"41","전체포인트":"413.38","복권이벤트":"-","전국랭킹":"36","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"408.16","시간점수":"21.51","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"473.67","상위가점":"20.0","하위감점":"0.0","상하위진도수":"25/0/0/0","총학습수":"17","가감총점":"493.67","평균":"29.04","랭킹":"7","본부랭킹":"0","학습평균":"100.17","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.27","전국시간평균":"3.75","시간상위":"7%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"118.08","전국총점평균":"109.8","총점상위":"2%","학습포인트":"367.34","출결포인트":"41","전체포인트":"408.34","복권이벤트":"-","전국랭킹":"21","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"373.59","시간점수":"15.64","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"434.23","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"16","가감총점":"444.23","평균":"27.76","랭킹":"6","본부랭킹":"0","학습평균":"94.91","전국학습평균":"92.1","학습상위":"5%","시간평균":"3.92","전국시간평균":"3.75","시간상위":"25%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"113.08","전국총점평균":"109.8","총점상위":"4%","학습포인트":"336.23","출결포인트":"41","전체포인트":"377.23","복권이벤트":"-","전국랭킹":"59","전국회원수":"2088","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"381.02","시간점수":"15.3","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"441.32","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/22/0/0","총학습수":"15","가감총점":"451.32","평균":"30.09","랭킹":"6","본부랭킹":"0","학습평균":"89.3","전국학습평균":"92.1","학습상위":"6%","시간평균":"3.74","전국시간평균":"3.75","시간상위":"38%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"111.8","전국총점평균":"109.8","총점상위":"5%","학습포인트":"342.92","출결포인트":"41","전체포인트":"383.92","복권이벤트":"-","전국랭킹":"67","전국회원수":"2088","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"387.81","시간점수":"12.94","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"444.75","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/18/4/0","총학습수":"15","가감총점":"454.75","평균":"30.32","랭킹":"4","본부랭킹":"0","학습평균":"88.75","전국학습평균":"92.1","학습상위":"7%","시간평균":"3.27","전국시간평균":"3.75","시간상위":"45%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"109.97","전국총점평균":"109.8","총점상위":"6%","학습포인트":"349.03","출결포인트":"41","전체포인트":"390.03","복권이벤트":"-","전국랭킹":"53","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"382.44","시간점수":"12.41","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"439.85","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/22/0/0","총학습수":"15","가감총점":"439.85","평균":"29.32","랭킹":"11","본부랭킹":"0","학습평균":"90.17","전국학습평균":"92.1","학습상위":"9%","시간평균":"3.08","전국시간평균":"3.75","시간상위":"52%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"107.15","전국총점평균":"109.8","총점상위":"7%","학습포인트":"344.2","출결포인트":"41","전체포인트":"385.2","복권이벤트":"-","전국랭킹":"136","전국회원수":"2088","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"367.99","시간점수":"10.53","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"423.52","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/22/0/0","총학습수":"15","가감총점":"423.52","평균":"28.23","랭킹":"10","본부랭킹":"0","학습평균":"93.07","전국학습평균":"92.1","학습상위":"10%","시간평균":"2.75","전국시간평균":"3.75","시간상위":"62%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"105.13","전국총점평균":"109.8","총점상위":"9%","학습포인트":"331.19","출결포인트":"41","전체포인트":"372.19","복권이벤트":"-","전국랭킹":"170","전국회원수":"2088","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"367.88","시간점수":"10.0","출결점수":"40","학습가산점":"2","리셋감점":"0","총점":"419.88","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/10/10/0","총학습수":"13","가감총점":"419.88","평균":"32.3","랭킹":"10","본부랭킹":"0","학습평균":"84.46","전국학습평균":"92.1","학습상위":"12%","시간평균":"2.38","전국시간평균":"3.75","시간상위":"70%","출결평균":"9.67","전국출결평균":"8.88","출결상위":"28%","총점평균":"102.3","전국총점평균":"109.8","총점상위":"12%","학습포인트":"331.09","출결포인트":"40","전체포인트":"371.09","복권이벤트":"-","전국랭킹":"184","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-3001001002","회원명":"한지호","생년월일":"2017-05-15","리그명":"-","조명":"-","학습점수":"317.32","시간점수":"6.79","출결점수":"36","학습가산점":"1","리셋감점":"0","총점":"361.11","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0/5/8/5","총학습수":"12","가감총점":"331.11","평균":"27.59","랭킹":"9","본부랭킹":"0","학습평균":"78.08","전국학습평균":"92.1","학습상위":"35%","시간평균":"1.54","전국시간평균":"3.75","시간상위":"85%","출결평균":"8.67","전국출결평균":"8.88","출결상위":"58%","총점평균":"83.03","전국총점평균":"109.8","총점상위":"38%","학습포인트":"285.59","출결포인트":"36","전체포인트":"321.59","복권이벤트":"-","전국랭킹":"1556","전국회원수":"2088","최종랭킹":""}],
  "5":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"488.14","시간점수":"31.31","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"574.45","상위가점":"20.0","하위감점":"0.0","상하위진도수":"32/0/0/0","총학습수":"27","가감총점":"594.45","평균":"22.02","랭킹":"1","본부랭킹":"0","학습평균":"100.65","전국학습평균":"92.1","학습상위":"1%","시간평균":"5.58","전국시간평균":"3.75","시간상위":"2%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"120.42","전국총점평균":"109.8","총점상위":"1%","학습포인트":"439.33","출결포인트":"50","전체포인트":"489.33","복권이벤트":"-","전국랭킹":"27","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"511.3","시간점수":"26.24","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"592.54","상위가점":"20.0","하위감점":"0.0","상하위진도수":"22/0/0/0","총학습수":"18","가감총점":"612.54","평균":"34.03","랭킹":"5","본부랭킹":"0","학습평균":"98.07","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.79","전국시간평균":"3.75","시간상위":"5%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"119.13","전국총점평균":"109.8","총점상위":"1%","학습포인트":"460.17","출결포인트":"50","전체포인트":"510.17","복권이벤트":"-","전국랭킹":"49","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"498.77","시간점수":"26.11","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"577.88","상위가점":"20.0","하위감점":"0.0","상하위진도수":"25/0/0/0","총학습수":"21","가감총점":"597.88","평균":"28.47","랭킹":"5","본부랭킹":"0","학습평균":"98.52","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.54","전국시간평균":"3.75","시간상위":"7%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"118.08","전국총점평균":"109.8","총점상위":"2%","학습포인트":"448.89","출결포인트":"50","전체포인트":"498.89","복권이벤트":"-","전국랭킹":"1","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"496.38","시간점수":"20.12","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"571.5","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/24/0/0","총학습수":"20","가감총점":"581.5","평균":"29.07","랭킹":"6","본부랭킹":"0","학습평균":"94.37","전국학습평균":"92.1","학습상위":"5%","시간평균":"3.78","전국시간평균":"3.75","시간상위":"25%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"113.08","전국총점평균":"109.8","총점상위":"4%","학습포인트":"446.74","출결포인트":"50","전체포인트":"496.74","복권이벤트":"-","전국랭킹":"30","전국회원수":"2088","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"499.5","시간점수":"17.93","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"572.43","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/22/0/0","총학습수":"18","가감총점":"582.43","평균":"32.36","랭킹":"7","본부랭킹":"0","학습평균":"96.78","전국학습평균":"92.1","학습상위":"6%","시간평균":"3.71","전국시간평균":"3.75","시간상위":"38%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"111.8","전국총점평균":"109.8","총점상위":"5%","학습포인트":"449.55","출결포인트":"50","전체포인트":"499.55","복권이벤트":"-","전국랭킹":"39","전국회원수":"2088","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"489.67","시간점수":"17.72","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"560.39","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/18/4/0","총학습수":"18","가감총점":"570.39","평균":"31.69","랭킹":"5","본부랭킹":"0","학습평균":"94.04","전국학습평균":"92.1","학습상위":"7%","시간평균":"3.6","전국시간평균":"3.75","시간상위":"45%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"109.97","전국총점평균":"109.8","총점상위":"6%","학습포인트":"440.7","출결포인트":"50","전체포인트":"490.7","복권이벤트":"-","전국랭킹":"114","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"487.9","시간점수":"16.22","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"559.12","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/22/0/0","총학습수":"18","가감총점":"559.12","평균":"31.06","랭킹":"6","본부랭킹":"0","학습평균":"93.61","전국학습평균":"92.1","학습상위":"9%","시간평균":"2.95","전국시간평균":"3.75","시간상위":"52%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"107.15","전국총점평균":"109.8","총점상위":"7%","학습포인트":"439.11","출결포인트":"50","전체포인트":"489.11","복권이벤트":"-","전국랭킹":"127","전국회원수":"2088","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"466.32","시간점수":"14.34","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"535.66","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/22/0/0","총학습수":"18","가감총점":"535.66","평균":"29.76","랭킹":"12","본부랭킹":"0","학습평균":"90.2","전국학습평균":"92.1","학습상위":"10%","시간평균":"2.73","전국시간평균":"3.75","시간상위":"62%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"105.13","전국총점평균":"109.8","총점상위":"9%","학습포인트":"419.69","출결포인트":"50","전체포인트":"469.69","복권이벤트":"-","전국랭킹":"172","전국회원수":"2088","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"451.8","시간점수":"11.6","출결점수":"49","학습가산점":"2","리셋감점":"0","총점":"514.4","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/10/10/0","총학습수":"17","가감총점":"514.4","평균":"30.26","랭킹":"10","본부랭킹":"0","학습평균":"86.55","전국학습평균":"92.1","학습상위":"12%","시간평균":"2.46","전국시간평균":"3.75","시간상위":"70%","출결평균":"9.67","전국출결평균":"8.88","출결상위":"28%","총점평균":"102.3","전국총점평균":"109.8","총점상위":"12%","학습포인트":"406.62","출결포인트":"49","전체포인트":"455.62","복권이벤트":"-","전국랭킹":"163","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-3001001002","회원명":"한지호","생년월일":"2017-05-15","리그명":"-","조명":"-","학습점수":"402.23","시간점수":"7.77","출결점수":"44","학습가산점":"1","리셋감점":"0","총점":"455.0","상위가점":"0.0","하위감점":"-30.0","상하위진도수":"0/5/8/5","총학습수":"15","가감총점":"425.0","평균":"28.33","랭킹":"12","본부랭킹":"0","학습평균":"73.46","전국학습평균":"92.1","학습상위":"35%","시간평균":"1.77","전국시간평균":"3.75","시간상위":"85%","출결평균":"8.67","전국출결평균":"8.88","출결상위":"58%","총점평균":"83.03","전국총점평균":"109.8","총점상위":"38%","학습포인트":"362.01","출결포인트":"44","전체포인트":"406.01","복권이벤트":"-","전국랭킹":"1613","전국회원수":"2088","최종랭킹":""}],
  "6":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"600","시간점수":"36.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"702.5","상위가점":"20","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"32","가감총점":"722.5","평균":"120.42","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"92.1","학습상위":"1%","시간평균":"6.08","전국시간평균":"3.75","시간상위":"2%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"120.42","전국총점평균":"109.8","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"1","전국회원수":"2088","최종랭킹":"Grand Master"},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"595","시간점수":"33.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"694.8","상위가점":"20","하위감점":"0","상하위진도수":"22/0/0/0","총학습수":"22","가감총점":"714.8","평균":"119.13","랭킹":"2","본부랭킹":"1","학습평균":"99.17","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.63","전국시간평균":"3.75","시간상위":"5%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"119.13","전국총점평균":"109.8","총점상위":"1%","학습포인트":"595","출결포인트":"60","전체포인트":"655","복권이벤트":"-","전국랭킹":"4","전국회원수":"2088","최종랭킹":"Grand Master"},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"592","시간점수":"32.5","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"688.5","상위가점":"20","하위감점":"0","상하위진도수":"25/0/0/0","총학습수":"25","가감총점":"708.5","평균":"118.08","랭킹":"3","본부랭킹":"2","학습평균":"98.67","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.42","전국시간평균":"3.75","시간상위":"7%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"118.08","전국총점평균":"109.8","총점상위":"2%","학습포인트":"592","출결포인트":"60","전체포인트":"652","복권이벤트":"-","전국랭킹":"6","전국회원수":"2088","최종랭킹":"Grand Master"},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"578","시간점수":"24.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"668.5","상위가점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"678.5","평균":"113.08","랭킹":"4","본부랭킹":"1","학습평균":"96.33","전국학습평균":"92.1","학습상위":"5%","시간평균":"4.08","전국시간평균":"3.75","시간상위":"25%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"113.08","전국총점평균":"109.8","총점상위":"4%","학습포인트":"578","출결포인트":"60","전체포인트":"638","복권이벤트":"-","전국랭킹":"25","전국회원수":"2088","최종랭킹":"Master"},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"572","시간점수":"22.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"660.8","상위가점":"10","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"22","가감총점":"670.8","평균":"111.8","랭킹":"5","본부랭킹":"2","학습평균":"95.33","전국학습평균":"92.1","학습상위":"6%","시간평균":"3.8","전국시간평균":"3.75","시간상위":"38%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"111.8","전국총점평균":"109.8","총점상위":"5%","학습포인트":"572","출결포인트":"60","전체포인트":"632","복권이벤트":"-","전국랭킹":"35","전국회원수":"2088","최종랭킹":"Master"},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"565","시간점수":"20.8","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"649.8","상위가점":"10","하위감점":"0","상하위진도수":"0/18/4/0","총학습수":"22","가감총점":"659.8","평균":"109.97","랭킹":"6","본부랭킹":"1","학습평균":"94.17","전국학습평균":"92.1","학습상위":"7%","시간평균":"3.47","전국시간평균":"3.75","시간상위":"45%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"109.97","전국총점평균":"109.8","총점상위":"6%","학습포인트":"565","출결포인트":"60","전체포인트":"625","복권이벤트":"-","전국랭킹":"48","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"558","시간점수":"18.9","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"642.9","상위가점":"0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"22","가감총점":"642.9","평균":"107.15","랭킹":"7","본부랭킹":"3","학습평균":"93.0","전국학습평균":"92.1","학습상위":"9%","시간평균":"3.15","전국시간평균":"3.75","시간상위":"52%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"107.15","전국총점평균":"109.8","총점상위":"7%","학습포인트":"558","출결포인트":"60","전체포인트":"618","복권이벤트":"-","전국랭킹":"68","전국회원수":"2088","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"548","시간점수":"16.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"630.8","상위가점":"0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"22","가감총점":"630.8","평균":"105.13","랭킹":"8","본부랭킹":"2","학습평균":"91.33","전국학습평균":"92.1","학습상위":"10%","시간평균":"2.8","전국시간평균":"3.75","시간상위":"62%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"105.13","전국총점평균":"109.8","총점상위":"9%","학습포인트":"548","출결포인트":"60","전체포인트":"608","복권이벤트":"-","전국랭킹":"95","전국회원수":"2088","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"538","시간점수":"14.8","출결점수":"58","학습가산점":"3","리셋감점":"0","총점":"613.8","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"20","가감총점":"613.8","평균":"102.3","랭킹":"9","본부랭킹":"1","학습평균":"89.67","전국학습평균":"92.1","학습상위":"12%","시간평균":"2.47","전국시간평균":"3.75","시간상위":"70%","출결평균":"9.67","전국출결평균":"8.88","출결상위":"28%","총점평균":"102.3","전국총점평균":"109.8","총점상위":"12%","학습포인트":"438","출결포인트":"50","전체포인트":"488","복권이벤트":"-","전국랭킹":"145","전국회원수":"2088","최종랭킹":""},{"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-3001001002","회원명":"한지호","생년월일":"2017-05-15","리그명":"-","조명":"-","학습점수":"465","시간점수":"10.2","출결점수":"52","학습가산점":"1","리셋감점":"0","총점":"528.2","상위가점":"0","하위감점":"-30","상하위진도수":"0/5/8/5","총학습수":"18","가감총점":"498.2","평균":"83.03","랭킹":"10","본부랭킹":"3","학습평균":"77.5","전국학습평균":"92.1","학습상위":"35%","시간평균":"1.7","전국시간평균":"3.75","시간상위":"85%","출결평균":"8.67","전국출결평균":"8.88","출결상위":"58%","총점평균":"83.03","전국총점평균":"109.8","총점상위":"38%","학습포인트":"365","출결포인트":"44","전체포인트":"409","복권이벤트":"-","전국랭킹":"1548","전국회원수":"2088","최종랭킹":"최하고정"}]},
  data: [
      {"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"600","시간점수":"36.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"702.5","상위가점":"20","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"32","가감총점":"722.5","평균":"120.42","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"92.1","학습상위":"1%","시간평균":"6.08","전국시간평균":"3.75","시간상위":"2%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"120.42","전국총점평균":"109.8","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"1","전국회원수":"2088","최종랭킹":"Grand Master"},
      {"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"595","시간점수":"33.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"694.8","상위가점":"20","하위감점":"0","상하위진도수":"22/0/0/0","총학습수":"22","가감총점":"714.8","평균":"119.13","랭킹":"2","본부랭킹":"1","학습평균":"99.17","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.63","전국시간평균":"3.75","시간상위":"5%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"119.13","전국총점평균":"109.8","총점상위":"1%","학습포인트":"595","출결포인트":"60","전체포인트":"655","복권이벤트":"-","전국랭킹":"4","전국회원수":"2088","최종랭킹":"Grand Master"},
      {"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"592","시간점수":"32.5","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"688.5","상위가점":"20","하위감점":"0","상하위진도수":"25/0/0/0","총학습수":"25","가감총점":"708.5","평균":"118.08","랭킹":"3","본부랭킹":"2","학습평균":"98.67","전국학습평균":"92.1","학습상위":"2%","시간평균":"5.42","전국시간평균":"3.75","시간상위":"7%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"118.08","전국총점평균":"109.8","총점상위":"2%","학습포인트":"592","출결포인트":"60","전체포인트":"652","복권이벤트":"-","전국랭킹":"6","전국회원수":"2088","최종랭킹":"Grand Master"},
      {"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"578","시간점수":"24.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"668.5","상위가점":"10","하위감점":"0","상하위진도수":"0/24/0/0","총학습수":"24","가감총점":"678.5","평균":"113.08","랭킹":"4","본부랭킹":"1","학습평균":"96.33","전국학습평균":"92.1","학습상위":"5%","시간평균":"4.08","전국시간평균":"3.75","시간상위":"25%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"113.08","전국총점평균":"109.8","총점상위":"4%","학습포인트":"578","출결포인트":"60","전체포인트":"638","복권이벤트":"-","전국랭킹":"25","전국회원수":"2088","최종랭킹":"Master"},
      {"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"572","시간점수":"22.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"660.8","상위가점":"10","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"22","가감총점":"670.8","평균":"111.8","랭킹":"5","본부랭킹":"2","학습평균":"95.33","전국학습평균":"92.1","학습상위":"6%","시간평균":"3.8","전국시간평균":"3.75","시간상위":"38%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"111.8","전국총점평균":"109.8","총점상위":"5%","학습포인트":"572","출결포인트":"60","전체포인트":"632","복권이벤트":"-","전국랭킹":"35","전국회원수":"2088","최종랭킹":"Master"},
      {"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"565","시간점수":"20.8","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"649.8","상위가점":"10","하위감점":"0","상하위진도수":"0/18/4/0","총학습수":"22","가감총점":"659.8","평균":"109.97","랭킹":"6","본부랭킹":"1","학습평균":"94.17","전국학습평균":"92.1","학습상위":"7%","시간평균":"3.47","전국시간평균":"3.75","시간상위":"45%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"109.97","전국총점평균":"109.8","총점상위":"6%","학습포인트":"565","출결포인트":"60","전체포인트":"625","복권이벤트":"-","전국랭킹":"48","전국회원수":"2088","최종랭킹":""},
      {"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"558","시간점수":"18.9","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"642.9","상위가점":"0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"22","가감총점":"642.9","평균":"107.15","랭킹":"7","본부랭킹":"3","학습평균":"93.0","전국학습평균":"92.1","학습상위":"9%","시간평균":"3.15","전국시간평균":"3.75","시간상위":"52%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"107.15","전국총점평균":"109.8","총점상위":"7%","학습포인트":"558","출결포인트":"60","전체포인트":"618","복권이벤트":"-","전국랭킹":"68","전국회원수":"2088","최종랭킹":""},
      {"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"548","시간점수":"16.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"630.8","상위가점":"0","하위감점":"0","상하위진도수":"0/22/0/0","총학습수":"22","가감총점":"630.8","평균":"105.13","랭킹":"8","본부랭킹":"2","학습평균":"91.33","전국학습평균":"92.1","학습상위":"10%","시간평균":"2.8","전국시간평균":"3.75","시간상위":"62%","출결평균":"10","전국출결평균":"8.88","출결상위":"1%","총점평균":"105.13","전국총점평균":"109.8","총점상위":"9%","학습포인트":"548","출결포인트":"60","전체포인트":"608","복권이벤트":"-","전국랭킹":"95","전국회원수":"2088","최종랭킹":""},
      {"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"538","시간점수":"14.8","출결점수":"58","학습가산점":"3","리셋감점":"0","총점":"613.8","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"20","가감총점":"613.8","평균":"102.3","랭킹":"9","본부랭킹":"1","학습평균":"89.67","전국학습평균":"92.1","학습상위":"12%","시간평균":"2.47","전국시간평균":"3.75","시간상위":"70%","출결평균":"9.67","전국출결평균":"8.88","출결상위":"28%","총점평균":"102.3","전국총점평균":"109.8","총점상위":"12%","학습포인트":"438","출결포인트":"50","전체포인트":"488","복권이벤트":"-","전국랭킹":"145","전국회원수":"2088","최종랭킹":""},
      {"본부":"대교 경기본부","지점":"대교 안양만안 Hive","센터":"대교 안양만안 Hive 001팀","센터타입":"LC","교사명":"박동영","회원번호":"000S-3001001002","회원명":"한지호","생년월일":"2017-05-15","리그명":"-","조명":"-","학습점수":"465","시간점수":"10.2","출결점수":"52","학습가산점":"1","리셋감점":"0","총점":"528.2","상위가점":"0","하위감점":"-30","상하위진도수":"0/5/8/5","총학습수":"18","가감총점":"498.2","평균":"83.03","랭킹":"10","본부랭킹":"3","학습평균":"77.5","전국학습평균":"92.1","학습상위":"35%","시간평균":"1.7","전국시간평균":"3.75","시간상위":"85%","출결평균":"8.67","전국출결평균":"8.88","출결상위":"58%","총점평균":"83.03","전국총점평균":"109.8","총점상위":"38%","학습포인트":"365","출결포인트":"44","전체포인트":"409","복권이벤트":"-","전국랭킹":"1548","전국회원수":"2088","최종랭킹":"최하고정"}
    ]
  };

  LEAGUE_DATA['2023_winter'] = {
    label: '2023 윈터 리그오브매스',
    finalized: true,
    totalWeeks:6,
  weeks:{  "1":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"98.69","시간점수":"6.39","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"118.08","상위가점":"0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"5","가감총점":"118.08","평균":"23.62","랭킹":"1","본부랭킹":"0","학습평균":"92.02","전국학습평균":"91.5","학습상위":"1%","시간평균":"6.23","전국시간평균":"3.68","시간상위":"2%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"120.47","전국총점평균":"108.5","총점상위":"1%","학습포인트":"88.82","출결포인트":"12","전체포인트":"100.82","복권이벤트":"-","전국랭킹":"45","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"101.13","시간점수":"5.64","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"119.77","상위가점":"0","하위감점":"0","상하위진도수":"21/0/0/0","총학습수":"4","가감총점":"119.77","평균":"29.94","랭킹":"3","본부랭킹":"0","학습평균":"97.49","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.32","전국시간평균":"3.68","시간상위":"5%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"118.75","전국총점평균":"108.5","총점상위":"2%","학습포인트":"91.02","출결포인트":"12","전체포인트":"103.02","복권이벤트":"-","전국랭킹":"56","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"94.04","시간점수":"5.26","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"112.3","상위가점":"0","하위감점":"0","상하위진도수":"24/0/0/0","총학습수":"4","가감총점":"112.3","평균":"28.07","랭킹":"2","본부랭킹":"0","학습평균":"98.57","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.23","전국시간평균":"3.68","시간상위":"7%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"117.7","전국총점평균":"108.5","총점상위":"2%","학습포인트":"84.64","출결포인트":"12","전체포인트":"96.64","복권이벤트":"-","전국랭킹":"31","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"93.97","시간점수":"3.8","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"110.77","상위가점":"0","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"4","가감총점":"110.77","평균":"27.69","랭킹":"6","본부랭킹":"0","학습평균":"89.27","전국학습평균":"91.5","학습상위":"5%","시간평균":"4.14","전국시간평균":"3.68","시간상위":"28%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"112.37","전국총점평균":"108.5","총점상위":"4%","학습포인트":"84.57","출결포인트":"12","전체포인트":"96.57","복권이벤트":"-","전국랭킹":"71","전국회원수":"1952","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"97.4","시간점수":"3.83","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"114.23","상위가점":"0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"4","가감총점":"114.23","평균":"28.56","랭킹":"9","본부랭킹":"0","학습평균":"87.53","전국학습평균":"91.5","학습상위":"6%","시간평균":"3.68","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"111.03","전국총점평균":"108.5","총점상위":"5%","학습포인트":"87.66","출결포인트":"12","전체포인트":"99.66","복권이벤트":"-","전국랭킹":"18","전국회원수":"1952","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"96.48","시간점수":"3.04","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"112.52","상위가점":"0","하위감점":"0","상하위진도수":"0/17/5/0","총학습수":"4","가감총점":"112.52","평균":"28.13","랭킹":"10","본부랭킹":"0","학습평균":"89.98","전국학습평균":"91.5","학습상위":"7%","시간평균":"3.03","전국시간평균":"3.68","시간상위":"48%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"109.03","전국총점평균":"108.5","총점상위":"6%","학습포인트":"86.83","출결포인트":"12","전체포인트":"98.83","복권이벤트":"-","전국랭킹":"45","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"96.21","시간점수":"2.87","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"112.08","상위가점":"0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"4","가감총점":"112.08","평균":"28.02","랭킹":"10","본부랭킹":"0","학습평균":"92.76","전국학습평균":"91.5","학습상위":"10%","시간평균":"2.91","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"106.08","전국총점평균":"108.5","총점상위":"8%","학습포인트":"86.59","출결포인트":"12","전체포인트":"98.59","복권이벤트":"-","전국랭킹":"68","전국회원수":"1952","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"93.72","시간점수":"2.84","출결점수":"12","학습가산점":"1","리셋감점":"0","총점":"109.56","상위가점":"0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"4","가감총점":"109.56","평균":"27.39","랭킹":"6","본부랭킹":"0","학습평균":"86.36","전국학습평균":"91.5","학습상위":"11%","시간평균":"2.51","전국시간평균":"3.68","시간상위":"62%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"104.08","전국총점평균":"108.5","총점상위":"10%","학습포인트":"84.35","출결포인트":"12","전체포인트":"96.35","복권이벤트":"-","전국랭킹":"165","전국회원수":"1952","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"89.79","시간점수":"2.36","출결점수":"12","학습가산점":"0","리셋감점":"0","총점":"104.15","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"3","가감총점":"104.15","평균":"34.72","랭킹":"7","본부랭킹":"0","학습평균":"86.79","전국학습평균":"91.5","학습상위":"13%","시간평균":"2.39","전국시간평균":"3.68","시간상위":"72%","출결평균":"9.67","전국출결평균":"8.82","출결상위":"28%","총점평균":"100.87","전국총점평균":"108.5","총점상위":"12%","학습포인트":"80.81","출결포인트":"12","전체포인트":"92.81","복권이벤트":"-","전국랭킹":"185","전국회원수":"1952","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"82.04","시간점수":"1.9","출결점수":"11","학습가산점":"0","리셋감점":"0","총점":"94.94","상위가점":"0","하위감점":"0","상하위진도수":"0/7/9/4","총학습수":"3","가감총점":"94.94","평균":"31.65","랭킹":"8","본부랭킹":"0","학습평균":"74.36","전국학습평균":"91.5","학습상위":"25%","시간평균":"1.84","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.0","전국출결평균":"8.82","출결상위":"42%","총점평균":"87.97","전국총점평균":"108.5","총점상위":"25%","학습포인트":"73.84","출결포인트":"11","전체포인트":"84.84","복권이벤트":"-","전국랭킹":"485","전국회원수":"1952","최종랭킹":""}],
  "2":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"191.56","시간점수":"12.13","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"227.69","상위가점":"0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"11","가감총점":"227.69","평균":"20.7","랭킹":"3","본부랭킹":"0","학습평균":"96.45","전국학습평균":"91.5","학습상위":"1%","시간평균":"5.52","전국시간평균":"3.68","시간상위":"2%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"120.47","전국총점평균":"108.5","총점상위":"1%","학습포인트":"172.4","출결포인트":"22","전체포인트":"194.4","복권이벤트":"-","전국랭킹":"58","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"194.57","시간점수":"10.25","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"228.82","상위가점":"0","하위감점":"0","상하위진도수":"21/0/0/0","총학습수":"7","가감총점":"228.82","평균":"32.69","랭킹":"6","본부랭킹":"0","학습평균":"97.78","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.42","전국시간평균":"3.68","시간상위":"5%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"118.75","전국총점평균":"108.5","총점상위":"2%","학습포인트":"175.11","출결포인트":"22","전체포인트":"197.11","복권이벤트":"-","전국랭킹":"29","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"191.34","시간점수":"9.8","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"224.14","상위가점":"0","하위감점":"0","상하위진도수":"24/0/0/0","총학습수":"8","가감총점":"224.14","평균":"28.02","랭킹":"7","본부랭킹":"0","학습평균":"91.48","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.13","전국시간평균":"3.68","시간상위":"7%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"117.7","전국총점평균":"108.5","총점상위":"2%","학습포인트":"172.21","출결포인트":"22","전체포인트":"194.21","복권이벤트":"-","전국랭킹":"1","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"187.49","시간점수":"7.72","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"219.21","상위가점":"0","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"8","가감총점":"219.21","평균":"27.4","랭킹":"8","본부랭킹":"0","학습평균":"96.38","전국학습평균":"91.5","학습상위":"5%","시간평균":"4.01","전국시간평균":"3.68","시간상위":"28%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"112.37","전국총점평균":"108.5","총점상위":"4%","학습포인트":"168.74","출결포인트":"22","전체포인트":"190.74","복권이벤트":"-","전국랭킹":"94","전국회원수":"1952","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"192.69","시간점수":"6.74","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"223.43","상위가점":"0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"7","가감총점":"223.43","평균":"31.92","랭킹":"7","본부랭킹":"0","학습평균":"92.87","전국학습평균":"91.5","학습상위":"6%","시간평균":"3.42","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"111.03","전국총점평균":"108.5","총점상위":"5%","학습포인트":"173.42","출결포인트":"22","전체포인트":"195.42","복권이벤트":"-","전국랭킹":"13","전국회원수":"1952","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"183.89","시간점수":"6.28","출결점수":"22","학습가산점":"1","리셋감점":"0","총점":"213.17","상위가점":"0","하위감점":"0","상하위진도수":"0/17/5/0","총학습수":"7","가감총점":"213.17","평균":"30.45","랭킹":"9","본부랭킹":"0","학습평균":"94.45","전국학습평균":"91.5","학습상위":"7%","시간평균":"3.34","전국시간평균":"3.68","시간상위":"48%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"109.03","전국총점평균":"108.5","총점상위":"6%","학습포인트":"165.5","출결포인트":"22","전체포인트":"187.5","복권이벤트":"-","전국랭킹":"44","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"182.94","시간점수":"5.75","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"212.69","상위가점":"0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"7","가감총점":"212.69","평균":"30.38","랭킹":"5","본부랭킹":"0","학습평균":"91.56","전국학습평균":"91.5","학습상위":"10%","시간평균":"3.04","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"106.08","전국총점평균":"108.5","총점상위":"8%","학습포인트":"164.65","출결포인트":"22","전체포인트":"186.65","복권이벤트":"-","전국랭킹":"69","전국회원수":"1952","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"178.57","시간점수":"5.74","출결점수":"22","학습가산점":"2","리셋감점":"0","총점":"208.31","상위가점":"0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"7","가감총점":"208.31","평균":"29.76","랭킹":"8","본부랭킹":"0","학습평균":"84.37","전국학습평균":"91.5","학습상위":"11%","시간평균":"2.59","전국시간평균":"3.68","시간상위":"62%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"104.08","전국총점평균":"108.5","총점상위":"10%","학습포인트":"160.71","출결포인트":"22","전체포인트":"182.71","복권이벤트":"-","전국랭킹":"183","전국회원수":"1952","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"169.32","시간점수":"4.65","출결점수":"21","학습가산점":"1","리셋감점":"0","총점":"195.97","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"7","가감총점":"195.97","평균":"28.0","랭킹":"11","본부랭킹":"0","학습평균":"86.63","전국학습평균":"91.5","학습상위":"13%","시간평균":"2.41","전국시간평균":"3.68","시간상위":"72%","출결평균":"9.67","전국출결평균":"8.82","출결상위":"28%","총점평균":"100.87","전국총점평균":"108.5","총점상위":"12%","학습포인트":"152.39","출결포인트":"21","전체포인트":"173.39","복권이벤트":"-","전국랭킹":"227","전국회원수":"1952","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"163.05","시간점수":"4.04","출결점수":"20","학습가산점":"1","리셋감점":"0","총점":"188.09","상위가점":"0","하위감점":"0","상하위진도수":"0/7/9/4","총학습수":"7","가감총점":"188.09","평균":"26.87","랭킹":"13","본부랭킹":"0","학습평균":"75.24","전국학습평균":"91.5","학습상위":"25%","시간평균":"1.95","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.0","전국출결평균":"8.82","출결상위":"42%","총점평균":"87.97","전국총점평균":"108.5","총점상위":"25%","학습포인트":"146.75","출결포인트":"20","전체포인트":"166.75","복권이벤트":"-","전국랭킹":"433","전국회원수":"1952","최종랭킹":""}],
  "3":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"290.66","시간점수":"17.64","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"343.3","상위가점":"20.0","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"16","가감총점":"363.3","평균":"22.71","랭킹":"4","본부랭킹":"0","학습평균":"99.84","전국학습평균":"91.5","학습상위":"1%","시간평균":"6.25","전국시간평균":"3.68","시간상위":"2%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"120.47","전국총점평균":"108.5","총점상위":"1%","학습포인트":"261.59","출결포인트":"32","전체포인트":"293.59","복권이벤트":"-","전국랭킹":"1","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"288.77","시간점수":"16.04","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"339.81","상위가점":"20.0","하위감점":"0","상하위진도수":"21/0/0/0","총학습수":"10","가감총점":"359.81","평균":"35.98","랭킹":"1","본부랭킹":"0","학습평균":"97.23","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.08","전국시간평균":"3.68","시간상위":"5%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"118.75","전국총점평균":"108.5","총점상위":"2%","학습포인트":"259.89","출결포인트":"32","전체포인트":"291.89","복권이벤트":"-","전국랭킹":"38","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"306.47","시간점수":"14.52","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"354.99","상위가점":"20.0","하위감점":"0","상하위진도수":"24/0/0/0","총학습수":"12","가감총점":"374.99","평균":"31.25","랭킹":"3","본부랭킹":"0","학습평균":"91.76","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.53","전국시간평균":"3.68","시간상위":"7%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"117.7","전국총점평균":"108.5","총점상위":"2%","학습포인트":"275.82","출결포인트":"32","전체포인트":"307.82","복권이벤트":"-","전국랭킹":"17","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"288.96","시간점수":"11.55","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"335.51","상위가점":"10.0","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"12","가감총점":"345.51","평균":"28.79","랭킹":"7","본부랭킹":"0","학습평균":"95.31","전국학습평균":"91.5","학습상위":"5%","시간평균":"4.2","전국시간평균":"3.68","시간상위":"28%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"112.37","전국총점평균":"108.5","총점상위":"4%","학습포인트":"260.06","출결포인트":"32","전체포인트":"292.06","복권이벤트":"-","전국랭킹":"20","전국회원수":"1952","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"291.68","시간점수":"10.02","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"336.7","상위가점":"10.0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"10","가감총점":"346.7","평균":"34.67","랭킹":"3","본부랭킹":"0","학습평균":"89.58","전국학습평균":"91.5","학습상위":"6%","시간평균":"3.35","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"111.03","전국총점평균":"108.5","총점상위":"5%","학습포인트":"262.51","출결포인트":"32","전체포인트":"294.51","복권이벤트":"-","전국랭킹":"13","전국회원수":"1952","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"267.69","시간점수":"10.29","출결점수":"32","학습가산점":"2","리셋감점":"0","총점":"311.98","상위가점":"10.0","하위감점":"0","상하위진도수":"0/17/5/0","총학습수":"11","가감총점":"321.98","평균":"29.27","랭킹":"8","본부랭킹":"0","학습평균":"91.73","전국학습평균":"91.5","학습상위":"7%","시간평균":"3.29","전국시간평균":"3.68","시간상위":"48%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"109.03","전국총점평균":"108.5","총점상위":"6%","학습포인트":"240.92","출결포인트":"32","전체포인트":"272.92","복권이벤트":"-","전국랭킹":"61","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"273.67","시간점수":"9.3","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"317.97","상위가점":"0.0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"10","가감총점":"317.97","평균":"31.8","랭킹":"5","본부랭킹":"0","학습평균":"89.58","전국학습평균":"91.5","학습상위":"10%","시간평균":"3.06","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"106.08","전국총점평균":"108.5","총점상위":"8%","학습포인트":"246.3","출결포인트":"32","전체포인트":"278.3","복권이벤트":"-","전국랭킹":"133","전국회원수":"1952","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"264.97","시간점수":"7.81","출결점수":"32","학습가산점":"3","리셋감점":"0","총점":"307.78","상위가점":"0.0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"10","가감총점":"307.78","평균":"30.78","랭킹":"10","본부랭킹":"0","학습평균":"91.9","전국학습평균":"91.5","학습상위":"11%","시간평균":"2.54","전국시간평균":"3.68","시간상위":"62%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"104.08","전국총점평균":"108.5","총점상위":"10%","학습포인트":"238.47","출결포인트":"32","전체포인트":"270.47","복권이벤트":"-","전국랭킹":"108","전국회원수":"1952","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"260.41","시간점수":"7.01","출결점수":"30","학습가산점":"2","리셋감점":"0","총점":"299.42","상위가점":"0.0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"10","가감총점":"299.42","평균":"29.94","랭킹":"13","본부랭킹":"0","학습평균":"87.0","전국학습평균":"91.5","학습상위":"13%","시간평균":"2.36","전국시간평균":"3.68","시간상위":"72%","출결평균":"9.67","전국출결평균":"8.82","출결상위":"28%","총점평균":"100.87","전국총점평균":"108.5","총점상위":"12%","학습포인트":"234.37","출결포인트":"30","전체포인트":"264.37","복권이벤트":"-","전국랭킹":"241","전국회원수":"1952","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"235.44","시간점수":"5.7","출결점수":"28","학습가산점":"1","리셋감점":"0","총점":"270.14","상위가점":"0.0","하위감점":"0","상하위진도수":"0/7/9/4","총학습수":"10","가감총점":"270.14","평균":"27.01","랭킹":"14","본부랭킹":"0","학습평균":"74.06","전국학습평균":"91.5","학습상위":"25%","시간평균":"1.8","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.0","전국출결평균":"8.82","출결상위":"42%","총점평균":"87.97","전국총점평균":"108.5","총점상위":"25%","학습포인트":"211.9","출결포인트":"28","전체포인트":"239.9","복권이벤트":"-","전국랭킹":"425","전국회원수":"1952","최종랭킹":""}],
  "4":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"397.38","시간점수":"23.75","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"466.13","상위가점":"20.0","하위감점":"0.0","상하위진도수":"32/0/0/0","총학습수":"21","가감총점":"486.13","평균":"23.15","랭킹":"3","본부랭킹":"0","학습평균":"95.09","전국학습평균":"91.5","학습상위":"1%","시간평균":"6.2","전국시간평균":"3.68","시간상위":"2%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"120.47","전국총점평균":"108.5","총점상위":"1%","학습포인트":"357.64","출결포인트":"41","전체포인트":"398.64","복권이벤트":"-","전국랭킹":"1","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"404.85","시간점수":"20.5","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"470.35","상위가점":"20.0","하위감점":"0.0","상하위진도수":"21/0/0/0","총학습수":"14","가감총점":"490.35","평균":"35.02","랭킹":"5","본부랭킹":"0","학습평균":"97.86","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.16","전국시간평균":"3.68","시간상위":"5%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"118.75","전국총점평균":"108.5","총점상위":"2%","학습포인트":"364.37","출결포인트":"41","전체포인트":"405.37","복권이벤트":"-","전국랭킹":"1","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"411.15","시간점수":"21.0","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"476.15","상위가점":"20.0","하위감점":"0.0","상하위진도수":"24/0/0/0","총학습수":"16","가감총점":"496.15","평균":"31.01","랭킹":"7","본부랭킹":"0","학습평균":"97.55","전국학습평균":"91.5","학습상위":"2%","시간평균":"4.97","전국시간평균":"3.68","시간상위":"7%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"117.7","전국총점평균":"108.5","총점상위":"2%","학습포인트":"370.03","출결포인트":"41","전체포인트":"411.03","복권이벤트":"-","전국랭킹":"82","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"368.39","시간점수":"16.41","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"429.8","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/23/0/0","총학습수":"15","가감총점":"439.8","평균":"29.32","랭킹":"4","본부랭킹":"0","학습평균":"96.5","전국학습평균":"91.5","학습상위":"5%","시간평균":"4.09","전국시간평균":"3.68","시간상위":"28%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"112.37","전국총점평균":"108.5","총점상위":"4%","학습포인트":"331.55","출결포인트":"41","전체포인트":"372.55","복권이벤트":"-","전국랭킹":"91","전국회원수":"1952","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"360.84","시간점수":"15.11","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"420.95","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/21/0/0","총학습수":"14","가감총점":"430.95","평균":"30.78","랭킹":"5","본부랭킹":"0","학습평균":"87.7","전국학습평균":"91.5","학습상위":"6%","시간평균":"3.73","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"111.03","전국총점평균":"108.5","총점상위":"5%","학습포인트":"324.76","출결포인트":"41","전체포인트":"365.76","복권이벤트":"-","전국랭킹":"79","전국회원수":"1952","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"376.19","시간점수":"12.28","출결점수":"41","학습가산점":"3","리셋감점":"0","총점":"432.47","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/17/5/0","총학습수":"15","가감총점":"442.47","평균":"29.5","랭킹":"7","본부랭킹":"0","학습평균":"89.22","전국학습평균":"91.5","학습상위":"7%","시간평균":"3.29","전국시간평균":"3.68","시간상위":"48%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"109.03","전국총점평균":"108.5","총점상위":"6%","학습포인트":"338.57","출결포인트":"41","전체포인트":"379.57","복권이벤트":"-","전국랭킹":"90","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"370.46","시간점수":"11.78","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"427.24","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/21/0/0","총학습수":"14","가감총점":"427.24","평균":"30.52","랭킹":"7","본부랭킹":"0","학습평균":"85.59","전국학습평균":"91.5","학습상위":"10%","시간평균":"3.04","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"106.08","전국총점평균":"108.5","총점상위":"8%","학습포인트":"333.41","출결포인트":"41","전체포인트":"374.41","복권이벤트":"-","전국랭킹":"150","전국회원수":"1952","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"369.38","시간점수":"10.28","출결점수":"41","학습가산점":"4","리셋감점":"0","총점":"424.66","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/21/0/0","총학습수":"14","가감총점":"424.66","평균":"30.33","랭킹":"10","본부랭킹":"0","학습평균":"83.5","전국학습평균":"91.5","학습상위":"11%","시간평균":"2.83","전국시간평균":"3.68","시간상위":"62%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"104.08","전국총점평균":"108.5","총점상위":"10%","학습포인트":"332.44","출결포인트":"41","전체포인트":"373.44","복권이벤트":"-","전국랭킹":"82","전국회원수":"1952","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"344.31","시간점수":"9.19","출결점수":"40","학습가산점":"2","리셋감점":"0","총점":"395.5","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/10/10/0","총학습수":"13","가감총점":"395.5","평균":"30.42","랭킹":"10","본부랭킹":"0","학습평균":"82.84","전국학습평균":"91.5","학습상위":"13%","시간평균":"2.47","전국시간평균":"3.68","시간상위":"72%","출결평균":"9.67","전국출결평균":"8.82","출결상위":"28%","총점평균":"100.87","전국총점평균":"108.5","총점상위":"12%","학습포인트":"309.88","출결포인트":"40","전체포인트":"349.88","복권이벤트":"-","전국랭킹":"154","전국회원수":"1952","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"305.13","시간점수":"8.03","출결점수":"37","학습가산점":"1","리셋감점":"0","총점":"351.16","상위가점":"0.0","하위감점":"-20.0","상하위진도수":"0/7/9/4","총학습수":"13","가감총점":"331.16","평균":"25.47","랭킹":"13","본부랭킹":"0","학습평균":"78.85","전국학습평균":"91.5","학습상위":"25%","시간평균":"1.84","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.0","전국출결평균":"8.82","출결상위":"42%","총점평균":"87.97","전국총점평균":"108.5","총점상위":"25%","학습포인트":"274.62","출결포인트":"37","전체포인트":"311.62","복권이벤트":"-","전국랭킹":"489","전국회원수":"1952","최종랭킹":""}],
  "5":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"487.41","시간점수":"31.81","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"574.22","상위가점":"20.0","하위감점":"0.0","상하위진도수":"32/0/0/0","총학습수":"27","가감총점":"594.22","평균":"22.01","랭킹":"1","본부랭킹":"0","학습평균":"100.26","전국학습평균":"91.5","학습상위":"1%","시간평균":"6.04","전국시간평균":"3.68","시간상위":"2%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"120.47","전국총점평균":"108.5","총점상위":"1%","학습포인트":"438.67","출결포인트":"50","전체포인트":"488.67","복권이벤트":"-","전국랭킹":"5","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"475.36","시간점수":"27.94","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"558.3","상위가점":"20.0","하위감점":"0.0","상하위진도수":"21/0/0/0","총학습수":"18","가감총점":"578.3","평균":"32.13","랭킹":"1","본부랭킹":"0","학습평균":"93.13","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.45","전국시간평균":"3.68","시간상위":"5%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"118.75","전국총점평균":"108.5","총점상위":"2%","학습포인트":"427.82","출결포인트":"50","전체포인트":"477.82","복권이벤트":"-","전국랭킹":"1","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"469.34","시간점수":"25.76","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"548.1","상위가점":"20.0","하위감점":"0.0","상하위진도수":"24/0/0/0","총학습수":"20","가감총점":"568.1","평균":"28.41","랭킹":"4","본부랭킹":"0","학습평균":"93.24","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.51","전국시간평균":"3.68","시간상위":"7%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"117.7","전국총점평균":"108.5","총점상위":"2%","학습포인트":"422.41","출결포인트":"50","전체포인트":"472.41","복권이벤트":"-","전국랭킹":"87","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"470.07","시간점수":"19.82","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"544.89","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/23/0/0","총학습수":"19","가감총점":"554.89","평균":"29.2","랭킹":"2","본부랭킹":"0","학습평균":"89.94","전국학습평균":"91.5","학습상위":"5%","시간평균":"3.97","전국시간평균":"3.68","시간상위":"28%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"112.37","전국총점평균":"108.5","총점상위":"4%","학습포인트":"423.06","출결포인트":"50","전체포인트":"473.06","복권이벤트":"-","전국랭킹":"45","전국회원수":"1952","최종랭킹":""},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"464.05","시간점수":"18.38","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"537.43","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/21/0/0","총학습수":"18","가감총점":"547.43","평균":"30.41","랭킹":"6","본부랭킹":"0","학습평균":"92.7","전국학습평균":"91.5","학습상위":"6%","시간평균":"3.6","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"111.03","전국총점평균":"108.5","총점상위":"5%","학습포인트":"417.65","출결포인트":"50","전체포인트":"467.65","복권이벤트":"-","전국랭킹":"59","전국회원수":"1952","최종랭킹":""},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"479.39","시간점수":"15.64","출결점수":"50","학습가산점":"3","리셋감점":"0","총점":"548.03","상위가점":"10.0","하위감점":"0.0","상하위진도수":"0/17/5/0","총학습수":"18","가감총점":"558.03","평균":"31.0","랭킹":"8","본부랭킹":"0","학습평균":"93.29","전국학습평균":"91.5","학습상위":"7%","시간평균":"3.11","전국시간평균":"3.68","시간상위":"48%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"109.03","전국총점평균":"108.5","총점상위":"6%","학습포인트":"431.45","출결포인트":"50","전체포인트":"481.45","복권이벤트":"-","전국랭킹":"122","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"479.89","시간점수":"13.93","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"548.82","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/21/0/0","총학습수":"18","가감총점":"548.82","평균":"30.49","랭킹":"9","본부랭킹":"0","학습평균":"90.49","전국학습평균":"91.5","학습상위":"10%","시간평균":"3.09","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"106.08","전국총점평균":"108.5","총점상위":"8%","학습포인트":"431.9","출결포인트":"50","전체포인트":"481.9","복권이벤트":"-","전국랭킹":"96","전국회원수":"1952","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"429.52","시간점수":"13.07","출결점수":"50","학습가산점":"5","리셋감점":"0","총점":"497.59","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/21/0/0","총학습수":"18","가감총점":"497.59","평균":"27.64","랭킹":"12","본부랭킹":"0","학습평균":"86.5","전국학습평균":"91.5","학습상위":"11%","시간평균":"2.78","전국시간평균":"3.68","시간상위":"62%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"104.08","전국총점평균":"108.5","총점상위":"10%","학습포인트":"386.57","출결포인트":"50","전체포인트":"436.57","복권이벤트":"-","전국랭킹":"166","전국회원수":"1952","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"433.17","시간점수":"11.01","출결점수":"49","학습가산점":"2","리셋감점":"0","총점":"495.18","상위가점":"0.0","하위감점":"0.0","상하위진도수":"0/10/10/0","총학습수":"17","가감총점":"495.18","평균":"29.13","랭킹":"8","본부랭킹":"0","학습평균":"85.61","전국학습평균":"91.5","학습상위":"13%","시간평균":"2.15","전국시간평균":"3.68","시간상위":"72%","출결평균":"9.67","전국출결평균":"8.82","출결상위":"28%","총점평균":"100.87","전국총점평균":"108.5","총점상위":"12%","학습포인트":"389.85","출결포인트":"49","전체포인트":"438.85","복권이벤트":"-","전국랭킹":"188","전국회원수":"1952","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"419.88","시간점수":"9.9","출결점수":"45","학습가산점":"2","리셋감점":"0","총점":"476.78","상위가점":"0.0","하위감점":"-20.0","상하위진도수":"0/7/9/4","총학습수":"17","가감총점":"456.78","평균":"26.87","랭킹":"8","본부랭킹":"0","학습평균":"80.97","전국학습평균":"91.5","학습상위":"25%","시간평균":"2.04","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.0","전국출결평균":"8.82","출결상위":"42%","총점평균":"87.97","전국총점평균":"108.5","총점상위":"25%","학습포인트":"377.89","출결포인트":"45","전체포인트":"422.89","복권이벤트":"-","전국랭킹":"400","전국회원수":"1952","최종랭킹":""}],
  "6":[{"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"600","시간점수":"36.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"702.8","상위가점":"20","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"32","가감총점":"722.8","평균":"120.47","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"91.5","학습상위":"1%","시간평균":"6.13","전국시간평균":"3.68","시간상위":"2%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"120.47","전국총점평균":"108.5","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"1","전국회원수":"1952","최종랭킹":"Grand Master"},{"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"593","시간점수":"33.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"692.5","상위가점":"20","하위감점":"0","상하위진도수":"21/0/0/0","총학습수":"21","가감총점":"712.5","평균":"118.75","랭킹":"2","본부랭킹":"1","학습평균":"98.83","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.58","전국시간평균":"3.68","시간상위":"5%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"118.75","전국총점평균":"108.5","총점상위":"2%","학습포인트":"593","출결포인트":"60","전체포인트":"653","복권이벤트":"-","전국랭킹":"5","전국회원수":"1952","최종랭킹":"Grand Master"},{"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"590","시간점수":"32.2","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"686.2","상위가점":"20","하위감점":"0","상하위진도수":"24/0/0/0","총학습수":"24","가감총점":"706.2","평균":"117.7","랭킹":"3","본부랭킹":"2","학습평균":"98.33","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.37","전국시간평균":"3.68","시간상위":"7%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"117.7","전국총점평균":"108.5","총점상위":"2%","학습포인트":"590","출결포인트":"60","전체포인트":"650","복권이벤트":"-","전국랭킹":"7","전국회원수":"1952","최종랭킹":"Grand Master"},{"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"574","시간점수":"24.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"664.2","상위가점":"10","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"23","가감총점":"674.2","평균":"112.37","랭킹":"4","본부랭킹":"1","학습평균":"95.67","전국학습평균":"91.5","학습상위":"5%","시간평균":"4.03","전국시간평균":"3.68","시간상위":"28%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"112.37","전국총점평균":"108.5","총점상위":"4%","학습포인트":"574","출결포인트":"60","전체포인트":"634","복권이벤트":"-","전국랭킹":"28","전국회원수":"1952","최종랭킹":"Master"},{"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"568","시간점수":"22.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"656.2","상위가점":"10","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"21","가감총점":"666.2","평균":"111.03","랭킹":"5","본부랭킹":"2","학습평균":"94.67","전국학습평균":"91.5","학습상위":"6%","시간평균":"3.7","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"111.03","전국총점평균":"108.5","총점상위":"5%","학습포인트":"568","출결포인트":"60","전체포인트":"628","복권이벤트":"-","전국랭킹":"42","전국회원수":"1952","최종랭킹":"Master"},{"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"560","시간점수":"20.2","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"644.2","상위가점":"10","하위감점":"0","상하위진도수":"0/17/5/0","총학습수":"22","가감총점":"654.2","평균":"109.03","랭킹":"6","본부랭킹":"1","학습평균":"93.33","전국학습평균":"91.5","학습상위":"7%","시간평균":"3.37","전국시간평균":"3.68","시간상위":"48%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"109.03","전국총점평균":"108.5","총점상위":"6%","학습포인트":"560","출결포인트":"60","전체포인트":"620","복권이벤트":"-","전국랭킹":"55","전국회원수":"1952","최종랭킹":""},{"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"552","시간점수":"18.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"636.5","상위가점":"0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"21","가감총점":"636.5","평균":"106.08","랭킹":"7","본부랭킹":"4","학습평균":"92.0","전국학습평균":"91.5","학습상위":"10%","시간평균":"3.08","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"106.08","전국총점평균":"108.5","총점상위":"8%","학습포인트":"552","출결포인트":"60","전체포인트":"612","복권이벤트":"-","전국랭킹":"82","전국회원수":"1952","최종랭킹":""},{"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"542","시간점수":"16.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"624.5","상위가점":"0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"21","가감총점":"624.5","평균":"104.08","랭킹":"8","본부랭킹":"2","학습평균":"90.33","전국학습평균":"91.5","학습상위":"11%","시간평균":"2.75","전국시간평균":"3.68","시간상위":"62%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"104.08","전국총점평균":"108.5","총점상위":"10%","학습포인트":"542","출결포인트":"60","전체포인트":"602","복권이벤트":"-","전국랭킹":"112","전국회원수":"1952","최종랭킹":""},{"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"530","시간점수":"14.2","출결점수":"58","학습가산점":"3","리셋감점":"0","총점":"605.2","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"20","가감총점":"605.2","평균":"100.87","랭킹":"9","본부랭킹":"1","학습평균":"88.33","전국학습평균":"91.5","학습상위":"13%","시간평균":"2.37","전국시간평균":"3.68","시간상위":"72%","출결평균":"9.67","전국출결평균":"8.82","출결상위":"28%","총점평균":"100.87","전국총점평균":"108.5","총점상위":"12%","학습포인트":"430","출결포인트":"50","전체포인트":"480","복권이벤트":"-","전국랭킹":"165","전국회원수":"1952","최종랭킹":""},{"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"480","시간점수":"11.8","출결점수":"54","학습가산점":"2","리셋감점":"0","총점":"547.8","상위가점":"0","하위감점":"-20","상하위진도수":"0/7/9/4","총학습수":"20","가감총점":"527.8","평균":"87.97","랭킹":"10","본부랭킹":"2","학습평균":"80.0","전국학습평균":"91.5","학습상위":"25%","시간평균":"1.97","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.0","전국출결평균":"8.82","출결상위":"42%","총점평균":"87.97","전국총점평균":"108.5","총점상위":"25%","학습포인트":"380","출결포인트":"46","전체포인트":"426","복권이벤트":"-","전국랭킹":"425","전국회원수":"1952","최종랭킹":"최하고정"}]},
  data: [
      {"본부":"대교 호남본부","지점":"대교 광주상무 Hive","센터":"[YC]내방","센터타입":"YC","교사명":"정미정","회원번호":"000S-0054604127","회원명":"권도윤","생년월일":"2011-12-08","리그명":"-","조명":"-","학습점수":"600","시간점수":"36.8","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"702.8","상위가점":"20","하위감점":"0","상하위진도수":"32/0/0/0","총학습수":"32","가감총점":"722.8","평균":"120.47","랭킹":"1","본부랭킹":"1","학습평균":"100","전국학습평균":"91.5","학습상위":"1%","시간평균":"6.13","전국시간평균":"3.68","시간상위":"2%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"120.47","전국총점평균":"108.5","총점상위":"1%","학습포인트":"600","출결포인트":"60","전체포인트":"660","복권이벤트":"-","전국랭킹":"1","전국회원수":"1952","최종랭킹":"Grand Master"},
      {"본부":"대교 경산본부","지점":"대교 울산북구 Hive","센터":"[LC]블루마","센터타입":"LC","교사명":"김완기","회원번호":"000S-0054934909","회원명":"박시연","생년월일":"2015-05-08","리그명":"-","조명":"-","학습점수":"593","시간점수":"33.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"692.5","상위가점":"20","하위감점":"0","상하위진도수":"21/0/0/0","총학습수":"21","가감총점":"712.5","평균":"118.75","랭킹":"2","본부랭킹":"1","학습평균":"98.83","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.58","전국시간평균":"3.68","시간상위":"5%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"118.75","전국총점평균":"108.5","총점상위":"2%","학습포인트":"593","출결포인트":"60","전체포인트":"653","복권이벤트":"-","전국랭킹":"5","전국회원수":"1952","최종랭킹":"Grand Master"},
      {"본부":"대교 경산본부","지점":"대교 대구남부 Hive","센터":"[LC]중리","센터타입":"LC","교사명":"이주영","회원번호":"000S-0055902237","회원명":"이태근","생년월일":"2015-01-14","리그명":"-","조명":"-","학습점수":"590","시간점수":"32.2","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"686.2","상위가점":"20","하위감점":"0","상하위진도수":"24/0/0/0","총학습수":"24","가감총점":"706.2","평균":"117.7","랭킹":"3","본부랭킹":"2","학습평균":"98.33","전국학습평균":"91.5","학습상위":"2%","시간평균":"5.37","전국시간평균":"3.68","시간상위":"7%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"117.7","전국총점평균":"108.5","총점상위":"2%","학습포인트":"590","출결포인트":"60","전체포인트":"650","복권이벤트":"-","전국랭킹":"7","전국회원수":"1952","최종랭킹":"Grand Master"},
      {"본부":"대교 경인본부","지점":"대교 부천북부 Hive","센터":"[LC]오정","센터타입":"LC","교사명":"강희영","회원번호":"000S-0056089876","회원명":"조현우","생년월일":"2018-12-07","리그명":"-","조명":"-","학습점수":"574","시간점수":"24.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"664.2","상위가점":"10","하위감점":"0","상하위진도수":"0/23/0/0","총학습수":"23","가감총점":"674.2","평균":"112.37","랭킹":"4","본부랭킹":"1","학습평균":"95.67","전국학습평균":"91.5","학습상위":"5%","시간평균":"4.03","전국시간평균":"3.68","시간상위":"28%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"112.37","전국총점평균":"108.5","총점상위":"4%","학습포인트":"574","출결포인트":"60","전체포인트":"634","복권이벤트":"-","전국랭킹":"28","전국회원수":"1952","최종랭킹":"Master"},
      {"본부":"대교 호남본부","지점":"대교 광주북부 Hive","센터":"[LC]광주매곡","센터타입":"LC","교사명":"정한나","회원번호":"000S-0056238769","회원명":"홍지율","생년월일":"2018-12-11","리그명":"-","조명":"-","학습점수":"568","시간점수":"22.2","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"656.2","상위가점":"10","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"21","가감총점":"666.2","평균":"111.03","랭킹":"5","본부랭킹":"2","학습평균":"94.67","전국학습평균":"91.5","학습상위":"6%","시간평균":"3.7","전국시간평균":"3.68","시간상위":"40%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"111.03","전국총점평균":"108.5","총점상위":"5%","학습포인트":"568","출결포인트":"60","전체포인트":"628","복권이벤트":"-","전국랭킹":"42","전국회원수":"1952","최종랭킹":"Master"},
      {"본부":"대교 서울남동본부","지점":"대교 용인 Hive","센터":"대교 용인 Hive 001팀","센터타입":"LC","교사명":"유하나","회원번호":"000S-0055721039","회원명":"차민준","생년월일":"2018-03-27","리그명":"-","조명":"-","학습점수":"560","시간점수":"20.2","출결점수":"60","학습가산점":"4","리셋감점":"0","총점":"644.2","상위가점":"10","하위감점":"0","상하위진도수":"0/17/5/0","총학습수":"22","가감총점":"654.2","평균":"109.03","랭킹":"6","본부랭킹":"1","학습평균":"93.33","전국학습평균":"91.5","학습상위":"7%","시간평균":"3.37","전국시간평균":"3.68","시간상위":"48%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"109.03","전국총점평균":"108.5","총점상위":"6%","학습포인트":"560","출결포인트":"60","전체포인트":"620","복권이벤트":"-","전국랭킹":"55","전국회원수":"1952","최종랭킹":""},
      {"본부":"대교 경산본부","지점":"대교 구미서부 Hive","센터":"[LC]문성","센터타입":"LC","교사명":"최경애","회원번호":"000S-0056196111","회원명":"박시아","생년월일":"2019-08-19","리그명":"-","조명":"-","학습점수":"552","시간점수":"18.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"636.5","상위가점":"0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"21","가감총점":"636.5","평균":"106.08","랭킹":"7","본부랭킹":"4","학습평균":"92.0","전국학습평균":"91.5","학습상위":"10%","시간평균":"3.08","전국시간평균":"3.68","시간상위":"55%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"106.08","전국총점평균":"108.5","총점상위":"8%","학습포인트":"552","출결포인트":"60","전체포인트":"612","복권이벤트":"-","전국랭킹":"82","전국회원수":"1952","최종랭킹":""},
      {"본부":"대교 부경본부","지점":"대교 양산 Hive","센터":"[YC]양산 신대동","센터타입":"YC","교사명":"박은경","회원번호":"000S-0056128570","회원명":"현승빈","생년월일":"2018-07-16","리그명":"-","조명":"-","학습점수":"542","시간점수":"16.5","출결점수":"60","학습가산점":"6","리셋감점":"0","총점":"624.5","상위가점":"0","하위감점":"0","상하위진도수":"0/21/0/0","총학습수":"21","가감총점":"624.5","평균":"104.08","랭킹":"8","본부랭킹":"2","학습평균":"90.33","전국학습평균":"91.5","학습상위":"11%","시간평균":"2.75","전국시간평균":"3.68","시간상위":"62%","출결평균":"10","전국출결평균":"8.82","출결상위":"1%","총점평균":"104.08","전국총점평균":"108.5","총점상위":"10%","학습포인트":"542","출결포인트":"60","전체포인트":"602","복권이벤트":"-","전국랭킹":"112","전국회원수":"1952","최종랭킹":""},
      {"본부":"대교 서울서북본부","지점":"대교 은평 Hive","센터":"대교 은평 Hive 001팀","센터타입":"LC","교사명":"김지현","회원번호":"000S-2001001001","회원명":"이수민","생년월일":"2017-08-05","리그명":"-","조명":"-","학습점수":"530","시간점수":"14.2","출결점수":"58","학습가산점":"3","리셋감점":"0","총점":"605.2","상위가점":"0","하위감점":"0","상하위진도수":"0/10/10/0","총학습수":"20","가감총점":"605.2","평균":"100.87","랭킹":"9","본부랭킹":"1","학습평균":"88.33","전국학습평균":"91.5","학습상위":"13%","시간평균":"2.37","전국시간평균":"3.68","시간상위":"72%","출결평균":"9.67","전국출결평균":"8.82","출결상위":"28%","총점평균":"100.87","전국총점평균":"108.5","총점상위":"12%","학습포인트":"430","출결포인트":"50","전체포인트":"480","복권이벤트":"-","전국랭킹":"165","전국회원수":"1952","최종랭킹":""},
      {"본부":"대교 충청본부","지점":"대교 천안 Hive","센터":"[LC]천안신방","센터타입":"LC","교사명":"박대교","회원번호":"000S-3001001001","회원명":"유나연","생년월일":"2018-04-22","리그명":"-","조명":"-","학습점수":"480","시간점수":"11.8","출결점수":"54","학습가산점":"2","리셋감점":"0","총점":"547.8","상위가점":"0","하위감점":"-20","상하위진도수":"0/7/9/4","총학습수":"20","가감총점":"527.8","평균":"87.97","랭킹":"10","본부랭킹":"2","학습평균":"80.0","전국학습평균":"91.5","학습상위":"25%","시간평균":"1.97","전국시간평균":"3.68","시간상위":"80%","출결평균":"9.0","전국출결평균":"8.82","출결상위":"42%","총점평균":"87.97","전국총점평균":"108.5","총점상위":"25%","학습포인트":"380","출결포인트":"46","전체포인트":"426","복권이벤트":"-","전국랭킹":"425","전국회원수":"1952","최종랭킹":"최하고정"}
    ]
  };

  // ══════════════════════════════════════════════
  // 현재 리그 상태
  // ══════════════════════════════════════════════
  var PAGE_SIZE    = 10;
  var currentPage  = 1;
  var currentLeagueKey = '2026_winter';
  var currentWeek  = 'all';
  var currentLeagueData = LEAGUE_DATA[currentLeagueKey].data;
  var filteredData = currentLeagueData.slice();

  // 최종랭킹 상태 저장 (리그별)
  var rankStateAll = {};
  Object.keys(LEAGUE_DATA).forEach(function(key) {
    rankStateAll[key] = {};
    LEAGUE_DATA[key].data.forEach(function(r) {
      rankStateAll[key][r['회원번호']] = r['최종랭킹'] || '';
    });
  });
  var rankState = rankStateAll[currentLeagueKey];

  function loadResultData(){
    var sel = document.getElementById('result-league-select');
    if (!sel) return;
    currentLeagueKey = sel.value;
    currentWeek = 'all';

    // 주차 select 옵션 재생성
    var wsel = document.getElementById('result-week-select');
    if (wsel) {
      var tw = LEAGUE_DATA[currentLeagueKey].totalWeeks || 6;
      var opts = '<option value="all">전체 (최종)</option>';
      for (var w = 1; w <= tw; w++) {
        opts += '<option value="' + w + '">' + w + '주차</option>';
      }
      wsel.innerHTML = opts;
      wsel.value = 'all';
    }

    // 데이터 세팅
    currentLeagueData = LEAGUE_DATA[currentLeagueKey].data;
    rankState = rankStateAll[currentLeagueKey];
    filteredData = currentLeagueData.slice();
    currentPage = 1;

    // 검색 필드 초기화
    ['s-bonbu','s-jijum','s-center','s-teacher','s-memno','s-memname','s-natrank'].forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.value = '';
    });
    var ctypeEl = document.getElementById('s-ctype');
    if (ctypeEl) ctypeEl.value = '';

    // 최종 결과 발표 상태 배지
    var badge = document.getElementById('result-final-status');
    if (badge) {
      if (LEAGUE_DATA[currentLeagueKey].finalized) {
        badge.textContent = '최종 결과 발표 완료';
        badge.className   = 'badge badge-green';
      } else {
        badge.textContent = '최종 결과 발표 전 (수정 가능)';
        badge.className   = 'badge badge-orange';
      }
    }
    renderTable();
  }

  function loadWeekData(){
    var wsel = document.getElementById('result-week-select');
    if (!wsel) return;
    currentWeek = wsel.value;

    if (currentWeek === 'all') {
      currentLeagueData = LEAGUE_DATA[currentLeagueKey].data;
    } else {
      currentLeagueData = LEAGUE_DATA[currentLeagueKey].weeks[currentWeek] || LEAGUE_DATA[currentLeagueKey].data;
    }
    filteredData = currentLeagueData.slice();
    currentPage = 1;

    // 검색 필드 초기화
    ['s-bonbu','s-jijum','s-center','s-teacher','s-memno','s-memname','s-natrank'].forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.value = '';
    });
    var ctypeEl = document.getElementById('s-ctype');
    if (ctypeEl) ctypeEl.value = '';

    renderTable();
  }

        function doSearch(){
          var bonbu    = document.getElementById('s-bonbu').value.trim();
          var jijum    = document.getElementById('s-jijum').value.trim();
          var center   = document.getElementById('s-center').value.trim();
          var ctype    = document.getElementById('s-ctype').value;
          var teacher  = document.getElementById('s-teacher').value.trim();
          var memno    = document.getElementById('s-memno').value.trim();
          var memname  = document.getElementById('s-memname').value.trim();
          var natrank  = document.getElementById('s-natrank').value.trim();
          var grade    = document.getElementById('s-grade') ? document.getElementById('s-grade').value : '';
          var teamname = document.getElementById('s-teamname') ? document.getElementById('s-teamname').value.trim() : '';
          filteredData = currentLeagueData.filter(function(r){
            if(bonbu   && r['본부'].indexOf(bonbu)<0)   return false;
            if(jijum   && r['지점'].indexOf(jijum)<0)   return false;
            if(center  && r['센터'].indexOf(center)<0)  return false;
            if(ctype   && r['센터타입'] !== ctype)        return false;
            if(teacher && r['교사명'].indexOf(teacher)<0) return false;
            if(memno   && r['회원번호'].indexOf(memno)<0) return false;
            if(memname && r['회원명'].indexOf(memname)<0) return false;
            if(natrank && String(r['전국랭킹']) !== natrank) return false;
            if(grade) {
              var _rGrade = (r['리그명'] && r['리그명'] !== '-') ? r['리그명'].replace(/^[A-Z]\./, '') : (r['학년'] || '');
              if(_rGrade.indexOf(grade) < 0) return false;
            }
            if(teamname && (r['조명'] || '').indexOf(teamname) < 0) return false;
            return true;
          });
          currentPage = 1;
          renderTable();
        }

        function resetSearch(){
          ['s-bonbu','s-jijum','s-center','s-teacher','s-memno','s-memname','s-natrank','s-teamname'].forEach(function(id){
            var el = document.getElementById(id);
            if(el) el.value='';
          });
          document.getElementById('s-ctype').value='';
          var gradeEl = document.getElementById('s-grade');
          if(gradeEl) gradeEl.value='';
          filteredData = currentLeagueData.slice();
          currentPage=1;
          renderTable();
        }

        function renderTable(){
          var tbody = document.getElementById('result-tbody');
          tbody.innerHTML = '';
          var start = (currentPage-1)*PAGE_SIZE;
          var end   = Math.min(start+PAGE_SIZE, filteredData.length);
          var gmCnt=0, mCnt=0, bCnt=0;
          filteredData.forEach(function(r){ 
            var v=rankState[r['회원번호']]||'';
            if(v==='Grand Master') gmCnt++;
            else if(v==='Master') mCnt++;
            else if(v==='최하고정') bCnt++;
          });
          document.getElementById('result-total-count').textContent = filteredData.length.toLocaleString();
          document.getElementById('cnt-gm').textContent = gmCnt;
          document.getElementById('cnt-master').textContent = mCnt;
          document.getElementById('cnt-bottom').textContent = bCnt;

          window.__resultPageRows = filteredData;
          // Build per-week lookup for score columns
          var weekLookup = {};
          var lgData = LEAGUE_DATA[currentLeagueKey];
          if (lgData && lgData.weeks) {
            [1,2,3].forEach(function(w) {
              var wArr = lgData.weeks[String(w)] || [];
              wArr.forEach(function(wr) {
                var key = wr['회원번호'];
                if (!weekLookup[key]) weekLookup[key] = {};
                weekLookup[key][w] = wr;
              });
            });
          }
          for(var i=start;i<end;i++){
            var r=filteredData[i];
            var rv=rankState[r['회원번호']]||'';
            var cls='';
            if(rv==='Grand Master') cls='gm';
            else if(rv==='Master') cls='master';
            else if(rv==='최하고정') cls='bottom';
            var _gradeDisp = (r['리그명'] && r['리그명'] !== '-') ? r['리그명'].replace(/^[A-Z]\./, '') : (r['학년'] || '-');
            var _ridx = i;
            // Per-week scores
            var wk = weekLookup[r['회원번호']] || {};
            var w1 = wk[1] || r, w2 = wk[2] || {}, w3 = wk[3] || {};
            var _학습평균 = r['학습평균'] || '-';
            var _시간평균 = r['시간평균'] || '-';
            var _출결평균 = r['출결평균'] || '-';
            var _avg합계 = (r['총점평균'] || r['가감총점'] || '-');
            var _상위pct = r['학습상위'] || r['총점상위'] || '-';
            var _전국상위 = r['총점상위'] || '-';
            var tr=document.createElement('tr');
            tr.innerHTML=
              '<td>'+(i+1)+'</td>'+
              '<td class="td-left">'+r['본부']+'</td>'+
              '<td class="td-left">'+r['지점']+'</td>'+
              '<td class="td-left">'+r['센터']+'</td>'+
              '<td>'+r['센터타입']+'</td>'+
              '<td>'+r['교사명']+'</td>'+
              '<td>'+r['회원번호']+'</td>'+
              '<td><b style="cursor:pointer;color:#1976d2;text-decoration:underline;" onclick="openResultMemberDetail('+_ridx+');">'+r['회원명']+'</b></td>'+
              '<td>'+_gradeDisp+'</td>'+
              '<td>'+(r['조명']||'-')+'</td>'+
              '<td>'+(w1['학습점수']||'-')+'</td>'+
              '<td>'+(w1['시간점수']||'-')+'</td>'+
              '<td>'+(w1['출결점수']||'-')+'</td>'+
              '<td>'+(w2['학습점수']||'-')+'</td>'+
              '<td>'+(w2['시간점수']||'-')+'</td>'+
              '<td>'+(w2['출결점수']||'-')+'</td>'+
              '<td>'+(w3['학습점수']||'-')+'</td>'+
              '<td>'+(w3['시간점수']||'-')+'</td>'+
              '<td>'+(w3['출결점수']||'-')+'</td>'+
              '<td>'+_학습평균+'</td>'+
              '<td>'+_시간평균+'</td>'+
              '<td>'+_출결평균+'</td>'+
              '<td>'+_avg합계+'</td>'+
              '<td>'+_상위pct+'</td>'+
              '<td>-</td><td>-</td><td>-</td>'+
              '<td>-</td><td>-</td>'+
              '<td>'+_전국상위+'</td>'+
              '<td>'+(r['랭킹']||'-')+'</td>'+
              '<td>'+(r['출결포인트']||'-')+'</td>'+
              '<td>'+(r['학습포인트']||'-')+'</td>'+
              '<td>-</td>'+
              '<td><b>'+(r['전체포인트']||'-')+'</b></td>'+
              '<td><b>'+(r['전국랭킹']||'-')+'</b></td>'+
              '<td>'+(r['본부랭킹']||'-')+'</td>'+
              '<td>-</td><td>-</td>'+
              '<td><select class="final-rank-select '+cls+'" data-memno="'+r['회원번호']+'" onchange="onRankChange(this)">'+
                '<option value="">—</option>'+
                '<option value="Grand Master"'+(rv==='Grand Master'?' selected':'')+'>Grand Master</option>'+
                '<option value="Master"'+(rv==='Master'?' selected':'')+'>Master</option>'+
                '<option value="최하고정"'+(rv==='최하고정'?' selected':'')+'>최하고정</option>'+
              '</select></td>';
            tbody.appendChild(tr);
          }
          renderPaging();
        }

        function onRankChange(sel){
          var memno=sel.getAttribute('data-memno');
          var val=sel.value;
          rankState[memno]=val;
          sel.className='final-rank-select';
          if(val==='Grand Master') sel.className+=' gm';
          else if(val==='Master') sel.className+=' master';
          else if(val==='최하고정') sel.className+=' bottom';
          renderTable();
          // 현재 행 재강조
          sel.className='final-rank-select';
          if(val==='Grand Master') sel.className+=' gm';
          else if(val==='Master') sel.className+=' master';
          else if(val==='최하고정') sel.className+=' bottom';
        }

        function renderPaging(){
          var total=Math.ceil(filteredData.length/PAGE_SIZE);
          var pg=document.getElementById('result-paging');
          pg.innerHTML='';
          var prev=document.createElement('button');
          prev.textContent='◀';
          prev.disabled=(currentPage===1);
          prev.onclick=function(){if(currentPage>1){currentPage--;renderTable();}};
          pg.appendChild(prev);
          var startP=Math.max(1,currentPage-4), endP=Math.min(total,startP+9);
          for(var p=startP;p<=endP;p++){
            (function(pp){
              var btn=document.createElement('button');
              btn.textContent=pp;
              if(pp===currentPage) btn.className='active';
              btn.onclick=function(){currentPage=pp;renderTable();};
              pg.appendChild(btn);
            })(p);
          }
          var next=document.createElement('button');
          next.textContent='▶';
          next.disabled=(currentPage===total||total===0);
          next.onclick=function(){if(currentPage<total){currentPage++;renderTable();}};
          pg.appendChild(next);
          var info=document.createElement('span');
          info.style.cssText='font-size:12px;color:#888;margin-left:8px;';
          info.textContent=currentPage+' / '+total+' 페이지';
          pg.appendChild(info);
        }

        function saveAllFinalRank(){
          alert('최종랭킹이 저장되었습니다.');
        }

        function downloadExcel(){
          var lgData = LEAGUE_DATA[currentLeagueKey];
          var weekLookupDl = {};
          if (lgData && lgData.weeks) {
            [1,2,3].forEach(function(w) {
              (lgData.weeks[String(w)] || []).forEach(function(wr) {
                if (!weekLookupDl[wr['회원번호']]) weekLookupDl[wr['회원번호']] = {};
                weekLookupDl[wr['회원번호']][w] = wr;
              });
            });
          }
          var headers = ['본부','지점','센터','센터타입','교사명','회원번호','회원명','학년','조이름',
            '1주학습','1주시간','1주출결','2주학습','2주시간','2주출결','3주학습','3주시간','3주출결',
            '학습평균','시간평균','출결평균','평균합계','상위%','전국상위%','학년랭킹',
            '출석포인트','학습포인트','순위포인트','총포인트',
            '전국랭킹','학년랭킹','조내랭킹','조랭킹','최종랭킹'];
          var rows = [headers.join('	')];
          filteredData.forEach(function(r){
            var wk = weekLookupDl[r['회원번호']] || {};
            var w1=wk[1]||r, w2=wk[2]||{}, w3=wk[3]||{};
            var _grade = (r['리그명'] && r['리그명'] !== '-') ? r['리그명'].replace(/^[A-Z]\./, '') : (r['학년'] || '');
            var row = [
              r['본부']||'', r['지점']||'', r['센터']||'', r['센터타입']||'', r['교사명']||'',
              r['회원번호']||'', r['회원명']||'', _grade, r['조명']||'',
              w1['학습점수']||'', w1['시간점수']||'', w1['출결점수']||'',
              w2['학습점수']||'', w2['시간점수']||'', w2['출결점수']||'',
              w3['학습점수']||'', w3['시간점수']||'', w3['출결점수']||'',
              r['학습평균']||'', r['시간평균']||'', r['출결평균']||'',
              r['총점평균']||r['가감총점']||'', r['학습상위']||'', r['총점상위']||'', r['랭킹']||'',
              r['출결포인트']||'', r['학습포인트']||'', '', r['전체포인트']||'',
              r['전국랭킹']||'', r['본부랭킹']||'', '', '',
              rankState[r['회원번호']]||''
            ];
            rows.push(row.join('	'));
          });
          var blob = new Blob(['﻿'+rows.join('\n')], {type:'text/plain;charset=utf-8'});
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          var lgLabel = LEAGUE_DATA[currentLeagueKey] ? LEAGUE_DATA[currentLeagueKey].label : '결과관리';
          var wkLabel = (currentWeek === 'all') ? '전체' : currentWeek + '주차';
          a.download = '써밋리그_'+lgLabel+'_'+wkLabel+'_'+new Date().toISOString().slice(0,10)+'.xls';
          a.click();
        }


        function openResultMemberDetail(rowIdx) {
          var r = (window.__resultPageRows || [])[rowIdx];
          if (!r) return;
          var gradeDisp = (r['리그명'] && r['리그명'] !== '-') ? r['리그명'].replace(/^[A-Z]\./, '') : (r['학년'] || '—');
          var detail = {
            memberNo: r['회원번호'] || '—',
            name: r['회원명'] || '—',
            team: r['조명'] || '—',
            score: r['가감총점'] || r['총점'] || '—',
            rank: r['랭킹'] || '—',
            point: r['전체포인트'] || '—',
            message: '—',
            event: '—',
            grade: gradeDisp,
            weeks: [
              { w:1, study:0, time:0, attend:0, bonus:0, reset:0, total:0, points:0 }
            ],
            history: []
          };
          if (typeof openMemberDetail === 'function') openMemberDetail(detail);
        }

        // ── 전역 함수 노출 (HTML onclick에서 직접 호출) ──
        window.loadResultData    = loadResultData;
        window.loadWeekData      = loadWeekData;
        window.doSearch          = doSearch;
        window.resetSearch       = resetSearch;
        window.saveAllFinalRank  = saveAllFinalRank;
        window.downloadExcel     = downloadExcel;
        window.onRankChange      = onRankChange;
        window._renderTable      = renderTable;
        window.openResultMemberDetail = openResultMemberDetail;

        // 초기 렌더
        renderTable();
      })();
      </script>

        </div><!-- /result-tab-result-detail -->

        <!-- 탭: 본부별 완주율 -->
        <div id="result-tab-result-bonbu" style="display:none;">
          <style>
            #bonbu-table { width:100%; border-collapse:collapse; font-size:11px; white-space:nowrap; }
            #bonbu-table thead tr { background:#4a90b9; color:#fff; }
            #bonbu-table thead th { padding:10px 16px; text-align:center; font-weight:600; border:1px solid #3b7aa8; }
            #bonbu-table tbody tr:nth-child(even) { background:#f7fafe; }
            #bonbu-table tbody tr:hover { background:#e8f4fb; }
            #bonbu-table tbody td { padding:9px 16px; text-align:center; border:1px solid #e5ecf2; }
            #bonbu-table tbody td.td-left { text-align:left; font-weight:500; color:#2c5f7a; }
            #bonbu-table tfoot tr { background:#e8f4fb; }
            #bonbu-table tfoot td { padding:10px 16px; border:1px solid #ccd9e5; font-weight:700; color:#2c5f7a; text-align:center; }
            .rate-bar-wrap { display:flex; align-items:center; gap:8px; padding:0 11px; }
            .rate-bar-track { flex:1; height:12px; border-radius:6px; background:#e5ecf2; position:relative; max-width:627px; }
            .rate-bar-fill { height:12px; border-radius:6px; background:#4a90b9; }
          </style>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="background:#faa523; color:#fff; font-size:12px; font-weight:700; padding:4px 14px; border-radius:14px; display:inline-block;">총 9개 본부</div>
            <button class="btn btn-gray btn-sm" style="border:1px solid #ccd1d9; color:#333340;" onclick="downloadBonbuExcel()">📥 엑셀 다운로드</button>
          </div>

          <div class="card" style="padding:0; overflow:hidden;">
            <table id="bonbu-table">
              <thead>
                <tr>
                  <th style="width:44px;">No</th>
                  <th style="min-width:280px;">본부</th>
                  <th style="width:140px;">총회원수</th>
                  <th style="width:140px;">완주회원수</th>
                  <th style="width:120px;">완주율</th>
                  <th>완주율 현황</th>
                </tr>
              </thead>
              <tbody id="bonbu-tbody"></tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="text-align:left; padding-left:9px;">전체 합계</td>
                  <td id="bonbu-total-members">-</td>
                  <td id="bonbu-total-complete">-</td>
                  <td id="bonbu-total-rate">-</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <script>
          (function(){
            var BONBU_DATA = [
              { bonbu:'대교 경기본부',   total:4926, complete:4500 },
              { bonbu:'대교 경산본부',   total:6654, complete:6184 },
              { bonbu:'대교 경인본부',   total:5444, complete:4967 },
              { bonbu:'대교 부경본부',   total:6556, complete:6036 },
              { bonbu:'대교 서울강원본부', total:3892, complete:3527 },
              { bonbu:'대교 서울남동본부', total:2223, complete:2031 },
              { bonbu:'대교 서울서북본부', total:4514, complete:4143 },
              { bonbu:'대교 충청본부',   total:5427, complete:4911 },
              { bonbu:'대교 호남본부',   total:3791, complete:3453 },
            ];

            function renderBonbu(){
              var tbody = document.getElementById('bonbu-tbody');
              tbody.innerHTML = '';
              var totalM=0, totalC=0;
              BONBU_DATA.forEach(function(d, i){
                var rate = (d.complete / d.total * 100).toFixed(2);
                totalM += d.total; totalC += d.complete;
                var rateNum = parseFloat(rate);
                var fillPct = Math.min(100, rateNum);
                var tr = document.createElement('tr');
                tr.innerHTML =
                  '<td>'+(i+1)+'</td>'+
                  '<td class="td-left">'+d.bonbu+'</td>'+
                  '<td>'+d.total.toLocaleString()+'</td>'+
                  '<td>'+d.complete.toLocaleString()+'</td>'+
                  '<td>'+rate+'%</td>'+
                  '<td><div class="rate-bar-wrap"><div class="rate-bar-track"><div class="rate-bar-fill" style="width:'+fillPct+'%;"></div></div><span style="font-size:11px;font-weight:600;color:#333340;min-width:46px;">'+rate+'%</span></div></td>';
                tbody.appendChild(tr);
              });
              var totalRate = (totalC/totalM*100).toFixed(2);
              document.getElementById('bonbu-total-members').textContent = totalM.toLocaleString();
              document.getElementById('bonbu-total-complete').textContent = totalC.toLocaleString();
              document.getElementById('bonbu-total-rate').innerHTML = '<b style="color:#2c5f7a;">'+totalRate+'%</b>';
            }

            function downloadBonbuExcel(){
              var rows = [['No','본부','총회원수','완주회원수','완주율']];
              BONBU_DATA.forEach(function(d,i){
                var rate = (d.complete/d.total*100).toFixed(2)+'%';
                rows.push([i+1, d.bonbu, d.total, d.complete, rate]);
              });
              var blob = new Blob(['﻿'+rows.map(function(r){return r.join('	');}).join('\n')], {type:'text/plain;charset=utf-8'});
              var a = document.createElement('a'); a.href=URL.createObjectURL(blob);
              a.download='본부별완주율_'+new Date().toISOString().slice(0,10)+'.xls'; a.click();
            }

            window.downloadBonbuExcel = downloadBonbuExcel;
            renderBonbu();
          })();
          </script>
        </div><!-- /result-tab-result-bonbu -->

        <!-- 탭: 탈락자 관리 -->
        <div id="result-tab-result-dropout" style="display:none;">
          <style>
            #dropout-table { width:100%; border-collapse:collapse; font-size:10.5px; white-space:nowrap; }
            #dropout-table thead tr { background:#4a90b9; color:#fff; }
            #dropout-table thead th { padding:9px 6px; text-align:center; font-weight:600; border:1px solid #3b7aa8; }
            #dropout-table tbody tr:nth-child(even) { background:#f7fafe; }
            #dropout-table tbody tr:hover { background:#e8f4fb; }
            #dropout-table tbody tr.rescued { background:#f0fff4 !important; opacity:.7; }
            #dropout-table tbody td { padding:8px 5px; text-align:center; border:1px solid #e5ecf2; vertical-align:middle; color:#333340; }
            #dropout-table tbody td.td-left { text-align:left; }
            .dropout-paging { display:flex; gap:4px; align-items:center; justify-content:center; margin-top:14px; }
            .dropout-paging button {
              min-width:30px; height:30px; border:1px solid #dde3ea; border-radius:4px;
              background:#fff; cursor:pointer; font-size:12px; color:#555; transition:all .15s;
            }
            .dropout-paging button.active { background:#4a90b8; color:#fff; border-color:#4a90b8; font-weight:700; }
            .dropout-paging button:hover:not(.active) { background:#e8f4fb; }
            .btn-rescue {
              background:#4a90b9; color:#fff; border:none; border-radius:4px;
              padding:4px 0; width:70px; font-size:10px; font-weight:600; cursor:pointer;
              transition:background .15s; display:block; margin:0 auto;
            }
            .btn-rescue:hover { background:#357fa0; }
            .btn-rescue:disabled { background:#b0c4d4; cursor:default; }
          </style>

          <!-- 검색 (Figma: 단일 행 컴팩트 바) -->
          <div style="background:#f7f9fb; border:1px solid #dde5ee; border-radius:8px; height:44px; display:flex; align-items:center; gap:0; padding:0; margin-bottom:12px; overflow:hidden;">
            <div style="flex:1; position:relative; margin:0 0 0 11px;">
              <input class="form-input" id="do-keyword"
                style="width:100%; border:1px solid #ccd1d9; border-radius:4px; height:28px; padding:0 10px 0 30px; font-size:11px; box-sizing:border-box; background:#fff; color:#a6a6b2;"
                placeholder="본부, 지점, 센터, 교사명, 회원명 등으로 검색"
                oninput="doDropoutSearch()"
                onkeydown="if(event.key==='Enter') doDropoutSearch()">
              <span style="position:absolute; left:9px; top:50%; transform:translateY(-50%); font-size:12px; color:#a6a6b2; pointer-events:none;">🔍</span>
            </div>
            <button style="background:#4a90b9; color:#fff; border:none; border-radius:4px; height:28px; padding:0 24px; font-size:12px; font-weight:600; cursor:pointer; margin:0 8px 0 8px; white-space:nowrap;" onclick="doDropoutSearch()">검색</button>
            <!-- 보기 모드 토글 -->
            <div style="display:flex; border:1px solid #2c5f7a; border-radius:6px; overflow:hidden; margin-right:11px; height:30px;">
              <button id="btn-view-dropout"
                style="padding:0 14px; font-size:11px; font-weight:600; background:#2c5f7a; color:#fff; border:none; cursor:pointer; white-space:nowrap;"
                onclick="setDropoutView('dropout')">🚫 탈락자 목록</button>
              <button id="btn-view-rescued"
                style="padding:0 14px; font-size:11px; font-weight:600; background:#fff; color:#2c5f7a; border:none; cursor:pointer; white-space:nowrap;"
                onclick="setDropoutView('rescued')">✅ 구제 완료 목록</button>
            </div>
          </div>

          <!-- 건수 -->
          <div style="margin-bottom:10px;">
            <span id="dropout-count-badge" style="background:#faa523; color:#fff; font-size:12px; font-weight:700; padding:4px 14px; border-radius:13px; display:inline-block;">
              총 <span id="dropout-count">0</span>건
            </span>
          </div>

          <!-- 테이블 -->
          <div class="card" style="padding:0; overflow:hidden;">
            <div style="overflow-x:auto;">
              <table id="dropout-table">
                <thead>
                  <tr>
                    <th style="min-width:36px;">No</th>
                    <th>분부</th>
                    <th>지점</th>
                    <th>센터</th>
                    <th>교사시번</th>
                    <th>교사명</th>
                    <th>회원번호</th>
                    <th>회원명</th>
                    <th>학년</th>
                    <th>레벨</th>
                    <th>과정</th>
                    <th>제품</th>
                    <th>참여여부</th>
                    <th>리그명</th>
                    <th>조명</th>
                    <th>비고</th>
                    <th id="dropout-last-th" style="min-width:90px;">구제하기</th>
                  </tr>
                </thead>
                <tbody id="dropout-tbody"></tbody>
              </table>
            </div>
            <div class="dropout-paging" id="dropout-paging"></div>
            <div style="height:12px;"></div>
          </div>

          <script>
          (function(){
            var DROPOUT_RAW = [
              {bonbu:'대교 서울북부본부', jijum:'대교 부산남부 Hive',   center:'[LC]해운대',      teacherNo:'0032289731', teacher:'류대교', memNo:'0055987534', name:'박서준', grade:'초4', lv:'Lv5', course:'초4-1 탐색과정',  product:'SDM', join:'N', league:'B.초5', team:'06조', note:'휴회(1)'},
              {bonbu:'대교 충남본부',     jijum:'대교 수원남부 Hive',   center:'[대]아라',        teacherNo:'0032048569', teacher:'최대교', memNo:'0055921135', name:'박서준', grade:'초3', lv:'Lv2', course:'초2-2 확기과정',  product:'EDM', join:'N', league:'B.초5', team:'03조', note:'과정변경(1)'},
              {bonbu:'대교 충남본부',     jijum:'대교 부산남부 Hive',   center:'[LC]도담',        teacherNo:'0032699374', teacher:'강대교', memNo:'0055371549', name:'배지유', grade:'초4', lv:'Lv5', course:'초1-2 확기과정',  product:'PDM', join:'Y', league:'B.초4', team:'10조', note:'학년바뀜(1)'},
              {bonbu:'대교 충남본부',     jijum:'대교 세종 Hive',       center:'[LC]권선',        teacherNo:'0032731409', teacher:'이대교', memNo:'0055472486', name:'문지호', grade:'초2', lv:'Lv2', course:'초2-2 확기과정',  product:'SDM', join:'N', league:'B.초1', team:'05조', note:'퇴회(1)'},
              {bonbu:'대교 충남본부',     jijum:'대교 제주북부 Hive',   center:'[대]강남',        teacherNo:'0032043341', teacher:'강대교', memNo:'0055371693', name:'최수아', grade:'초6', lv:'Lv5', course:'초1-2 확기과정',  product:'PDM', join:'Y', league:'B.초5', team:'01조', note:'전출(1)'},
              {bonbu:'대교 서울남부본부', jijum:'대교 세종 Hive',       center:'[대]세종',        teacherNo:'0032853277', teacher:'임대교', memNo:'0055062767', name:'심예림', grade:'초3', lv:'Lv2', course:'초3-2 확기과정',  product:'PDM', join:'Y', league:'A.초3', team:'07조', note:'학년바뀜(2)'},
              {bonbu:'대교 부산본부',     jijum:'대교 수원남부 Hive',   center:'[LC]노원',        teacherNo:'0032752382', teacher:'송대교', memNo:'0055030855', name:'손준혁', grade:'초4', lv:'Lv1', course:'초2-1 탐색과정',  product:'SDM', join:'Y', league:'B.초6', team:'06조', note:'과정변경(1)'},
              {bonbu:'대교 경기본부',     jijum:'대교 부산남부 Hive',   center:'[대]창원',        teacherNo:'0032871604', teacher:'신대교', memNo:'0055438197', name:'홍서우', grade:'초1', lv:'Lv3', course:'초1-2 확기과정',  product:'EDM', join:'N', league:'B.초4', team:'06조', note:'퇴회(1)'},
              {bonbu:'대교 중장본부',     jijum:'대교 부산남부 Hive',   center:'[대]강남',        teacherNo:'0032210666', teacher:'조대교', memNo:'0055586836', name:'고은채', grade:'초3', lv:'Lv5', course:'초3-1 탐색과정',  product:'SDM', join:'Y', league:'B.초6', team:'01조', note:'퇴회(2)'},
              {bonbu:'대교 서울북부본부', jijum:'대교 창원 Hive',       center:'[LC]해운대',      teacherNo:'0032847150', teacher:'한대교', memNo:'0055852237', name:'허도현', grade:'초2', lv:'Lv4', course:'초3-2 확기과정',  product:'EDM', join:'Y', league:'B.초1', team:'06조', note:'전출(1)'},
              {bonbu:'대교 경기본부',     jijum:'대교 경기평택 Hive',   center:'[HI]비전',        teacherNo:'0032471920', teacher:'김소미', memNo:'0055918887', name:'진시우', grade:'초1', lv:'Lv4', course:'초1-2 확기과정',  product:'SDM', join:'Y', league:'B.초1', team:'01조', note:'퇴회(1)'},
              {bonbu:'대교 경산본부',     jijum:'대교 울산북구 Hive',   center:'[LC]블루마',      teacherNo:'0032392811', teacher:'김완기', memNo:'0056203858', name:'유지안', grade:'초1', lv:'Lv3', course:'초1-1 탐색과정',  product:'PDM', join:'Y', league:'B.초1', team:'01조', note:'과정변경(1)'},
              {bonbu:'대교 호남본부',     jijum:'대교 광주북부 Hive',   center:'[LC]광주매곡',    teacherNo:'0032718465', teacher:'정한나', memNo:'0056238769', name:'홍지율', grade:'초1', lv:'Lv2', course:'초1-2 확기과정',  product:'SDM', join:'N', league:'B.초1', team:'01조', note:'학년바뀜(1)'},
              {bonbu:'대교 호남본부',     jijum:'대교 광주북부 Hive',   center:'[LC]광주매곡',    teacherNo:'0032718465', teacher:'정한나', memNo:'0056215512', name:'강용호', grade:'초1', lv:'Lv2', course:'초1-2 확기과정',  product:'SDM', join:'N', league:'B.초1', team:'01조', note:'퇴회(1)'},
              {bonbu:'대교 경산본부',     jijum:'대교 구미서부 Hive',   center:'[LC]문성',        teacherNo:'0032584920', teacher:'최경애', memNo:'0056196111', name:'박시아', grade:'초1', lv:'Lv3', course:'초1-1 탐색과정',  product:'EDM', join:'Y', league:'B.초1', team:'01조', note:'전출(1)'},
              {bonbu:'대교 경인본부',     jijum:'대교 부천북부 Hive',   center:'[LC]오정',        teacherNo:'0032649012', teacher:'강희영', memNo:'0056089876', name:'조현우', grade:'초1', lv:'Lv4', course:'초1-2 확기과정',  product:'PDM', join:'N', league:'B.초1', team:'01조', note:'휴회(2)'},
              {bonbu:'대교 경인본부',     jijum:'대교 김포한강 Hive',   center:'[LC]북변',        teacherNo:'0032710384', teacher:'유영선', memNo:'0056237070', name:'선시우', grade:'초1', lv:'Lv2', course:'초1-1 탐색과정',  product:'SDM', join:'Y', league:'B.초1', team:'01조', note:'과정변경(1)'},
              {bonbu:'대교 부경본부',     jijum:'대교 양산 Hive',       center:'[YC]양산 신대동', teacherNo:'0032820374', teacher:'박은경', memNo:'0056128570', name:'현승빈', grade:'초1', lv:'Lv3', course:'초1-2 확기과정',  product:'EDM', join:'N', league:'B.초1', team:'01조', note:'퇴회(1)'},
              {bonbu:'대교 부경본부',     jijum:'대교 거제 Hive',       center:'[YC]국산',        teacherNo:'0032619284', teacher:'박수정', memNo:'0056157436', name:'정하진', grade:'초1', lv:'Lv2', course:'초1-2 확기과정',  product:'PDM', join:'Y', league:'B.초1', team:'01조', note:'학년바뀜(1)'},
              {bonbu:'대교 서울강원본부', jijum:'성동광진 교육국',      center:'[YC]중곡',        teacherNo:'0032502837', teacher:'이민경', memNo:'0056050651', name:'길민호', grade:'초1', lv:'Lv2', course:'초1-1 탐색과정',  product:'SDM', join:'N', league:'B.초1', team:'01조', note:'전출(2)'},
              {bonbu:'대교 부경본부',     jijum:'대교 부산강서 Hive',   center:'[LC]을숙도',      teacherNo:'0032748291', teacher:'유경아', memNo:'0056184710', name:'임채윤', grade:'초1', lv:'Lv3', course:'초1-2 확기과정',  product:'EDM', join:'Y', league:'B.초1', team:'01조', note:'퇴회(2)'},
              {bonbu:'대교 경산본부',     jijum:'대교 대구남부 Hive',   center:'[LC]중리',        teacherNo:'0032601847', teacher:'문인숙', memNo:'0056063042', name:'권시완', grade:'초1', lv:'Lv2', course:'초1-1 탐색과정',  product:'PDM', join:'N', league:'B.초1', team:'01조', note:'과정변경(2)'},
              {bonbu:'대교 경산본부',     jijum:'대교 동대구 Hive',     center:'[YC]대산',        teacherNo:'0032749021', teacher:'윤희순', memNo:'0056161782', name:'김하민', grade:'초1', lv:'Lv3', course:'초1-2 확기과정',  product:'SDM', join:'Y', league:'B.초1', team:'01조', note:'퇴회(1)'},
            ];

            var rescuedSet  = {};
            var rescuedList = [];          // 구제된 원본 레코드 목록
            var viewMode    = 'dropout';   // 'dropout' | 'rescued'
            var PAGE_SIZE   = 20;
            var curPage     = 1;
            var filteredData = [];

            function buildFiltered(){
              var kw = (document.getElementById('do-keyword').value||'').trim().toLowerCase();
              if (viewMode === 'rescued') {
                // 구제 완료 목록: rescuedList에 있는 레코드만
                filteredData = rescuedList.filter(function(r){
                  if(!kw) return true;
                  return (r.bonbu+r.jijum+r.center+r.teacher+r.name+r.memNo).toLowerCase().indexOf(kw)>=0;
                });
              } else {
                // 탈락자 목록: 구제되지 않은 레코드만
                filteredData = DROPOUT_RAW.filter(function(r){
                  if(rescuedSet[r.memNo]) return false;
                  if(!kw) return true;
                  return (r.bonbu+r.jijum+r.center+r.teacher+r.name+r.memNo).toLowerCase().indexOf(kw)>=0;
                });
              }
            }

            function doDropoutSearch(){ curPage=1; buildFiltered(); renderDropout(); }
            window.doDropoutSearch = doDropoutSearch;

            function setDropoutView(mode){
              viewMode = mode;
              curPage  = 1;
              // 토글 버튼 스타일
              var btnDropout = document.getElementById('btn-view-dropout');
              var btnRescued = document.getElementById('btn-view-rescued');
              if(btnDropout && btnRescued){
                if(mode === 'dropout'){
                  btnDropout.style.background = '#2c5f7a'; btnDropout.style.color = '#fff';
                  btnRescued.style.background = '#fff';    btnRescued.style.color = '#2c5f7a';
                } else {
                  btnRescued.style.background = '#27ae60'; btnRescued.style.color = '#fff';
                  btnDropout.style.background = '#fff';    btnDropout.style.color = '#2c5f7a';
                }
              }
              // 키워드 초기화
              var kw = document.getElementById('do-keyword');
              if(kw) kw.value = '';
              buildFiltered();
              renderDropout();
            }
            window.setDropoutView = setDropoutView;

            function rescueMember(memNo, btn){
              if(!confirm('해당 회원을 구제하시겠습니까?\n구제 후 탈락자 리스트에서 제외됩니다.')) return;
              rescuedSet[memNo] = true;
              // 구제된 레코드를 rescuedList에 추가
              var record = DROPOUT_RAW.filter(function(r){ return r.memNo === memNo; })[0];
              if(record && !rescuedList.some(function(r){ return r.memNo === memNo; })){
                record._rescuedAt = new Date().toLocaleString('ko-KR');
                rescuedList.push(record);
              }
              buildFiltered();
              // 페이지 범위 초과 시 조정
              var totalPages = Math.max(1, Math.ceil(filteredData.length/PAGE_SIZE));
              if(curPage > totalPages) curPage = totalPages;
              renderDropout();
            }
            window.rescueMember = rescueMember;

            function renderDropout(){
              buildFiltered();
              var tbody = document.getElementById('dropout-tbody');
              tbody.innerHTML = '';
              // 마지막 헤더 컬럼 동적 변경
              var lastTh = document.getElementById('dropout-last-th');
              if(lastTh) {
                lastTh.textContent = (viewMode === 'rescued') ? '구제일시' : '구제하기';
              }
              var countEl = document.getElementById('dropout-count');
              if(countEl) {
                countEl.textContent = filteredData.length.toLocaleString();
                var badge = document.getElementById('dropout-count-badge');
                if(badge) badge.style.background = (viewMode === 'rescued') ? '#27ae60' : '#faa523';
              }

              var start=(curPage-1)*PAGE_SIZE, end=Math.min(start+PAGE_SIZE, filteredData.length);
              for(var i=start;i<end;i++){
                var r=filteredData[i];
                var globalNo = start+i-start+1; // 현재 페이지 기준 no
                var tr=document.createElement('tr');
                var lastCol = (viewMode === 'rescued')
                  ? '<td style="color:#27ae60; font-size:12px; white-space:nowrap;">' + (r._rescuedAt||'–') + '</td>'
                  : '<td><button class="btn-rescue" data-memno="'+r.memNo+'" onclick="rescueMember(this.getAttribute(\'data-memno\'), this)">구제하기</button></td>';
                tr.innerHTML=
                  '<td>'+(start+i-start+1)+'</td>'+
                  '<td class="td-left">'+r.bonbu+'</td>'+
                  '<td class="td-left">'+r.jijum+'</td>'+
                  '<td class="td-left">'+r.center+'</td>'+
                  '<td>'+r.teacherNo+'</td>'+
                  '<td>'+r.teacher+'</td>'+
                  '<td>'+r.memNo+'</td>'+
                  '<td><b>'+r.name+'</b></td>'+
                  '<td>'+r.grade+'</td>'+
                  '<td>'+r.lv+'</td>'+
                  '<td class="td-left">'+r.course+'</td>'+
                  '<td>'+r.product+'</td>'+
                  '<td>'+r.join+'</td>'+
                  '<td>'+r.league+'</td>'+
                  '<td>'+r.team+'</td>'+
                  '<td class="td-left" style="color:#888;">'+r.note+'</td>'+
                  lastCol;
                tbody.appendChild(tr);
              }
              renderDropoutPaging();
            }

            function renderDropoutPaging(){
              var total=Math.max(1,Math.ceil(filteredData.length/PAGE_SIZE));
              var pg=document.getElementById('dropout-paging');
              pg.innerHTML='';
              var prev=document.createElement('button');
              prev.textContent='◀'; prev.disabled=(curPage===1);
              prev.onclick=function(){if(curPage>1){curPage--;renderDropout();}};
              pg.appendChild(prev);
              var sp=Math.max(1,curPage-4), ep=Math.min(total,sp+9);
              for(var p=sp;p<=ep;p++){
                (function(pp){
                  var btn=document.createElement('button');
                  btn.textContent=pp;
                  if(pp===curPage) btn.className='active';
                  btn.onclick=function(){curPage=pp;renderDropout();};
                  pg.appendChild(btn);
                })(p);
              }
              var next=document.createElement('button');
              next.textContent='▶'; next.disabled=(curPage===total);
              next.onclick=function(){if(curPage<total){curPage++;renderDropout();}};
              pg.appendChild(next);
              var info=document.createElement('span');
              info.style.cssText='font-size:12px;color:#888;margin-left:8px;';
              info.textContent=curPage+' / '+total+' 페이지';
              pg.appendChild(info);
            }

            buildFiltered();
            renderDropout();
          })();
          </script>
        </div><!-- /result-tab-result-dropout -->

      </div><!-- /result-manage-wrap -->

      <script>
        function switchResultTab(tab, el){
          document.getElementById('result-tab-result-detail').style.display  = tab==='result-detail'  ? 'block' : 'none';
          document.getElementById('result-tab-result-bonbu').style.display   = tab==='result-bonbu'   ? 'block' : 'none';
          document.getElementById('result-tab-result-dropout').style.display = tab==='result-dropout' ? 'block' : 'none';
          document.querySelectorAll('#result-sub-tabs .sub-tab').forEach(function(t){ t.classList.remove('active'); });
          el.classList.add('active');
        }
      </script>
    </div>

  </div><!-- /main -->
</div><!-- /layout -->


<!-- ══════════════════════════════════════════════ -->
<!-- MODAL: 학습 분석 멘트 등록/수정 -->
<!-- ══════════════════════════════════════════════ -->
<div id="modal-result" class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title" id="modal-result-title">학습 분석 멘트 등록</div>
      <div class="modal-close" onclick="document.getElementById('modal-result').classList.remove('show')">✕</div>
    </div>
    <div class="modal-body">
      <div class="notice info">ℹ 멘트 내 <b>OOO</b>는 LMS에서 학생 실명으로 자동 치환됩니다.</div>

      <div class="form-group">
        <label class="form-label">성취율 범위 (상위 %) *</label>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px; color:#555;">상위</span>
          <input class="form-input" id="modal-result-range-from" type="number" min="1" max="100" placeholder="1" style="width:70px; text-align:center;">
          <span style="font-size:12px; color:#555;">%</span>
          <span style="font-size:14px; color:#999;">~</span>
          <input class="form-input" id="modal-result-range-to" type="number" min="1" max="100" placeholder="5" style="width:70px; text-align:center;">
          <span style="font-size:12px; color:#555;">%</span>
        </div>
        <div style="font-size:11px; color:#e74c3c; margin-top:4px;">* 이미 등록된 범위와 중복될 수 없습니다.</div>
      </div>

      <div class="form-group">
        <label class="form-label">학습 분석 멘트 *</label>
        <textarea class="form-textarea" id="modal-result-content" rows="7" placeholder="OOO 학생은 이번 써밋 리그에서..."></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-gray" onclick="document.getElementById('modal-result').classList.remove('show')">취소</button>
      <button class="btn btn-primary" onclick="document.getElementById('modal-result').classList.remove('show')">저장</button>
    </div>
  </div>
</div>
<script>
// 학습결과서 멘트 데이터
var RESULT_DATA = [
  { from:1, to:5, content:'OOO 학생은 이번 써밋 리그에서 최상위 레벨에 해당하는 뛰어난 성과를 보였습니다.\n어려운 문제에서도 흔들리지 않고 끝까지 밀어붙이는 힘이 돋보였습니다. 특히 스스로 기준을 높게 잡고 마지막까지 완성도를 높이는 모습이 인상적이었습니다.\n상위권에서는 작은 차이가 결과를 가르기도 합니다. 풀이 과정을 한 번 더 정리하고 시간 활용을 잘 한다면 지금보다 더 단단한 실력을 만들 수 있을 것입니다.\n앞으로도 자신감을 바탕으로 도전과 성취를 이어가며, 더욱 빛나는 학습 성과를 만들어 나가길 기대합니다.' },
  { from:6, to:15, content:'OOO 학생은 이번 리그에서 안정적인 상위권 성과를 기록했습니다.\n개념은 비교적 잘 정리되어 있고, 문제를 풀어가는 흐름도 자연스럽습니다.\n조금 더 응용 문제에 집중하고, 실수를 줄이는 연습을 이어간다면 더 높은 등수도 충분히 가능합니다.\n꾸준한 노력이 결실을 맺고 있습니다. 다음 리그에서도 기대가 큽니다.' },
  { from:16, to:30, content:'OOO 학생은 이번 리그에서 중상위권의 탄탄한 성과를 보였습니다.\n기본 개념은 잘 잡혀 있고, 수업과 리그에 성실히 참여하는 모습도 꾸준히 이어지고 있습니다.\n응용력을 조금 더 키우고, 자주 틀리는 유형을 집중적으로 보완하면 한 단계 더 도약할 수 있을 것입니다.\n이번 리그가 좋은 도전의 경험이 되었기를 바랍니다.' },
  { from:31, to:50, content:'OOO 학생은 이번 리그를 통해 자신의 현재 위치를 파악하고 학습 수준을 점검해보는 시간을 가졌습니다.\n기초 개념 정리와 꾸준한 복습을 통해 앞으로 더 나은 결과를 만들어 낼 수 있을 것입니다.\n작은 노력들이 쌓여 큰 변화를 만듭니다. 포기하지 않고 계속 나아가길 응원합니다.' },
  { from:51, to:70, content:'OOO 학생은 이번 리그를 통해 학습 기반을 점검하는 시간을 가졌습니다.\n기초부터 차근차근 쌓아가는 것이 중요하며, 지금의 노력이 반드시 결실을 맺을 것입니다.\n포기하지 않고 참여한 것 자체가 성장의 출발점입니다. 다음 리그에서는 더 나은 모습을 기대합니다.' },
  { from:70, to:null, content:'OOO 학생은 이번 리그를 통해 현재의 기초 학습 상태를 확인했습니다.\n기초 개념을 다시 한번 꼼꼼히 점검하고, 자신만의 학습 루틴을 만들어 나가는 것이 중요합니다.\n어떤 출발점에서 시작해도 꾸준히 나아가면 반드시 성장할 수 있습니다. 리그 참여 자체가 소중한 경험입니다.' }
];
function openResultEdit(idx) {
  var d = RESULT_DATA[idx];
  document.getElementById('modal-result-title').textContent = '학습 분석 멘트 수정';
  document.getElementById('modal-result-range-from').value = d.from;
  document.getElementById('modal-result-range-to').value = d.to !== null ? d.to : '';
  document.getElementById('modal-result-content').value = d.content;
  document.getElementById('modal-result').classList.add('show');
}
function openResultAdd() {
  document.getElementById('modal-result-title').textContent = '학습 분석 멘트 등록';
  document.getElementById('modal-result-range-from').value = '';
  document.getElementById('modal-result-range-to').value = '';
  document.getElementById('modal-result-content').value = '';
  document.getElementById('modal-result').classList.add('show');
}
</script>


<script>
  function showPage(name) {
    // hide all
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));

    // show target
    document.getElementById('page-' + name).classList.add('active');

    // activate sidebar
    const items = document.querySelectorAll('.sidebar-item');
    const nameMap = {
      'league-list': 0, 'league-detail': 1, 'group-assign': 2,
      'member-manage': 3, 'apply-stats': 4, 'apply-status': 5, 'gift-manage': 6,
      'result-manage': 7
    };
    if (nameMap[name] !== undefined) items[nameMap[name]].classList.add('active');

    // 페이지별 렌더 훅
    if (name === 'apply-stats'   && typeof window._renderStats   === 'function') window._renderStats();
    if (name === 'apply-status'  && typeof window._renderStatus  === 'function') window._renderStatus();
    if (name === 'result-manage' && typeof window._renderTable   === 'function') window._renderTable();
    if (name === 'member-manage' && typeof window._renderMembers === 'function') window._renderMembers();
  }

  function switchDetailTab(tab, el) {
    document.getElementById('detail-tab-schedule').style.display = tab === 'schedule' ? 'block' : 'none';
    document.getElementById('detail-tab-result-doc').style.display = tab === 'result-doc' ? 'block' : 'none';
    document.getElementById('detail-tab-league-rules').style.display = tab === 'league-rules' ? 'block' : 'none';
    document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  function switchGiftTab(tab, el) {
    ['gift-list','gift-choice'].forEach(t => {
      document.getElementById('gift-tab-' + t).style.display = t === tab ? 'block' : 'none';
    });
    document.querySelectorAll('#page-gift-manage .sub-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    if (tab === 'gift-choice') { switchGiftChoiceTab('point'); }
  }

  // ── 리그 정책관리 데이터 ─────────────────────────────────────────────
  var LEAGUE_META = {
    '2026_winter': {name:'2026 윈터 리그오브매스', season:'윈터리그', status:'진행중', start:'2026-01-12', end:'2026-03-01'},
    '2025_summer': {name:'2025 서머 리그오브매스', season:'서머리그', status:'종료',   start:'2025-07-14', end:'2025-09-06'},
    '2025_winter': {name:'2025 윈터 리그오브매스', season:'윈터리그', status:'종료',   start:'2025-01-13', end:'2025-03-01'},
    '2024_summer': {name:'2024 서머 리그오브매스', season:'서머리그', status:'종료',   start:'2024-07-15', end:'2024-09-07'},
    '2024_winter': {name:'2024 윈터 리그오브매스', season:'윈터리그', status:'종료',   start:'2024-01-08', end:'2024-02-24'},
    '2023_summer': {name:'2023 서머 리그오브매스', season:'서머리그', status:'종료',   start:'2023-07-17', end:'2023-09-02'},
    '2023_winter': {name:'2023 윈터 리그오브매스', season:'윈터리그', status:'종료',   start:'2023-01-09', end:'2023-02-25'}
  };

  // 리그 목록 [상세관리] 버튼 → 해당 리그 선택 후 상세 페이지 이동
  function showLeagueDetail(leagueKey) {
    showPage('league-detail');
    loadLeagueDetail(leagueKey);
  }

  // 리그 선택 셀렉트 변경 → 기본정보 폼 업데이트
  function loadLeagueDetail(leagueKey) {
    var sel = document.getElementById('detail-league-select');
    if (sel) sel.value = leagueKey;

    var meta = LEAGUE_META[leagueKey];
    if (!meta) return;

    // 기본정보 폼 필드 업데이트
    var nameEl   = document.getElementById('detail-name');
    var seasonEl = document.getElementById('detail-season');
    var statusEl = document.getElementById('detail-status');
    var startEl  = document.getElementById('detail-start');
    var endEl    = document.getElementById('detail-end');

    if (nameEl)   nameEl.value   = meta.name;
    if (seasonEl) seasonEl.value = meta.season;
    if (statusEl) statusEl.value = meta.status;
    if (startEl)  startEl.value  = meta.start;
    if (endEl)    endEl.value    = meta.end;

    // 상태 배지 업데이트
    var badge = document.getElementById('detail-status-badge');
    if (badge) {
      var statusMap = {
        '진행중': ['badge-green',  '진행중'],
        '예정':   ['badge-blue',   '예정'],
        '종료':   ['badge-gray',   '종료']
      };
      var info = statusMap[meta.status] || ['badge-gray', meta.status];
      badge.className = 'badge ' + info[0];
      badge.textContent = info[1];
    }

    // 브레드크럼 업데이트
    var bc = document.getElementById('detail-breadcrumb');
    if (bc) bc.textContent = meta.name + ' 정책 관리';
  }

  // init sidebar active
  document.querySelector('.sidebar-item').classList.add('active');
</script>

<!-- ══ Stats 회원 리스트 모달 ══════════════════════════════════ -->
<div id="modal-stats-members" style="display:none;"></div>

<!-- ══ 알림톡 발송 이력 모달 ══════════════════════════════════ -->
<div id="modal-alarm-history" style="display:none;"></div>

  <!-- ═══ 선물 선택 현황 목업 데이터 + 렌더링 JS ═══ -->
  <script>
  (function(){
    // ── 공통 유틸 ─────────────────────────────────────
    function rnd(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
    function rndInt(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
    function pad(n,len){ return String(n).padStart(len,'0'); }
    // 회원번호: 005 + 7자리 (총 10자리)
    function mkMemberNo(){ return '005'+pad(rndInt(1000000,9999999),7); }
    // 교사사번: 003 + 7자리
    function mkTeacherNo(){ return '003'+pad(rndInt(1000000,9999999),7); }
    // 핸드폰: 010-XXXX-XXXX
    function mkPhone(){ return '010-'+pad(rndInt(1000,9999),4)+'-'+pad(rndInt(1000,9999),4); }

    var bonbuList=['대교 경산본부','대교 부경본부','대교 호남본부','대교 경기본부',
                  '대교 서울남동본부','대교 서울강원본부','대교 충청본부',
                  '대교 서울서북본부','대교 경인본부'];
    var jijumMap={
      '대교 경산본부':['대교 구미서부 Hive','대교 대구타전 Hive','대교 울산북구 Hive','대교 대구남부 Hive','대교 포항남구 Hive'],
      '대교 부경본부':['대교 부산금정 Hive','대교 부산센텀 Hive','대교 부산강서 Hive','대교 거제 Hive'],
      '대교 호남본부':['대교 광주복부 Hive','대교 광주수완 Hive','대교 전주덕진 Hive','대교 순천 Hive'],
      '대교 경기본부':['대교 동탄 Hive','대교 안산상록 Hive','대교 경기평택 Hive','대교 수원남부 Hive'],
      '대교 서울남동본부':['대교 하남 Hive','대교 강동 Hive','대교 노원 Hive'],
      '대교 서울강원본부':['대교 춘천 Hive','대교 양주 Hive','대교 성북 Hive'],
      '대교 충청본부':['대교 세종아름 Hive','대교 서대전 Hive','대교 아산 Hive'],
      '대교 서울서북본부':['대교 교하 Hive','대교 관악 Hive'],
      '대교 경인본부':['대교 인천검단 Hive','대교 인천남부 Hive','대교 인천주안 Hive']
    };
    var centerPfx=['[LC]','[YC]','[HI]','[NC]'];
    var centerSfx=['본일','원호','대구타전','거제중곡','능동','부곡','세종아름','산내','용소','한라','당현',
                  '당하','울산수암','상안','동전','산월','지행','봉화','문성','광주매곡','블루마','강동풍납',
                  '장산','문산','비전','미사중앙','한내들','인지','도안','명당','중리','길음','서곡','서창하니'];
    var teacherNames=['한윤희','정경애','박덕혜','배은경','이혜정','정은해','박민영','박경희','김은선','김은하',
                     '이명숙','허지은','이지현','이주현','문혜원','전희란','전희란','박민정','최경애','정한나',
                     '김완기','최보영','구미란','김향님','최은경','육정수','박현정','이시은','한화자','심예지',
                     '김진희','여길업','조성희','김양순','유주','채윤희','조수정','김정은','임진국','임연희',
                     '이경숙','김정옥','조성희','배지영','백해진','박설촌','박슬선','권정미','이은아','한금남',
                     '문정옥','양정자','김민자','오경숙','정귀남','김미경','남민정','윤지영','박합연'];
    var memberNames=['서가홍','심현수','김상우','유하준','천송이','김성준','손지협','정세은','전서윤','신건우',
                    '이시훈','권윤재','김도윤','최길인','백도윤','송효근','현서희','성경현','이준호','최봄이',
                    '최지율','진준혁','황하윤','김나경','최이수','고아인','송윤서','소원','김사랑','김대연',
                    '백수민','이서울','김태정','유세현','김주완','마스터','김서우','최라윤','지아준','임현기',
                    '양아인','안서연','유홍빈','이온서','박슬아','박서현','조예찬','정아현','장서연','이준서',
                    '최민준','박지안','홍서연','김도현','이수빈','최유진','박준형','윤서아','강민우','권지원',
                    '안태영','정하은','신성우','오지원','한서윤','배지훈','임서진','이준혁','박아인','김은서',
                    '최서진','조민준','홍유나','배현수','신지아','이나은','권준서','박도경','강서인','정민준'];
    var leagues=['B.초1','B.초2','B.초3','B.초4','B.초5','B.초6','C.중1','C.중2','C.중3','D.고1'];
    var pointGifts=[
      '메가MGC커피 모바일금액권 3천원권','급네치킨 오리지널+콜라1.25L',
      'GS25 모바일 상품권 1만원권','다이소 모바일 금액권 3,000원',
      'CU 모바일상품권 3천원권','맥도날드 맥치킨 모짜렐라 세트',
      'CU 모바일상품권 5천원권','컬쳐랜드 모바일 문화상품권 1만원권',
      'CU 모바일상품권 3천원권','컬쳐랜드 문화상품권 2만원',
      'CU 모바일상품권 3천원권','롯데리아 더블 한국불고기버거 세트',
      'GS25 모바일 상품권 2만원권','CU 모바일상품권 7천원권',
      'CU 모바일상품권 3천원권','파리바게뜨 교환권 15,000원',
      'GS25 모바일 상품권 1만원권','CU 모바일상품권 3천원권'
    ];
    var rankPool=['30조','01조','06조','11조','08조','06조','19조','09조','16조','19조',
                 '32조','23조','01조','11조','20조','03조','20조','03조','04조','16조'];
    var rankNums=['조117등','조059등','조138등','조142등','조150등','조021등','조050등','조006등',
                 '조037등','조155등','조006등','조098등','조050등','조120등','조003등','조078등',
                 '조015등','조030등','조060등','조142등'];
    var pointVals=[100,500,700,1000,1500,2000];

    // ── 포인트 선물 데이터 생성 (12,384건) ──────────────────
    var POINT_DATA = [];
    var seed = 42;
    function seededRnd(arr){ seed=(seed*9301+49297)%233280; return arr[Math.floor((seed/233280)*arr.length)]; }
    function seededInt(a,b){ seed=(seed*9301+49297)%233280; return a+Math.floor((seed/233280)*(b-a+1)); }
    function seededPhone(){ return '010-'+pad(seededInt(1000,9999),4)+'-'+pad(seededInt(1000,9999),4); }
    function seededMemberNo(){ return '005'+pad(seededInt(1000000,9999999),7); }

    for(var i=0;i<12384;i++){
      var bn=seededRnd(bonbuList);
      var jl=jijumMap[bn]; var jn=seededRnd(jl);
      var cn=seededRnd(centerPfx)+seededRnd(centerSfx);
      var tn=seededRnd(teacherNames); var mn=seededRnd(memberNames);
      var lg=seededRnd(leagues);
      var tm=pad(seededInt(1,40),2)+'조';
      var rank=seededRnd(rankNums);
      var pt=seededRnd(pointVals);
      var gft=seededRnd(pointGifts);
      POINT_DATA.push([bn,jn,cn,tn,seededMemberNo(),mn,lg,tm,rank,pt,gft,seededPhone()]);
    }

    // ── GM/Master 데이터 (이미지2 기반 정확한 20건) ───────────
    var GM_DATA_RAW = [
      ['대교 경산본부','대교 구미서부 Hive','[LC]문성','','전우성','B.초2','05조','Grand Master','신세계 상품권 50만원권'],
      ['대교 경산본부','대교 구미서부 Hive','[LC]문성','','전유빈','B.초4','25조','Master','신세계 상품권 30만원권'],
      ['대교 호남본부','대교 광주복부 Hive','[LC]광주매곡','','석태성','B.초2','21조','Master','신세계 상품권 30만원권'],
      ['대교 경산본부','대교 울산북구 Hive','[LC]블루마','','변지안','B.초1','02조','Grand Master','신세계 상품권 50만원권'],
      ['대교 서울남동본부','대교 강동 Hive','[LC]강동풍납','','천지화','D.고1','02조','Grand Master','신세계 상품권 50만원권'],
      ['대교 부경본부','대교 부산센텀 Hive','[HI]장산','','박지아','B.초3','20조','Grand Master','신세계 상품권 50만원권'],
      ['대교 경산본부','대교 울산북구 Hive','[LC]블루마','','윤창현','B.초4','27조','Grand Master','신세계 상품권 50만원권'],
      ['대교 호남본부','대교 광주복부 Hive','[LC]문산','','최서영','B.초6','19조','Master','[BOSE] QC 헤드폰 화이트스모크'],
      ['대교 경기본부','대교 경기평택 Hive','[HI]비전','','진시우','B.초1','01조','Master','신세계 상품권 30만원권'],
      ['대교 서울남동본부','대교 하남 Hive','[LC]미사중앙','','정슬우','C.중1','01조','Grand Master','신세계 상품권 50만원권'],
      ['대교 부경본부','대교 부산센텀 Hive','[HI]장산','','신승준','B.초3','19조','Grand Master','신세계 상품권 50만원권'],
      ['대교 서울남동본부','대교 하남 Hive','[LC]미사중앙','','안예성','B.초3','23조','Master','신세계 상품권 30만원권'],
      ['대교 서울강원본부','대교 춘천 Hive','[YC]한내들','','안호성','C.중1','01조','Master','신세계 상품권 30만원권'],
      ['대교 부경본부','대교 부산센텀 Hive','[LC]인지','','장주원','C.중2','01조','Grand Master','신세계 상품권 50만원권'],
      ['대교 부경본부','대교 부산센텀 Hive','[LC]인지','','장한별','C.중2','01조','Master','갤럭시 워치7 (블루투스, 44mm)'],
      ['대교 충청본부','대교 서대전 Hive','[LC]도안','','최윤도','C.중3','01조','Master','신세계 상품권 30만원권'],
      ['대교 부경본부','대교 부산센텀 Hive','[HI]장산','','하인영','D.고1','02조','Master','신세계 상품권 30만원권'],
      ['대교 경기본부','대교 수원남부 Hive','[LC]명당','','김지후','C.중3','04조','Grand Master','신세계 상품권 50만원권'],
      ['대교 경산본부','대교 대구남부 Hive','[LC]중리','','김나윤','B.초5','21조','Grand Master','신세계 상품권 50만원권'],
      ['대교 서울강원본부','대교 성북 Hive','[HI]길음','','장서연','B.초5','21조','Master','신세계 상품권 30만원권']
    ];
    // 교사명 채우기
    var gmTeachers=['최경애','최경애','정한나','김완기','최보영','구미란','김완기','김향님','최은경',
                    '육정수','박현정','이시은','한화자','심예지','심예지','김진희','박현정','여길업','조성희','김양순'];
    var GM_DATA = GM_DATA_RAW.map(function(r,i){
      var full = [r[0],r[1],r[2],gmTeachers[i],mkMemberNo(),r[4],r[5],r[6],r[7],r[8],mkPhone()];
      return full;
    });

    // ── 스크래치 데이터 생성 (150건) ──────────────────────────
    var scratchGifts=['교촌치킨 간장한마리+콜라1.25L','베스킨라빈스 미니 해피버스데이 케이크','메가커피 2만원 금액권'];
    var bigo=['','','','','','','','','','','','','','','','','','','','','퇴회(1)','','','','','','','','','','','','','','','','','','','퇴회(5)'];
    var grades=['초1','초2','초3','초4','초5','초6','중1','중2','중3','고1'];
    var SCRATCH_DATA = [];
    for(var i=0;i<150;i++){
      var bn=rnd(bonbuList); var jl=jijumMap[bn]; var jn=rnd(jl);
      var cn=rnd(centerPfx)+rnd(centerSfx);
      var tn=rndInt(1000000,9999999);
      var tname=rnd(teacherNames); var mn=rnd(memberNames);
      var grade=rnd(grades); var lg=rnd(leagues); var tm=pad(rndInt(1,40),2)+'조';
      var gft=rnd(scratchGifts);
      var bg=(Math.random()<0.05)?('퇴회('+rndInt(1,8)+')'):'';
      SCRATCH_DATA.push([bn,jn,cn,'003'+pad(tn,7),tname,mkMemberNo(),mn,lg,tm,grade,gft,bg,mkPhone()]);
    }

    // ── 페이징 헬퍼 ─────────────────────────────────────
    function makePager(total, cur, pageSize, containerId, cbName){
      var totalPages = Math.ceil(total/pageSize);
      var c = document.getElementById(containerId);
      if(!c) return;
      c.innerHTML='';
      var btnStyle='padding:5px 11px; border:1px solid #ddd; border-radius:4px; cursor:pointer; font-size:13px; background:#fff;';
      var actStyle='padding:5px 11px; border:1px solid #1976d2; border-radius:4px; cursor:pointer; font-size:13px; background:#1976d2; color:#fff;';
      if(cur>1){ var b=document.createElement('button'); b.innerHTML='&laquo;'; b.style.cssText=btnStyle; b.onclick=new Function(cbName+'(1)'); c.appendChild(b); }
      if(cur>1){ var b=document.createElement('button'); b.innerHTML='&lsaquo;'; b.style.cssText=btnStyle; b.onclick=new Function(cbName+'('+(cur-1)+')'); c.appendChild(b); }
      var s=Math.max(1,cur-2), e=Math.min(totalPages,cur+2);
      for(var p=s;p<=e;p++){
        var b=document.createElement('button'); b.textContent=p; b.style.cssText=(p===cur?actStyle:btnStyle);
        (function(pp){ b.onclick=function(){ window[cbName](pp); }; })(p);
        c.appendChild(b);
      }
      if(cur<totalPages){ var b=document.createElement('button'); b.innerHTML='&rsaquo;'; b.style.cssText=btnStyle; b.onclick=new Function(cbName+'('+(cur+1)+')'); c.appendChild(b); }
      if(cur<totalPages){ var b=document.createElement('button'); b.innerHTML='&raquo;'; b.style.cssText=btnStyle; b.onclick=new Function(cbName+'('+totalPages+')'); c.appendChild(b); }
    }
    function td(v){ var t=document.createElement('td'); t.textContent=v||''; return t; }

    var POINT_HEADERS = ['No','본부명','지점명','센터명','교사명','회원번호','회원명','리그명','팀명','등수','사용포인트','선물명','핸드폰번호'];
    var _ptFiltered = POINT_DATA;
    window.renderPointGift = function(page){
      page = page||1;
      var ps = parseInt('20');
      var table = document.querySelector('#gcp-point table');
      if(table){
        var thead=table.querySelector('thead');
        if(!thead){ thead=document.createElement('thead'); table.insertBefore(thead,table.firstChild); }
        var htr=document.createElement('tr');
        POINT_HEADERS.forEach(function(name){
          var th=document.createElement('th');
          th.textContent=name;
          th.style.cssText='background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;';
          htr.appendChild(th);
        });
        thead.innerHTML=''; thead.appendChild(htr);
      }
      var tbody = document.getElementById('point-tbody');
      if(!tbody) return;
      tbody.innerHTML='';
      var start=(page-1)*ps, end=Math.min(start+ps, _ptFiltered.length);
      for(var i=start;i<end;i++){
        var r=_ptFiltered[i]; var tr=document.createElement('tr');
        var numTd=document.createElement('td'); numTd.textContent=i+1; tr.appendChild(numTd);
        r.forEach(function(v){ tr.appendChild(td(v)); }); tbody.appendChild(tr);
      }
      document.getElementById('point-total-cnt').textContent=_ptFiltered.length.toLocaleString();
      makePager(_ptFiltered.length,page,ps,'point-pages','renderPointGift');
    };
    // 검색
    window.searchPointGift = function(){
      _ptFiltered = POINT_DATA;
      renderPointGift(1);
    };

    // ── GM 렌더 ───────────────────────────────────────────
    var GM_HEADERS = ['No','본부명','지점명','센터명','교사명','회원번호','회원명','리그명','팀명','등수','선물명','핸드폰번호'];
    var _gmFiltered = GM_DATA;
    window.renderGMGift = function(page){
      page=page||1; var ps=20;
      var table=document.querySelector('#gcp-grandmaster table');
      if(table){
        var thead=table.querySelector('thead');
        if(!thead){ thead=document.createElement('thead'); table.insertBefore(thead,table.firstChild); }
        var htr=document.createElement('tr');
        GM_HEADERS.forEach(function(name){
          var th=document.createElement('th');
          th.textContent=name;
          th.style.cssText='background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;';
          htr.appendChild(th);
        });
        thead.innerHTML=''; thead.appendChild(htr);
      }
      var tbody=document.getElementById('gm-tbody');
      if(!tbody) return;
      tbody.innerHTML='';
      var start=(page-1)*ps, end=Math.min(start+ps,_gmFiltered.length);
      for(var i=start;i<end;i++){
        var r=_gmFiltered[i]; var tr=document.createElement('tr');
        var numTd=document.createElement('td'); numTd.textContent=i+1; tr.appendChild(numTd);
        r.forEach(function(v,vi){
          var t=document.createElement('td');
          if(vi===8){
            var s=document.createElement('span');
            s.textContent=v;
            s.style.cssText='display:inline-block;padding:2px 8px;border-radius:12px;font-size:12px;font-weight:600;';
            s.style.background=v==='Grand Master'?'#fff3e0':'#e3f0ff';
            s.style.color=v==='Grand Master'?'#e65100':'#1976d2';
            t.appendChild(s);
          } else { t.textContent=v; }
          tr.appendChild(t);
        }); tbody.appendChild(tr);
      }
      document.getElementById('gm-total-cnt').textContent=_gmFiltered.length.toLocaleString();
      makePager(_gmFiltered.length,page,ps,'gm-pages','renderGMGift');
    };

    // ── 스크래치 렌더 ─────────────────────────────────────
    var _scrFiltered = SCRATCH_DATA;
    var SCRATCH_HEADERS = ['No','본부명','지점명','센터명','교사사번','교사명','회원번호','회원명','리그명','팀명','학년','선물명','비고','핸드폰번호'];
    window.renderScratchGift = function(page){
      page=page||1; var ps=20;
      // thead 강제 재설정
      var table=document.getElementById('scratch-gift-table')||document.querySelector('#gcp-scratch table');
      if(table){
        var thead=table.querySelector('thead');
        if(!thead){ thead=document.createElement('thead'); table.insertBefore(thead,table.firstChild); }
        var htr=document.createElement('tr');
        SCRATCH_HEADERS.forEach(function(name){
          var th=document.createElement('th');
          th.textContent=name;
          th.style.cssText='background:#deebff;color:#1a3a6b;border:1px solid #b8d0f0;padding:10px 12px;text-align:center;font-weight:700;white-space:nowrap;';
          htr.appendChild(th);
        });
        thead.innerHTML=''; thead.appendChild(htr);
      }
      var tbody=document.getElementById('scratch-tbody');
      if(!tbody) return;
      tbody.innerHTML='';
      var start=(page-1)*ps, end=Math.min(start+ps,_scrFiltered.length);
      for(var i=start;i<end;i++){
        var r=_scrFiltered[i]; var tr=document.createElement('tr');
        var numTd=document.createElement('td'); numTd.textContent=i+1; tr.appendChild(numTd);
        r.forEach(function(v){ tr.appendChild(td(v)); }); tbody.appendChild(tr);
      }
      document.getElementById('scratch-total-cnt').textContent=_scrFiltered.length.toLocaleString();
      makePager(_scrFiltered.length,page,ps,'scratch-pages','renderScratchGift');
    };

    // ── 선물 선택 탭 전환 ──────────────────────────────────
    window.switchGiftChoiceTab = function(tab){
      ['point','grandmaster','scratch'].forEach(function(t){
        var panel=document.getElementById('gcp-'+t);
        var tabEl=document.getElementById('gct-'+t);
        if(!panel||!tabEl) return;
        if(t===tab){
          panel.style.display='block';
          tabEl.classList.add('active');
          if(t==='point' && document.getElementById('point-tbody') && !document.getElementById('point-tbody').children.length) renderPointGift(1);
          if(t==='grandmaster' && document.getElementById('gm-tbody') && !document.getElementById('gm-tbody').children.length) renderGMGift(1);
          if(t==='scratch' && document.getElementById('scratch-tbody') && !document.getElementById('scratch-tbody').children.length) renderScratchGift(1);
        } else {
          panel.style.display='none';
          tabEl.classList.remove('active');
        }
      });
    };
    // 페이지 로드 시 포인트 선물 초기 렌더
    window.addEventListener('load', function(){
      if(document.getElementById('gcp-point')){ renderPointGift(1); }
    });
  })();
  </script>

</body>
</html>
