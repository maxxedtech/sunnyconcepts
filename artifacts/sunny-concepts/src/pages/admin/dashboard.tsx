import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { 
  useAdminMe, getAdminMeQueryKey, 
  useAdminLogout,
  useListPortfolioImages, getListPortfolioImagesQueryKey,
  useCreatePortfolioImage, useDeletePortfolioImage,
  useGetCeoProfile, getGetCeoProfileQueryKey, useUpdateCeoProfile,
  useListBackgrounds, getListBackgroundsQueryKey, useUploadBackground, useDeleteBackground,
  useGetSiteContent, getGetSiteContentQueryKey, useUpdateSiteContent
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Image as ImageIcon, FileText, User, Settings, Upload, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: session, isLoading: sessionLoading, isError } = useAdminMe({
    query: { queryKey: getAdminMeQueryKey() }
  });

  const logoutMutation = useAdminLogout();

  useEffect(() => {
    if (!sessionLoading && (!session?.authenticated || isError)) {
      setLocation("/admin");
    }
  }, [session, sessionLoading, isError, setLocation]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminMeQueryKey() });
        setLocation("/admin");
      }
    });
  };

  if (sessionLoading || !session?.authenticated) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="font-serif text-2xl text-white">Sunny Concepts</h2>
          <p className="text-primary text-xs uppercase tracking-widest mt-1">Admin Control</p>
        </div>
        
        <div className="p-4 flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4 px-2">Modules</p>
          <nav className="space-y-1">
            {/* Tabs triggers are managed in the main section, we'll use a hack to control Tabs from outside if needed, 
                but for simplicity we'll wrap the whole layout in Tabs */}
          </nav>
        </div>
        
        <div className="p-4 border-t border-white/5">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-white" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Tabs defaultValue="portfolio" className="w-full h-full flex flex-col">
          <div className="px-8 py-4 border-b border-white/5 bg-card/50">
            <TabsList className="bg-transparent border-b border-white/10 w-full justify-start rounded-none h-auto p-0 space-x-6">
              <TabsTrigger value="portfolio" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white rounded-none py-3 px-1 text-muted-foreground">
                <ImageIcon className="w-4 h-4 mr-2" />
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="ceo" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white rounded-none py-3 px-1 text-muted-foreground">
                <User className="w-4 h-4 mr-2" />
                CEO Profile
              </TabsTrigger>
              <TabsTrigger value="backgrounds" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white rounded-none py-3 px-1 text-muted-foreground">
                <Settings className="w-4 h-4 mr-2" />
                Backgrounds
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white rounded-none py-3 px-1 text-muted-foreground">
                <FileText className="w-4 h-4 mr-2" />
                Site Content
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-8 flex-1 max-w-6xl">
            <TabsContent value="portfolio" className="mt-0 outline-none">
              <PortfolioManager />
            </TabsContent>
            
            <TabsContent value="ceo" className="mt-0 outline-none">
              <CeoManager />
            </TabsContent>
            
            <TabsContent value="backgrounds" className="mt-0 outline-none">
              <BackgroundManager />
            </TabsContent>

            <TabsContent value="content" className="mt-0 outline-none">
              <ContentManager />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}

