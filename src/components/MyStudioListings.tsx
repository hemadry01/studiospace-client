import { IStudio } from '@/type/Studio';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import DeleteStudioDialog from './DeleteStudio';
import EditStudioDialog from './EditStudio';

interface IStudioPromise {
  studio: IStudio;
}

const MyStudioListingsPage = ({ studio }: IStudioPromise) => {
  return (
    <div className="flex items-center gap-4 rounded-xl py-4 sm:gap-6">
      {studio.imageUrl ? (
        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:size-28">
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="relative flex size-20 shrink-0 flex-col justify-end rounded-lg bg-gradient-to-t from-slate-200 to-slate-100 p-2 sm:size-28">
          <span className="text-[0.5rem] font-semibold uppercase tracking-wide text-slate-500 sm:text-[0.625rem]">
            Photo studio
          </span>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
          {studio.title}
        </h3>
        <p className="mt-1.5 truncate text-xs text-slate-500 sm:text-sm">
          {studio.category} · ${studio.hourlyRate}/hr
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <EditStudioDialog studio={studio} />
        <DeleteStudioDialog studio={studio} />
      </div>
    </div>
  );
};

export default MyStudioListingsPage;