import React, { useState } from 'react';
import { useWasla } from '../../context/WaslaContext';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Plus,
  Send,
  Building,
  GraduationCap,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const CommunityPage = () => {
  const { communityTopics, addToast, universitiesList, navigateTo } = useWasla();

  const [topics, setTopics] = useState(communityTopics);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('نصائح العمل الحر');
  const [isAddingTopic, setIsAddingTopic] = useState(false);

  const handleLike = (id) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, likesCount: t.likesCount + 1 } : t))
    );
    addToast('شكراً لتفاعلك!', 'تم تسجيل إعجابك بالموضوع الأكاديمي.', 'success', 2000);
  };

  const handleCreateTopic = (e) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;

    const newTopic = {
      id: 'comm_' + Date.now(),
      title: newTopicTitle,
      author: 'م. أروى الحمادي',
      university: 'جامعة حضرموت',
      repliesCount: 0,
      likesCount: 1,
      date: 'الآن',
      category: newTopicCategory,
      tags: ['وصلة', 'نقاش أكاديمي', 'طلاب اليمن'],
      excerpt: newTopicTitle,
    };

    setTopics([newTopic, ...topics]);
    setNewTopicTitle('');
    setIsAddingTopic(false);
    addToast('تم نشر موضوعك في ملتقى الجامعات!', 'يمكن لزملائك الطلاب الآن التفاعل ومشاركة تجاربهم.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-right" dir="rtl">
      {/* 1. Header */}
      <Navbar variant="light" />

      {/* 2. Hero */}
      <section className="bg-[#0B192C] text-white py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>مجتمع ومشاريع طلاب الجامعات اليمنية</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black mb-3 leading-tight">
              ملتقى الكفاءات الطلابية وتبادل خبرات العمل الحر
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
              مساحة تفاعلية تجمع المطورين والمصممين والباحثين من مختلف الكليات والجامعات في اليمن لمشاركة تجارب التغلب على انقطاعات الطاقة، فرق مشاريع التخرج، وحلول الوساطة.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Main Discussions Feed */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-4">
          {/* Post Creation Trigger */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            {!isAddingTopic ? (
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-slate-500">
                  هل لديك استفسار أو تجربة تريد مشاركتها مع زملاء المهنة والجامعات؟
                </span>
                <button
                  onClick={() => setIsAddingTopic(true)}
                  className="bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>طرح موضوع جديد</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateTopic} className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="font-black text-xs text-[#0B192C]">طرح موضوع أو نصيحة أكاديمية</h4>
                  <button
                    type="button"
                    onClick={() => setIsAddingTopic(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    إلغاء
                  </button>
                </div>

                <input
                  type="text"
                  required
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="عنوان الموضوع أو الاستفسار..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-teal-500"
                />

                <div className="flex items-center justify-between gap-3">
                  <select
                    value={newTopicCategory}
                    onChange={(e) => setNewTopicCategory(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 outline-none"
                  >
                    <option value="نصائح العمل الحر">نصائح العمل الحر</option>
                    <option value="الوساطة المالية والضمان">الوساطة المالية والضمان</option>
                    <option value="مشاريع التخرج والتعاون">مشاريع التخرج والتعاون</option>
                    <option value="حلول الطاقة والإنترنت">حلول الطاقة والإنترنت</option>
                  </select>

                  <button
                    type="submit"
                    className="bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold px-5 py-2 rounded-xl transition-colors"
                  >
                    نشر الموضوع
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Topics List */}
          <div className="space-y-4">
            {topics.map((topic) => (
              <article
                key={topic.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                      {topic.author.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-[#0B192C] block leading-none">
                        {topic.author}
                      </span>
                      <span className="text-[10px] text-teal-700 font-medium">
                        {topic.university}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                    {topic.date}
                  </span>
                </div>

                {/* Title & Body */}
                <div>
                  <h3 className="font-black text-sm text-[#0B192C] mb-2 leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {topic.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {topic.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Social Counter Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(topic.id)}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-rose-500 transition-colors font-bold"
                    >
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                      <span>{topic.likesCount} إعجاب</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <MessageSquare className="w-4 h-4" />
                      <span>{topic.repliesCount} رد</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToast('تم نسخ الرابط', 'تم نسخ رابط الموضوع إلى الحافظة.', 'info');
                    }}
                    className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-[11px]"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>مشاركة</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar Info Column */}
        <aside className="lg:col-span-4 space-y-4">
          {/* Universities Partner Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h4 className="font-black text-xs text-[#0B192C] flex items-center gap-2">
              <Building className="w-4 h-4 text-teal-600" />
              <span>الجامعات النشطة في المنصة</span>
            </h4>
            <div className="space-y-2 text-xs">
              {universitiesList.map((u) => (
                <div
                  key={u.id}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-slate-700 font-medium"
                >
                  <span className="flex items-center gap-2">
                    <span>{u.logo}</span>
                    <span>{u.name}</span>
                  </span>
                  <span className="text-[10px] text-teal-800 font-bold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    {u.city}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips for Yemeni Freelancers */}
          <div className="bg-gradient-to-br from-[#0B192C] to-[#15253C] rounded-2xl p-5 text-white shadow-md space-y-3">
            <div className="flex items-center gap-2 text-teal-400">
              <Zap className="w-4 h-4" />
              <h4 className="font-black text-xs">معيار الاستقرار الميداني</h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
              للحصول على شارة "جاهز للعمل" ينصح بتوفير بطارية ليثيوم احتياطية أو منظومة شمسية وشريحة بيانات 4G بديلة لخط الألياف لتفادي تعليق المشاريع أثناء انقطاع الشبكات.
            </p>
          </div>
        </aside>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
};

export default CommunityPage;