function PortfolioManager() {
  const categories = [
    "Art Cover", "Birthday Flyers", "Church Flyers", 
    "Logos & Brand Identity", "Others", "Stickers & Labelling", 
    "Wedding Cards, Jotters & Wedding Programs"
  ];
  
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: images, isLoading } = useListPortfolioImages(
    { category: activeCategory },
    { query: { queryKey: getListPortfolioImagesQueryKey({ category: activeCategory }) } }
  );

  const createMutation = useCreatePortfolioImage();
  const deleteMutation = useDeletePortfolioImage();

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    createMutation.mutate({
      data: {
        category: activeCategory,
        title: title || undefined,
        description: description || undefined,
        file: file as any // Blob type compatibility
      }
    }, {
      onSuccess: () => {
        toast({ title: "Image uploaded successfully" });
        setFile(null);
        setTitle("");
        setDescription("");
        queryClient.invalidateQueries({ queryKey: getListPortfolioImagesQueryKey({ category: activeCategory }) });
      },
      onError: () => toast({ title: "Upload failed", variant: "destructive" })
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          toast({ title: "Image deleted" });
          queryClient.invalidateQueries({ queryKey: getListPortfolioImagesQueryKey({ category: activeCategory }) });
        }
      });
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-2xl font-serif text-white mb-2">Portfolio Management</h3>
        <p className="text-muted-foreground">Upload and manage images for each category.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card p-6 border border-white/5">
            <h4 className="font-medium text-white mb-4">Select Category</h4>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    activeCategory === cat ? 'bg-primary/20 text-primary border-l-2 border-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleUpload} className="bg-card p-6 border border-white/5 space-y-4">
            <h4 className="font-medium text-white mb-2">Upload to {activeCategory}</h4>
            
            <div className="space-y-2">
              <Label>Image File *</Label>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="bg-background border-white/10"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Title (Optional)</Label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Summer Campaign"
                className="bg-background border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background border-white/10 resize-none"
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full" disabled={!file || createMutation.isPending}>
              {createMutation.isPending ? "Uploading..." : "Upload Image"}
            </Button>
          </form>
        </div>

        <div className="md:col-span-2">
          <div className="bg-card p-6 border border-white/5 min-h-[500px]">
            <h4 className="font-medium text-white mb-6">Images in {activeCategory}</h4>
            
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="aspect-square bg-white/5" />
                <Skeleton className="aspect-square bg-white/5" />
              </div>
            ) : images && images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {images.map(img => (
                  <div key={img.id} className="group relative aspect-square bg-background overflow-hidden border border-white/10">
                    <img src={img.imageUrl} alt={img.title || "Portfolio item"} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                      <p className="text-white text-center font-medium mb-1">{img.title || "Untitled"}</p>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="mt-4 rounded-full"
                        onClick={() => handleDelete(img.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center border border-dashed border-white/10 text-muted-foreground text-sm">
                No images found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CeoManager() {
  const { data: ceo, isLoading } = useGetCeoProfile({ query: { queryKey: getGetCeoProfileQueryKey() } });
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [vision, setVision] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const updateMutation = useUpdateCeoProfile();

  useEffect(() => {
    if (ceo) {
      setName(ceo.name || "");
      setBio(ceo.bio || "");
      setVision(ceo.vision || "");
    }
  }, [ceo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      data: {
        name,
        bio,
        vision,
        file: file as any
      }
    }, {
      onSuccess: () => {
        toast({ title: "CEO Profile updated" });
        setFile(null);
        queryClient.invalidateQueries({ queryKey: getGetCeoProfileQueryKey() });
      },
      onError: () => toast({ title: "Failed to update profile", variant: "destructive" })
    });
  };

  if (isLoading) return <Skeleton className="h-96 w-full max-w-2xl bg-card" />;

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-2xl font-serif text-white mb-2">CEO Profile</h3>
        <p className="text-muted-foreground">Manage the vision and identity of the agency leader.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card p-8 border border-white/5 space-y-6">
        <div className="space-y-2">
          <Label>CEO Name</Label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="bg-background border-white/10"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>Biography</Label>
          <Textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)}
            className="bg-background border-white/10 min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Vision Statement</Label>
          <Textarea 
            value={vision} 
            onChange={(e) => setVision(e.target.value)}
            className="bg-background border-white/10 min-h-[80px]"
            placeholder="Short, impactful quote..."
          />
        </div>
        
        <div className="space-y-4">
          <Label>Profile Photo</Label>
          <div className="flex items-center gap-6">
            <div className="w-24 h-32 bg-background border border-dashed border-white/20 overflow-hidden">
              {ceo?.imageUrl ? (
                <img src={ceo.imageUrl} alt="CEO" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">None</div>
              )}
            </div>
            <div className="flex-1">
              <Input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="bg-background border-white/10"
              />
              <p className="text-xs text-muted-foreground mt-2">Upload a new image to replace the current one. High-quality portrait recommended.</p>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </div>
  );
}

function BackgroundManager() {
  const { data: backgrounds, isLoading } = useListBackgrounds({ query: { queryKey: getListBackgroundsQueryKey() } });
  const [file, setFile] = useState<File | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const uploadMutation = useUploadBackground();
  const deleteMutation = useDeleteBackground();

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    uploadMutation.mutate({
      data: { file: file as any }
    }, {
      onSuccess: () => {
        toast({ title: "Background uploaded" });
        setFile(null);
        queryClient.invalidateQueries({ queryKey: getListBackgroundsQueryKey() });
      },
      onError: () => toast({ title: "Upload failed", variant: "destructive" })
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this background?")) {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListBackgroundsQueryKey() });
        }
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-serif text-white mb-2">Cinematic Backgrounds</h3>
        <p className="text-muted-foreground">Upload images for the hero section slideshow.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <form onSubmit={handleUpload} className="bg-card p-6 border border-white/5 space-y-4 md:col-span-1 h-fit">
          <h4 className="font-medium text-white mb-2">Add Background</h4>
          <div className="space-y-2">
            <Label>Image File</Label>
            <Input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="bg-background border-white/10"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={!file || uploadMutation.isPending}>
            {uploadMutation.isPending ? "Uploading..." : "Upload Image"}
          </Button>
        </form>

        <div className="md:col-span-2 bg-card p-6 border border-white/5">
          <h4 className="font-medium text-white mb-6">Active Backgrounds</h4>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="aspect-video bg-white/5" />
            </div>
          ) : backgrounds && backgrounds.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {backgrounds.map(bg => (
                <div key={bg.id} className="relative aspect-video group overflow-hidden border border-white/10">
                  <img src={bg.imageUrl} alt="Background" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(bg.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground border border-dashed border-white/10">
              No backgrounds uploaded yet. Hero section will show a dark gradient.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContentManager() {
  const { data: content, isLoading } = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  
  const [formData, setFormData] = useState({
    heroHeading: "",
    heroSubtext: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    socialInstagram: "",
    socialTwitter: "",
    socialFacebook: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const updateMutation = useUpdateSiteContent();

  useEffect(() => {
    if (content) {
      setFormData({
        heroHeading: content.heroHeading || "",
        heroSubtext: content.heroSubtext || "",
        contactEmail: content.contactEmail || "",
        contactPhone: content.contactPhone || "",
        contactAddress: content.contactAddress || "",
        socialInstagram: content.socialInstagram || "",
        socialTwitter: content.socialTwitter || "",
        socialFacebook: content.socialFacebook || ""
      });
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      data: formData
    }, {
      onSuccess: () => {
        toast({ title: "Site content updated" });
        queryClient.invalidateQueries({ queryKey: getGetSiteContentQueryKey() });
      },
      onError: () => toast({ title: "Failed to update", variant: "destructive" })
    });
  };

  if (isLoading) return <Skeleton className="h-96 max-w-3xl bg-card" />;

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h3 className="text-2xl font-serif text-white mb-2">Site Content</h3>
        <p className="text-muted-foreground">Manage text copy and contact information.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-card p-8 border border-white/5 space-y-6">
          <h4 className="font-medium text-white border-b border-white/10 pb-4">Hero Section</h4>
          
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input 
              name="heroHeading"
              value={formData.heroHeading} 
              onChange={handleChange}
              className="bg-background border-white/10 text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Subtext</Label>
            <Textarea 
              name="heroSubtext"
              value={formData.heroSubtext} 
              onChange={handleChange}
              className="bg-background border-white/10"
            />
          </div>
        </div>

        <div className="bg-card p-8 border border-white/5 space-y-6">
          <h4 className="font-medium text-white border-b border-white/10 pb-4">Contact Information</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input 
                name="contactEmail"
                value={formData.contactEmail} 
                onChange={handleChange}
                className="bg-background border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input 
                name="contactPhone"
                value={formData.contactPhone} 
                onChange={handleChange}
                className="bg-background border-white/10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea 
              name="contactAddress"
              value={formData.contactAddress} 
              onChange={handleChange}
              className="bg-background border-white/10 h-20"
            />
          </div>
        </div>

        <div className="bg-card p-8 border border-white/5 space-y-6">
          <h4 className="font-medium text-white border-b border-white/10 pb-4">Social Links</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Instagram URL</Label>
              <Input 
                name="socialInstagram"
                value={formData.socialInstagram} 
                onChange={handleChange}
                className="bg-background border-white/10 col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Twitter URL</Label>
              <Input 
                name="socialTwitter"
                value={formData.socialTwitter} 
                onChange={handleChange}
                className="bg-background border-white/10 col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Facebook URL</Label>
              <Input 
                name="socialFacebook"
                value={formData.socialFacebook} 
                onChange={handleChange}
                className="bg-background border-white/10 col-span-3"
              />
            </div>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? "Saving..." : "Save All Content"}
        </Button>
      </form>
    </div>
  );
}
