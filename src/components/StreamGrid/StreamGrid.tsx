import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import type { Stream } from '../../types';
import { StreamTile } from '../StreamTile/StreamTile';

interface StreamGridProps {
  streams: Stream[];
  onReorder: (activeId: string, overId: string) => void;
  onToggleMute: (id: string) => void;
  onRemove: (id: string) => void;
  onToggleFavorite?: (stream: Stream) => void;
  isFavorite?: (url: string) => boolean;
}

export function StreamGrid({
  streams,
  onReorder,
  onToggleMute,
  onRemove,
  onToggleFavorite,
  isFavorite,
}: StreamGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onReorder(active.id as string, over.id as string);
    }
  };

  // グリッドレイアウト
  const getGridClass = () => {
    const count = streams.length;
    if (count === 1) return 'grid-cols-1 grid-rows-1';
    if (count === 2) return 'grid-cols-2 grid-rows-1';
    if (count === 3) return 'grid-cols-2 grid-rows-2 [&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1 lg:grid-cols-3 lg:grid-rows-1';
    if (count === 4) return 'grid-cols-2 grid-rows-2';
    if (count <= 6) return 'grid-cols-3 grid-rows-2';
    if (count <= 9) return 'grid-cols-3 grid-rows-3';
    return 'grid-cols-4 auto-rows-fr';
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={streams.map((s) => s.id)} strategy={rectSortingStrategy}>
        <div className={`grid gap-2 h-full ${getGridClass()}`}>
          {streams.map((stream) => (
            <StreamTile
              key={stream.id}
              stream={stream}
              onToggleMute={onToggleMute}
              onRemove={onRemove}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite?.(stream.url)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
