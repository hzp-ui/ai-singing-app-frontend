// 歌曲库页面
// 文件路径：src/pages/SongLibraryPage.tsx

import React, { useState } from 'react';
import { NavBar, SearchBar, Tabs, Tag, Toast } from 'antd-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import './SongLibraryPage.css';

// 模拟数据
const MOCK_SONGS = [
  {
    id: '1',
    title: '沧海一声笑',
    artist: '许冠杰',
    difficulty: 'beginner',
    duration: '4:32',
    cover: 'https://via.placeholder.com/300',
    tags: ['经典', '粤语'],
    plays: 12580,
  },
  {
    id: '2',
    title: '月亮代表我的心',
    artist: '邓丽君',
    difficulty: 'beginner',
    duration: '3:45',
    cover: 'https://via.placeholder.com/300',
    tags: ['经典', '国语'],
    plays: 23100,
  },
  {
    id: '3',
    title: '稻香',
    artist: '周杰伦',
    difficulty: 'intermediate',
    duration: '3:58',
    cover: 'https://via.placeholder.com/300',
    tags: ['流行', '国语'],
    plays: 45200,
  },
  {
    id: '4',
    title: '我的中国心',
    artist: '张明敏',
    difficulty: 'intermediate',
    duration: '4:15',
    cover: 'https://via.placeholder.com/300',
    tags: ['经典', '国语'],
    plays: 18900,
  },
  {
    id: '5',
    title: '青花瓷',
    artist: '周杰伦',
    difficulty: 'advanced',
    duration: '4:02',
    cover: 'https://via.placeholder.com/300',
    tags: ['流行', '国语'],
    plays: 56780,
  },
];

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: '#22C55E',
  intermediate: '#F59E0B',
  advanced: '#EF4444',
};

const SongLibraryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (value: string) => {
    setSearchText(value);
    Toast.show(`搜索：${value}`);
  };

  const handleSongClick = (songId: string) => {
    Toast.show(`开始训练歌曲 ID: ${songId}`);
    // 这里跳转到训练页面
  };

  return (
    <div className="song-library-page">
      {/* 顶部导航 */}
      <NavBar
        className="page-navbar"
        back={null}
        right={<ThemeToggle />}
      >
        歌曲库
      </NavBar>

      {/* 搜索栏 */}
      <div className="search-container">
        <SearchBar
          placeholder="搜索歌曲或歌手"
          onSearch={handleSearch}
          style={{ '--border-radius': '16px' } as any}
        />
      </div>

      {/* 分类标签 */}
      <Tabs
        activeKey={String(activeTab)}
        onChange={(key) => setActiveTab(Number(key))}
        className="category-tabs"
      >
        <Tabs.Tab title="推荐" key="0" />
        <Tabs.Tab title="经典老歌" key="1" />
        <Tabs.Tab title="流行金曲" key="2" />
        <Tabs.Tab title="民谣" key="3" />
        <Tabs.Tab title="红歌" key="4" />
      </Tabs>

      {/* 歌曲列表 */}
      <div className="song-list">
        {MOCK_SONGS.map(song => (
          <div
            key={song.id}
            className="song-card"
            onClick={() => handleSongClick(song.id)}
          >
            <div className="song-cover">
              <img src={song.cover} alt={song.title} />
              <div className="song-duration">{song.duration}</div>
            </div>
            
            <div className="song-info">
              <h3 className="song-title">{song.title}</h3>
              <p className="song-artist">{song.artist}</p>
              
              <div className="song-tags">
                <Tag
                  style={{
                    '--background-color': DIFFICULTY_COLORS[song.difficulty] + '20',
                    '--text-color': DIFFICULTY_COLORS[song.difficulty],
                    '--border-color': 'transparent',
                  } as any}
                >
                  {DIFFICULTY_LABELS[song.difficulty]}
                </Tag>
                {song.tags.map(tag => (
                  <Tag key={tag} color="default">{tag}</Tag>
                ))}
              </div>
              
              <div className="song-plays">
                {song.plays.toLocaleString()} 次跟唱
              </div>
            </div>
            
            <div className="song-action">
              <button className="btn-practice">开始跟唱</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongLibraryPage;
