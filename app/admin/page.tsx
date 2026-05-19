"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, GripVertical, 
  Save, X, Image, ExternalLink, AlertTriangle
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface Project {
  id: string;
  name: string;
  category: string;
  description: string | null;
  tags: string[];
  result: string | null;
  image_url: string | null;
  project_url: string | null;
  color: string;
  display_order: number;
  is_active: boolean;
}

const categories = ['SaaS', 'E-commerce', 'AI Tool', 'Mobile App', 'Enterprise', 'EdTech', 'Web App', 'Other'];
const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#ec4899', '#f59e0b', '#0ea5e9', '#ef4444', '#6366f1'];

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'SaaS',
    description: '',
    tags: '',
    result: '',
    image_url: '',
    project_url: '',
    color: '#3b82f6',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    
    if (!supabase || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });
    
    setProjects(data || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!supabase || !isSupabaseConfigured) {
      alert('Supabase is not configured. Please add your Supabase credentials to .env.local');
      return;
    }
    setSaving(true);
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    
    const projectData = {
      name: formData.name,
      category: formData.category,
      description: formData.description || null,
      tags: tagsArray,
      result: formData.result || null,
      image_url: formData.image_url || null,
      project_url: formData.project_url || null,
      color: formData.color,
      display_order: formData.display_order,
      is_active: formData.is_active,
    };

    if (editingProject) {
      const { error } = await supabase
        .from('projects')
        .update({ ...projectData, updated_at: new Date().toISOString() })
        .eq('id', editingProject.id);
      
      if (!error) {
        setEditingProject(null);
        fetchProjects();
      }
    } else {
      const { error } = await supabase
        .from('projects')
        .insert(projectData);
      
      if (!error) {
        setIsCreating(false);
        fetchProjects();
      }
    }
    
    setSaving(false);
    resetForm();
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to PERMANENTLY delete this project?')) {
      return;
    }
    
    // Remove from UI first
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    
    if (!supabase || !isSupabaseConfigured) {
      return;
    }
    
    try {
      console.log('Attempting hard delete for id:', id);
      
      // Use the database function to delete
      const result: any = await supabase.rpc('delete_project', { project_id: id });
      
      console.log('Delete result:', result);
      
      if (result?.error) {
        console.error('Delete error:', result.error);
        alert('Delete error: ' + result.error.message);
        fetchProjects();
      } else {
        console.log('Hard delete successful');
      }
    } catch (err: any) {
      console.error('Delete exception:', err);
      alert('Delete exception: ' + err.message);
      fetchProjects();
    }
  }

  async function toggleActive(project: Project) {
    if (!supabase || !isSupabaseConfigured) return;
    await supabase
      .from('projects')
      .update({ is_active: !project.is_active, updated_at: new Date().toISOString() })
      .eq('id', project.id);
    fetchProjects();
  }

  function resetForm() {
    setFormData({
      name: '',
      category: 'SaaS',
      description: '',
      tags: '',
      result: '',
      image_url: '',
      project_url: '',
      color: '#3b82f6',
      display_order: 0,
      is_active: true,
    });
    setEditingProject(null);
    setIsCreating(false);
  }

  async function uploadImage(file: File): Promise<string | null> {
    if (!supabase || !isSupabaseConfigured) {
      alert('Supabase not configured');
      return null;
    }
    
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(fileName, file);
    
    setUploading(false);
    
    if (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image: ' + error.message);
      return null;
    }
    
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName);
    
    return urlData.publicUrl;
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const url = await uploadImage(file);
    if (url) {
      setFormData({ ...formData, image_url: url });
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          uploadImage(file).then(url => {
            if (url) setFormData({ ...formData, image_url: url });
          });
        }
        break;
      }
    }
  }

  function startEdit(project: Project) {
    setFormData({
      name: project.name,
      category: project.category,
      description: project.description || '',
      tags: project.tags?.join(', ') || '',
      result: project.result || '',
      image_url: project.image_url || '',
      project_url: project.project_url || '',
      color: project.color,
      display_order: project.display_order,
      is_active: project.is_active,
    });
    setEditingProject(project);
    setIsCreating(false);
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", padding: 40 }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: 40 }}>
          <AlertTriangle size={48} style={{ color: "#f59e0b", marginBottom: 20 }} />
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>Supabase Not Configured</h1>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.7 }}>
            To use the admin panel, you need to configure your Supabase credentials. 
            Add the following to your <code style={{ background: "var(--bg-surface)", padding: "2px 6px", borderRadius: 4 }}>.env.local</code> file:
          </p>
          <div style={{ textAlign: "left", background: "var(--bg-surface)", padding: 20, borderRadius: 8, marginBottom: 24 }}>
            <p style={{ fontFamily: "monospace", fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
              NEXT_PUBLIC_SUPABASE_URL=your_url<br/>
              NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
            </p>
          </div>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-muted)" }}>
            Get these from your <a href="https://app.supabase.com" target="_blank" style={{ color: "var(--accent)" }}>Supabase Dashboard</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "20px 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1400, margin: "0 auto" }}>
          <div>
            <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text-primary)" }}>Portfolio Admin</h1>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-muted)" }}>Manage your projects</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/portfolio" style={{ padding: "10px 20px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              View Site
            </Link>
            <button 
              onClick={() => { resetForm(); setIsCreating(true); }}
              style={{ padding: "10px 20px", background: "var(--accent)", border: "none", borderRadius: 6, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
        </div>
      </header>

      {/* Form Modal */}
      {(isCreating || editingProject) && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
          <div style={{ background: "var(--bg-surface)", borderRadius: 12, width: "100%", maxWidth: 600, maxHeight: "90vh", overflow: "auto" }}>
            <div style={{ padding: 24, borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 600, color: "var(--text-primary)" }}>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={resetForm} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <X size={24} />
              </button>
            </div>
            
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Project Name *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  style={{ width: "100%", padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", fontSize: 14 }}
                  placeholder="e.g., FinStream Dashboard"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    style={{ width: "100%", padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", fontSize: 14 }}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Display Order</label>
                  <input 
                    type="number"
                    value={formData.display_order}
                    onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                    style={{ width: "100%", padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", fontSize: 14 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Description</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  style={{ width: "100%", padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", fontSize: 14, resize: "vertical" }}
                  placeholder="Brief description of the project..."
                />
              </div>

              <div>
                <label style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Tags (comma separated)</label>
                <input 
                  type="text"
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                  style={{ width: "100%", padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", fontSize: 14 }}
                  placeholder="e.g., Next.js, React, TypeScript"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Result / Achievement</label>
                  <input 
                    type="text"
                    value={formData.result}
                    onChange={e => setFormData({...formData, result: e.target.value})}
                    style={{ width: "100%", padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", fontSize: 14 }}
                    placeholder="e.g., 3x faster performance"
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Badge Color</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {colors.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFormData({...formData, color: c})}
                        style={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 6, 
                          background: c, 
                          border: formData.color === c ? "2px solid var(--text-primary)" : "2px solid transparent",
                          cursor: "pointer"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Image</label>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <label style={{ padding: "10px 16px", background: "var(--accent)", borderRadius: 6, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                    <Image size={16} />
                    {uploading ? 'Uploading...' : 'Upload'}
                    <input type="file" accept="image/*" onChange={handleFileSelect} style={{ display: "none" }} disabled={uploading} />
                  </label>
                  <span style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
                    or paste (Ctrl+V)
                  </span>
                </div>
                <input 
                  type="text"
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  onPaste={handlePaste}
                  style={{ width: "100%", padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", fontSize: 14 }}
                  placeholder="Image URL or paste from clipboard"
                />
                {formData.image_url && (
                  <div style={{ marginTop: 12, position: "relative" }}>
                    <img src={formData.image_url} alt="Preview" style={{ width: "100%", maxHeight: 150, objectFit: "cover", borderRadius: 6, border: "1px solid var(--border)" }} />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, image_url: ''})}
                      style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 4, color: "#fff", padding: "4px 8px", fontSize: 12, cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", display: "block", marginBottom: 8 }}>Project URL</label>
                <input 
                  type="text"
                  value={formData.project_url}
                  onChange={e => setFormData({...formData, project_url: e.target.value})}
                  style={{ width: "100%", padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", fontSize: 14 }}
                  placeholder="https://example.com"
                />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input 
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={e => setFormData({...formData, is_active: e.target.checked})}
                  style={{ width: 18, height: 18 }}
                />
                <span style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-primary)" }}>Active (visible on portfolio)</span>
              </label>
            </div>

            <div style={{ padding: 24, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button 
                onClick={resetForm}
                style={{ padding: "10px 20px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving || !formData.name}
                style={{ padding: "10px 24px", background: "var(--accent)", border: "none", borderRadius: 6, color: "#fff", fontSize: 14, fontWeight: 500, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
              >
                {saving ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects List */}
      <main style={{ padding: 40, maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ background: "var(--bg-surface)", borderRadius: 12, border: "1px solid var(--border)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
                <th style={{ padding: "16px 20px", textAlign: "left", fontFamily: "Inter,sans-serif", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>Order</th>
                <th style={{ padding: "16px 20px", textAlign: "left", fontFamily: "Inter,sans-serif", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>Project</th>
                <th style={{ padding: "16px 20px", textAlign: "left", fontFamily: "Inter,sans-serif", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>Category</th>
                <th style={{ padding: "16px 20px", textAlign: "left", fontFamily: "Inter,sans-serif", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "16px 20px", textAlign: "right", fontFamily: "Inter,sans-serif", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "16px 20px", fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-muted)" }}>{project.display_order}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {project.image_url ? (
                        <img src={project.image_url} alt="" style={{ width: 48, height: 48, borderRadius: 6, objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: 48, height: 48, borderRadius: 6, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Image size={20} style={{ color: "var(--text-muted)" }} />
                        </div>
                      )}
                      <div>
                        <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{project.name}</div>
                        <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {project.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ padding: "4px 10px", borderRadius: 99, background: `${project.color}20`, color: project.color, fontFamily: "Inter,sans-serif", fontSize: 12, fontWeight: 600 }}>
                      {project.category}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <button 
                      onClick={() => toggleActive(project)}
                      style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                      {project.is_active ? (
                        <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#22c55e", fontFamily: "Inter,sans-serif", fontSize: 13 }}>
                          <Eye size={16} /> Active
                        </span>
                      ) : (
                        <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontFamily: "Inter,sans-serif", fontSize: 13 }}>
                          <EyeOff size={16} /> Hidden
                        </span>
                      )}
                    </button>
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                      <button 
                        onClick={() => startEdit(project)}
                        style={{ padding: 8, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-primary)", cursor: "pointer" }}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        style={{ padding: 8, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "#ef4444", cursor: "pointer" }}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {projects.length === 0 && (
            <div style={{ padding: 60, textAlign: "center" }}>
              <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-muted)", marginBottom: 16 }}>No projects yet</p>
              <button 
                onClick={() => { resetForm(); setIsCreating(true); }}
                style={{ padding: "10px 20px", background: "var(--accent)", border: "none", borderRadius: 6, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
              >
                Add Your First Project
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}