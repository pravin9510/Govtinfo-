import { useState, useMemo } from 'react'
import { 
  Search, 
  Sun, 
  Heart, 
  Home, 
  Wheat, 
  Flame, 
  Wallet, 
  GraduationCap, 
  Rocket, 
  Users, 
  Banknote, 
  Sparkles, 
  Smartphone, 
  Hammer, 
  PiggyBank, 
  Briefcase, 
  BookOpen,
  Building2,
  Shield,
  Train,
  Landmark,
  Scale,
  Stethoscope,
  Mail,
  Factory,
  Plane,
  Menu,
  X,
  ExternalLink,
  Calendar,
  Users2,
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter,
  MapPin,
  TrendingUp,
  Award,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { schemes, schemeCategories } from './data/schemes'
import { jobs, jobCategories } from './data/jobs'
import './App.css'

const iconMap: Record<string, React.ElementType> = {
  Sun, Heart, Home, Wheat, Flame, Wallet, GraduationCap, Rocket, Users, 
  Banknote, Sparkles, Smartphone, Hammer, PiggyBank, Briefcase, BookOpen,
  Building2, Shield, Train, Landmark, Scale, Stethoscope, Mail, Factory, Plane
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSchemeCategory, setSelectedSchemeCategory] = useState('All')
  const [selectedJobCategory, setSelectedJobCategory] = useState('All')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<'en' | 'hi'>('hi')

  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      const matchesSearch = 
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.nameHindi.includes(searchQuery) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.descriptionHindi.includes(searchQuery)
      const matchesCategory = selectedSchemeCategory === 'All' || scheme.category === selectedSchemeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedSchemeCategory])

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.titleHindi.includes(searchQuery) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.departmentHindi.includes(searchQuery)
      const matchesCategory = selectedJobCategory === 'All' || job.category === selectedJobCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedJobCategory])

  const activeJobsCount = jobs.filter(j => j.status === 'Active').length
  const totalVacancies = jobs.filter(j => j.status === 'Active').reduce((acc, j) => acc + j.vacancies, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  {language === 'hi' ? 'सरकारी योजना पोर्टल' : 'Sarkari Yojna Portal'}
                </h1>
                <p className="text-xs text-gray-500">
                  {language === 'hi' ? 'सभी सरकारी योजनाएं और नौकरियां एक जगह' : 'All Govt Schemes & Jobs in One Place'}
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
                className="text-sm font-medium"
              >
                {language === 'hi' ? 'English' : 'हिंदी'}
              </Button>
              <a href="#schemes" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                {language === 'hi' ? 'योजनाएं' : 'Schemes'}
              </a>
              <a href="#jobs" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                {language === 'hi' ? 'नौकरियां' : 'Jobs'}
              </a>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <Bell className="w-4 h-4 mr-2" />
                {language === 'hi' ? 'अलर्ट्स' : 'Alerts'}
              </Button>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            >
              {language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
            </Button>
            <a href="#schemes" className="block py-2 text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
              {language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}
            </a>
            <a href="#jobs" className="block py-2 text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
              {language === 'hi' ? 'सरकारी नौकरियां' : 'Government Jobs'}
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-green-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">
              <TrendingUp className="w-3 h-3 mr-1" />
              {language === 'hi' ? 'भारत सरकार की आधिकारिक जानकारी' : 'Official Government of India Information'}
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {language === 'hi' ? (
                <>
                  सभी <span className="text-orange-600">सरकारी योजनाएं</span> और <span className="text-green-600">नौकरियां</span> एक जगह
                </>
              ) : (
                <>
                  All <span className="text-orange-600">Government Schemes</span> & <span className="text-green-600">Jobs</span> in One Place
                </>
              )}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {language === 'hi' 
                ? 'भारत सरकार की सभी योजनाओं और नौकरियों की जानकारी प्राप्त करें। पात्रता, लाभ और आवेदन प्रक्रिया जानें।'
                : 'Get information about all Government of India schemes and jobs. Know eligibility, benefits, and application process.'}
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={language === 'hi' ? 'योजना या नौकरी खोजें...' : 'Search schemes or jobs...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-orange-200 focus:border-orange-500 shadow-lg"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <Card className="bg-white/60 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-orange-600">{schemes.length}+</p>
                  <p className="text-sm text-gray-600">{language === 'hi' ? 'सरकारी योजनाएं' : 'Govt Schemes'}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/60 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">{activeJobsCount}+</p>
                  <p className="text-sm text-gray-600">{language === 'hi' ? 'सक्रिय भर्तियां' : 'Active Recruitments'}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/60 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">{totalVacancies.toLocaleString()}+</p>
                  <p className="text-sm text-gray-600">{language === 'hi' ? 'कुल रिक्तियां' : 'Total Vacancies'}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/60 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600">24/7</p>
                  <p className="text-sm text-gray-600">{language === 'hi' ? 'अपडेट्स' : 'Updates'}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="schemes" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 grid grid-cols-2">
            <TabsTrigger value="schemes" className="text-lg py-3">
              <Award className="w-5 h-5 mr-2" />
              {language === 'hi' ? 'योजनाएं' : 'Schemes'}
            </TabsTrigger>
            <TabsTrigger value="jobs" className="text-lg py-3">
              <Briefcase className="w-5 h-5 mr-2" />
              {language === 'hi' ? 'नौकरियां' : 'Jobs'}
            </TabsTrigger>
          </TabsList>

          {/* Schemes Tab */}
          <TabsContent value="schemes" id="schemes">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">
                  {language === 'hi' ? 'श्रेणी के अनुसार फ़िल्टर करें:' : 'Filter by Category:'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {schemeCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedSchemeCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSchemeCategory(category)}
                    className={selectedSchemeCategory === category 
                      ? 'bg-orange-500 hover:bg-orange-600' 
                      : 'border-gray-300 hover:border-orange-300'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemes.map((scheme) => {
                const IconComponent = iconMap[scheme.icon] || Award
                return (
                  <Dialog key={scheme.id}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 group">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:from-orange-500 group-hover:to-orange-600 transition-colors">
                              <IconComponent className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              {scheme.launchYear}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg mt-3 group-hover:text-orange-600 transition-colors">
                            {language === 'hi' ? scheme.nameHindi : scheme.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {language === 'hi' ? scheme.descriptionHindi : scheme.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {scheme.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{scheme.ministry}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          {language === 'hi' ? scheme.nameHindi : scheme.name}
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[70vh]">
                        <div className="space-y-6 p-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              {language === 'hi' ? 'विवरण' : 'Description'}
                            </h4>
                            <p className="text-gray-600">
                              {language === 'hi' ? scheme.descriptionHindi : scheme.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-orange-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <Users2 className="w-4 h-4 text-orange-500" />
                                {language === 'hi' ? 'पात्रता' : 'Eligibility'}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                {language === 'hi' ? scheme.eligibilityHindi : scheme.eligibility}
                              </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <Award className="w-4 h-4 text-green-500" />
                                {language === 'hi' ? 'लाभ' : 'Benefits'}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                {language === 'hi' ? scheme.benefitsHindi : scheme.benefits}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{language === 'hi' ? 'लॉन्च वर्ष:' : 'Launch Year:'} <strong>{scheme.launchYear}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{language === 'hi' ? 'मंत्रालय:' : 'Ministry:'} <strong>{scheme.ministry}</strong></span>
                            </div>
                          </div>

                          <a 
                            href={scheme.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {language === 'hi' ? 'आधिकारिक वेबसाइट पर जाएं' : 'Visit Official Website'}
                            </Button>
                          </a>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                )
              })}
            </div>

            {filteredSchemes.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {language === 'hi' ? 'कोई योजना नहीं मिली' : 'No schemes found'}
                </p>
                <p className="text-gray-400 text-sm">
                  {language === 'hi' ? 'कृपया अपनी खोज बदलें' : 'Please try a different search'}
                </p>
              </div>
            )}
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" id="jobs">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">
                  {language === 'hi' ? 'श्रेणी के अनुसार फ़िल्टर करें:' : 'Filter by Category:'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {jobCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedJobCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedJobCategory(category)}
                    className={selectedJobCategory === category 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'border-gray-300 hover:border-green-300'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => {
                const IconComponent = iconMap[job.icon] || Briefcase
                return (
                  <Dialog key={job.id}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200 group">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:from-green-500 group-hover:to-green-600 transition-colors">
                                <IconComponent className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                                  {language === 'hi' ? job.titleHindi : job.title}
                                </CardTitle>
                                <p className="text-sm text-gray-500">
                                  {language === 'hi' ? job.departmentHindi : job.department}
                                </p>
                              </div>
                            </div>
                            <Badge 
                              className={job.status === 'Active' 
                                ? 'bg-green-100 text-green-700' 
                                : job.status === 'Upcoming' 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : 'bg-gray-100 text-gray-700'
                              }
                            >
                              {job.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <p className="text-xl font-bold text-green-600">{job.vacancies.toLocaleString()}</p>
                              <p className="text-xs text-gray-500">{language === 'hi' ? 'रिक्तियां' : 'Vacancies'}</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm font-semibold text-gray-700">{job.lastDate}</p>
                              <p className="text-xs text-gray-500">{language === 'hi' ? 'अंतिम तिथि' : 'Last Date'}</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs font-semibold text-gray-700 truncate">{job.qualification}</p>
                              <p className="text-xs text-gray-500">{language === 'hi' ? 'योग्यता' : 'Qualification'}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{job.category}</Badge>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              {language === 'hi' ? 'अधिक जानें' : 'Know More'} <ChevronRight className="w-4 h-4" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          {language === 'hi' ? job.titleHindi : job.title}
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[70vh]">
                        <div className="space-y-6 p-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                              <p className="text-3xl font-bold text-green-600">{job.vacancies.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">{language === 'hi' ? 'कुल रिक्तियां' : 'Total Vacancies'}</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                              <p className="text-lg font-bold text-orange-600">{job.lastDate}</p>
                              <p className="text-sm text-gray-600">{language === 'hi' ? 'अंतिम तिथि' : 'Last Date'}</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <GraduationCap className="w-5 h-5 text-blue-500 mt-0.5" />
                              <div>
                                <p className="font-semibold text-gray-900">{language === 'hi' ? 'योग्यता' : 'Qualification'}</p>
                                <p className="text-gray-600">{language === 'hi' ? job.qualificationHindi : job.qualification}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Users2 className="w-5 h-5 text-purple-500 mt-0.5" />
                              <div>
                                <p className="font-semibold text-gray-900">{language === 'hi' ? 'आयु सीमा' : 'Age Limit'}</p>
                                <p className="text-gray-600">{language === 'hi' ? job.ageLimitHindi : job.ageLimit}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Banknote className="w-5 h-5 text-green-500 mt-0.5" />
                              <div>
                                <p className="font-semibold text-gray-900">{language === 'hi' ? 'वेतन' : 'Salary'}</p>
                                <p className="text-gray-600">{language === 'hi' ? job.salaryHindi : job.salary}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Building2 className="w-5 h-5 text-gray-500 mt-0.5" />
                              <div>
                                <p className="font-semibold text-gray-900">{language === 'hi' ? 'विभाग' : 'Department'}</p>
                                <p className="text-gray-600">{language === 'hi' ? job.departmentHindi : job.department}</p>
                              </div>
                            </div>
                          </div>

                          <a 
                            href={job.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {language === 'hi' ? 'आधिकारिक वेबसाइट पर आवेदन करें' : 'Apply on Official Website'}
                            </Button>
                          </a>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                )
              })}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {language === 'hi' ? 'कोई नौकरी नहीं मिली' : 'No jobs found'}
                </p>
                <p className="text-gray-400 text-sm">
                  {language === 'hi' ? 'कृपया अपनी खोज बदलें' : 'Please try a different search'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {language === 'hi' ? 'सरकारी योजना पोर्टल' : 'Sarkari Yojna Portal'}
                </h3>
              </div>
              <p className="text-gray-400 text-sm">
                {language === 'hi' 
                  ? 'भारत सरकार की सभी योजनाओं और नौकरियों की जानकारी एक ही जगह पर।'
                  : 'All Government of India schemes and jobs information in one place.'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#schemes" className="hover:text-white transition-colors">{language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}</a></li>
                <li><a href="#jobs" className="hover:text-white transition-colors">{language === 'hi' ? 'सरकारी नौकरियां' : 'Government Jobs'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'hi' ? 'पात्रता जांचें' : 'Check Eligibility'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === 'hi' ? 'आवेदन स्थिति' : 'Application Status'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{language === 'hi' ? 'लोकप्रिय योजनाएं' : 'Popular Schemes'}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">PM Kisan Samman Nidhi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ayushman Bharat</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PM Awas Yojana</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ujjwala Yojana</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{language === 'hi' ? 'संपर्क करें' : 'Contact Us'}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {language === 'hi' ? 'नई दिल्ली, भारत' : 'New Delhi, India'}
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {language === 'hi' ? '24/7 उपलब्ध' : 'Available 24/7'}
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>
              {language === 'hi' 
                ? '© 2025 सरकारी योजना पोर्टल। यह एक स्वतंत्र जानकारी पोर्टल है।'
                : '© 2025 Sarkari Yojna Portal. This is an independent information portal.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
