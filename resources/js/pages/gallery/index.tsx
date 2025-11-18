import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; // Adjust based on your layout name
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function GalleryIndex({ items }: { items: any[] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        image: null as File | null, // Initialize as null
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Inertia automatically converts this to FormData because of the file
        post('/gallery', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Gallery', href: '/gallery' }]}>
            <Head title="Gallery" />

            <div className="p-6 max-w-4xl mx-auto space-y-8">
                
                {/* Upload Form */}
                <div className="bg-white p-6 rounded-lg shadow border">
                    <h2 className="text-lg font-bold mb-4">Upload New Image</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                        </div>

                        <div>
                            <Label htmlFor="image">Image</Label>
                            <Input
                                id="image"
                                type="file"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                            />
                            {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                        </div>

                        <Button type="submit" disabled={processing}>
                            {processing ? 'Uploading...' : 'Save Image'}
                        </Button>
                    </form>
                </div>

                {/* Display Images */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden">
                            {/* Note: Ensure you ran 'php artisan storage:link' */}
                            <img 
                                src={`/storage/${item.image_path}`} 
                                alt={item.title} 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-medium">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}