const SHOW = 15;

export default function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;

  const visiblePages = [];
  for (let i = 1; i <= Math.min(SHOW, total); i++) {
    visiblePages.push(i);
  }
  const hasMore = total > SHOW;

  const linkCls = 'px-2.5 py-[5px] text-[12px] text-gray-800 hover:text-[#0284c7] cursor-pointer transition-colors duration-150 select-none';
  const currentCls = 'px-2.5 py-[5px] text-[12px] text-white font-bold bg-[#0284c7] rounded-sm cursor-default select-none';

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 py-2.5 text-[13px]">
      {current > 1 && (
        <span className={linkCls} onClick={() => onChange(current - 1)}>Prev</span>
      )}

      {visiblePages.map(p =>
        p === current ? (
          <span key={p} className={currentCls}>{p}</span>
        ) : (
          <span key={p} className={linkCls} onClick={() => onChange(p)}>{p}</span>
        )
      )}

      {hasMore && (
        <span className={linkCls} onClick={() => onChange(total)}>...{total}</span>
      )}

      {current < total && (
        <span className={linkCls} onClick={() => onChange(current + 1)}>Next</span>
      )}
    </div>
  );
}
