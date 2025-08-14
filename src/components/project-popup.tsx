import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

interface ItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function ItemWithPopup({ icon, title, description }: ItemProps) {
  return (
    <Dialog >
      {/* Trigger can be any element */}
      <DialogTrigger asChild>
        <div className="cursor-pointer inline-block">
          <Image src={icon} alt={title} width={150} height={150} className="object-contain" />
          <p className="mt-2 text-center">{title}</p>
        </div>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="max-w-lg">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <div className="mt-4">
          <Image
            src={icon}
            alt={title}
            width={500}
            height={500}
            className="object-contain w-full h-auto"
          />
        </div>
        <DialogClose className="mt-4 btn">Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
}
