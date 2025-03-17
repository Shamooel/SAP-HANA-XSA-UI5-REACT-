// Mock data for testimonials
const mockTestimonials = [
    {
      id: 1,
      name: "Yusha Ali",
      company: "TechCorp",
      quote: "Fantastic service!",
      image: "https://play-lh.googleusercontent.com/7Ac5TgaL15Ra4bvFVHJKCdJp4qvnL4djZj5bKc6RN-MZjzrvkeHbJytek0NPTSdZcp8",
    },
    {
      id: 2,
      name: "Hamna Ali",
      company: "BizInc",
      quote: "Really transformed our workflow.",
      image: "https://wallpapers.com/images/hd/anime-hijab-drawing-nvuysmz0txskbxmn.jpg",
    },
  
  ]
  
  // Get all testimonials
  exports.getAllTestimonials = (req, res) => {
    try {
      // Simulate a slight delay to mimic database fetch
      setTimeout(() => {
        res.status(200).json({ testimonials: mockTestimonials })
      }, 300)
    } catch (error) {
      console.error("Error fetching testimonials:", error)
      res.status(500).json({ message: "Failed to fetch testimonials", error: error.message })
    }
  }
  
  