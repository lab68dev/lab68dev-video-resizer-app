import { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { Upload, FileVideo, Download, Loader2, Play, Coins, Lock, CreditCard, HelpCircle, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function VideoResizer() {
  const [loaded, setLoaded] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputVideo, setOutputVideo] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [useBlur, setUseBlur] = useState(false);
  
  // Credit System State
  const [credits, setCredits] = useState<number>(5);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');

  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  // Load Credits and Instructions State
  useEffect(() => {
    const savedCredits = localStorage.getItem('lab68_resizer_credits');
    if (savedCredits) {
        setCredits(parseInt(savedCredits, 10));
    } else {
        localStorage.setItem('lab68_resizer_credits', '5');
        setCredits(5);
    }

    const hasSeenInstructions = localStorage.getItem('lab68_seen_instructions');
    if (!hasSeenInstructions) {
        setShowInstructions(true);
        localStorage.setItem('lab68_seen_instructions', 'true');
    }
  }, []);

  // Update LocalStorage whenever credits change
  useEffect(() => {
    localStorage.setItem('lab68_resizer_credits', credits.toString());
  }, [credits]);

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd';
    const ffmpeg = ffmpegRef.current;
    
    ffmpeg.on('log', ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
      console.log(message);
    });

    ffmpeg.on('progress', ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });

    try {
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        setLoaded(true);
    } catch (error) {
        console.error('Failed to load FFmpeg:', error);
        toast.error('Failed to load video processing engine. Please try reloading.');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setOutputVideo(null);
      setProgress(0);
    }
  };

  const handleRedeem = () => {
    const code = redeemCode.trim().toUpperCase();
    if (code === 'LAB68-10') {
        setCredits(prev => prev + 10);
        toast.success('Successfully added 10 credits!');
        setRedeemCode('');
        setShowPaywall(false);
    } else if (code === 'RESET') {
        setCredits(5);
        toast.success('Credits reset to 5');
        setShowPaywall(false);
    } else {
        toast.error('Invalid Redeem Code');
    }
  };

  const processVideo = async () => {
    if (!videoFile || !loaded) return;

    if (credits <= 0) {
        setShowPaywall(true);
        return;
    }

    setProcessing(true);
    setProgress(0);
    const ffmpeg = ffmpegRef.current;
    const inputName = 'input.mp4';
    const outputName = 'output.mp4';

    try {
        await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

        let width = 1080;
        let height = 1920;

        switch (aspectRatio) {
            case '9:16': width = 1080; height = 1920; break;
            case '16:9': width = 1920; height = 1080; break;
            case '1:1': width = 1080; height = 1080; break;
            case '4:5': width = 1080; height = 1350; break;
        }

        let filter = '';

        if (useBlur) {
            filter = `[0:v]split[a][b];[a]scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height},boxblur=20:10[bg];[b]scale=${width}:${height}:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2`;
        } else {
             filter = `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`;
        }

        await ffmpeg.exec(['-i', inputName, '-vf', filter, outputName]);
        
        const data = await ffmpeg.readFile(outputName);
        const url = URL.createObjectURL(new Blob([data as any], { type: 'video/mp4' }));
        setOutputVideo(url);
        
        setCredits(prev => Math.max(0, prev - 1));
        
        toast.success('Video processed successfully!');
    } catch (error) {
        console.error('Error processing video:', error);
        toast.error('Error processing video.');
    } finally {
        setProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-gray-800">
        <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Video Studio
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg">
                Professional client-side resizing for TikTok, Reels & Shorts. 
                <br className="hidden md:inline" />No servers involved. Private & Secure.
            </p>
        </div>
        
        <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setShowInstructions(true)} className="gap-2">
                <HelpCircle className="w-4 h-4" />
                Guide
            </Button>
            <Card className="bg-gray-900 border-gray-800 shadow-xl w-fit">
                <CardContent className="p-3 flex items-center gap-3">
                    <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-2 rounded-lg">
                        <Coins className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Credits</p>
                        <p className="text-xl font-bold leading-none">{credits}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 text-blue-400 hover:text-blue-300 ml-2" onClick={() => setShowPaywall(true)}>
                        + Add
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>

       {!loaded && (
        <Card className="bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="flex items-center justify-center p-4 text-sm text-yellow-500 animate-pulse gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Initializing FFmpeg Core...
            </CardContent>
        </Card>
       )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
            <Card className="border-2 border-dashed border-gray-800 bg-gray-950/30 hover:bg-gray-950/50 transition-colors h-full min-h-[400px]">
                <CardContent className="flex flex-col items-center justify-center h-full p-6 space-y-6">
                    {videoFile && videoPreview ? (
                        <div className="w-full flex flex-col items-center space-y-4">
                            <div className="relative w-full aspect-video md:aspect-auto md:h-[400px] bg-black rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
                                <video 
                                    src={videoPreview} 
                                    controls 
                                    className="w-full h-full object-contain" 
                                />
                            </div>
                            <div className="flex items-center justify-between w-full px-4 py-3 bg-gray-900 rounded-lg border border-gray-800">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 bg-blue-500/10 rounded-md">
                                        <FileVideo className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <p className="font-medium truncate text-sm">{videoFile.name}</p>
                                        <p className="text-xs text-muted-foreground">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950/50" onClick={() => { setVideoFile(null); setVideoPreview(null); }}>
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer group">
                            <div className="p-6 rounded-full bg-gray-900 group-hover:bg-gray-800 transition-all mb-4">
                                <Upload className="w-12 h-12 text-gray-500 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <span className="text-xl font-semibold">Drop video here</span>
                            <span className="text-sm text-muted-foreground mt-2">or click to browse</span>
                            <span className="text-xs text-muted-foreground mt-1 bg-gray-900 px-3 py-1 rounded-full border border-gray-800">Max 2GB • MP4, MOV</span>
                            <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
                        </label>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Controls (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
            <Card className="h-full border-gray-800 bg-gray-900/40 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                        Configuration
                    </CardTitle>
                    <CardDescription>Customize your output settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-300">Target Platform / Ratio</Label>
                        <Select value={aspectRatio} onValueChange={setAspectRatio} disabled={!videoFile || processing}>
                            <SelectTrigger className="h-12 bg-gray-950 border-gray-800">
                                <SelectValue placeholder="Select ratio" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="9:16">📱 Vertical (9:16) - TikTok/Reels</SelectItem>
                                <SelectItem value="1:1">⬜ Square (1:1) - Instagram Post</SelectItem>
                                <SelectItem value="16:9">📺 Landscape (16:9) - YouTube</SelectItem>
                                <SelectItem value="4:5">🖼️ Portrait (4:5) - Instagram/FB</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                     <div className="flex items-center justify-between p-4 rounded-lg bg-gray-950 border border-gray-800">
                        <div className="space-y-0.5">
                            <Label className="text-base">Background Blur</Label>
                            <p className="text-xs text-muted-foreground">Fill empty space with blurred video</p>
                        </div>
                        <Switch
                            checked={useBlur}
                            onCheckedChange={setUseBlur}
                            disabled={!videoFile || processing}
                        />
                    </div>

                    {processing && (
                        <div className="space-y-3 p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                            <div className="flex justify-between text-sm font-medium text-blue-400">
                                <span>Processing...</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2 bg-blue-950" />
                            <p ref={messageRef} className="text-xs text-muted-foreground h-4 truncate font-mono"></p>
                        </div>
                    )}

                    {!processing && outputVideo && (
                        <div className="space-y-4 pt-4 border-t border-gray-800 animate-in fade-in slide-in-from-bottom-4">
                             <div className="p-3 bg-green-500/10 rounded-lg flex items-center gap-3 border border-green-500/20">
                                <div className="p-1.5 bg-green-500 rounded-full">
                                    <CheckCircle className="w-4 h-4 text-black" />
                                </div>
                                <span className="text-sm font-medium text-green-500">Processing Complete!</span>
                             </div>
                             <a href={outputVideo} download={`resized-${aspectRatio.replace(':','-')}.mp4`} className="w-full block">
                                <Button className="w-full h-12 gap-2 bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-900/20 transition-all">
                                    <Download className="w-5 h-5" />
                                    Download MP4
                                </Button>
                             </a>
                        </div>
                    )}

                    <Button 
                        size="lg" 
                        className={`w-full h-14 text-lg font-bold shadow-lg transition-all ${processing ? 'bg-gray-800' : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/25'}`}
                        onClick={processVideo}
                        disabled={!loaded || !videoFile || processing}
                    >
                        {processing ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Processing Video...
                            </>
                        ) : (
                             credits <= 0 ? (
                                <>
                                    <Lock className="w-5 h-5 mr-2" />
                                    Limit Reached
                                </>
                             ) : (
                                `Start Processing (${credits} credits)`
                             )
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>

       {/* Paywall Modal */}
       <Dialog open={showPaywall} onOpenChange={setShowPaywall}>
        <DialogContent className="sm:max-w-md bg-gray-950 border-gray-800">
            <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
                <Coins className="text-yellow-500" />
                Get More Credits
            </DialogTitle>
            <DialogDescription className="pt-2">
                You have used your 5 free resizes. Support the developer to get more!
            </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
                <div className="p-4 bg-gray-900 rounded-lg space-y-3 border border-gray-800">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">10 Resizes Pack</span>
                        <span className="text-xl font-bold text-green-400">$10</span>
                    </div>
                    <Button className="w-full bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black font-bold" onClick={() => window.open('https://buymeacoffee.com/lab68dev', '_blank')}>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Buy on "Buy Me a Coffee"
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">After payment, you will receive a code to redeem below.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Have a code?</label>
                    <div className="flex gap-2">
                        <Input 
                            placeholder="Enter Code (e.g. LAB68-10)" 
                            value={redeemCode}
                            onChange={(e) => setRedeemCode(e.target.value)}
                            className="bg-gray-900 border-gray-800"
                        />
                        <Button onClick={handleRedeem}>Redeem</Button>
                    </div>
                </div>
            </div>
        </DialogContent>
        </Dialog>

        {/* Instructions Modal */}
        <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
            <DialogContent className="sm:max-w-xl bg-gray-950 border-gray-800">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl md:text-2xl">
                        <Info className="text-blue-500 w-6 h-6" />
                        Welcome to Video Studio
                    </DialogTitle>
                    <DialogDescription className="text-base pt-2">
                        Here is how to resize your videos in seconds, completely client-side.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                    <div className="grid gap-4">
                        <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold shrink-0 border border-blue-900">1</div>
                            <div>
                                <h4 className="font-semibold text-white">Upload Video</h4>
                                <p className="text-sm text-gray-400">Drag & drop your video (MP4, MOV). It stays on your device.</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold shrink-0 border border-blue-900">2</div>
                            <div>
                                <h4 className="font-semibold text-white">Choose Format</h4>
                                <p className="text-sm text-gray-400">Select 9:16 for TikTok/Reels/Shorts or 1:1 for Posts.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold shrink-0 border border-blue-900">3</div>
                            <div>
                                <h4 className="font-semibold text-white">Background Blur</h4>
                                <p className="text-sm text-gray-400">Toggle this to automatically fill black bars with a professional blur effect.</p>
                            </div>
                        </div>

                         <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center text-yellow-500 font-bold shrink-0 border border-yellow-900">!</div>
                            <div>
                                <h4 className="font-semibold text-white">Credits</h4>
                                <p className="text-sm text-gray-400">You have 5 free credits. Support us to get more!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => setShowInstructions(false)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                        Got it, Let's go!
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
