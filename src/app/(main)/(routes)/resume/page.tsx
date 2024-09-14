"use client"
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form' // 用于表单校验
import { Input } from '@/components/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, LibraryBig, MessageSquareQuote, Sparkle, Sticker, TableOfContents, Terminal } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import Image from 'next/image'
import logoPng from '@/public/images/turinglogo.png';
import Link from 'next/link'
import { useFormContext } from '@/context/FormProviderForTec'
import { useFormContextForPla } from '@/context/FormProviderForPla'
import { apiCreateResumeForPla, apiCreateResumeForTec } from '@/api/resume'

const formSchemaForTec = z.object({
  name: z.string(),
  direction: z.string(),
  student_id: z.string(),
  phone_number: z.string(),
  email: z.string(),
  major: z.string(),
  evaluation: z.string(),
  skills: z.string(),
  expectation: z.string(),
  experience: z.string(),
  others: z.string(),
})

const formSchemaForPla = z.object({
  name: z.string(),
  student_id: z.string(),
  phone_number: z.string(),
  major: z.string(),
  expertise: z.string(),
  evaluation: z.string(),
  expectation: z.string(),
  experience: z.string(),
  others: z.string(),
})

const ResumeEditPage = () => {
  const [unsubmitted, setUnsubmitted] = useState(true);
  const { formData, setFormData } = useFormContext();
  const { formDataForPla, setFormDataForPla } = useFormContextForPla();

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
    const storedFormDataForPla = localStorage.getItem("formDataForPla");
    if (storedFormDataForPla) {
      setFormDataForPla(JSON.parse(storedFormDataForPla));
    }
  }, [setFormData, setFormDataForPla])

  const formForTec = useForm<z.infer<typeof formSchemaForTec>>({
    resolver: zodResolver(formSchemaForTec),
    defaultValues: {
      name: formData.name || "",
      direction: formData.direction || "",
      student_id: formData.student_id || "",
      phone_number: formData.phone_number || "",
      email: formData.email || "",
      major: formData.major || "",
      evaluation: formData.evaluation || "",
      skills: formData.skills || "",
      expectation: formData.expectation || "",
      experience: formData.experience || "",
      others: formData.others || "",
    }
  })

  const formForPla = useForm<z.infer<typeof formSchemaForPla>>({
    resolver: zodResolver(formSchemaForPla),
    defaultValues: {
      name: formDataForPla.name || "",
      student_id: formDataForPla.student_id || "",
      phone_number: formDataForPla.phone_number || "",
      major: formDataForPla.major || "",
      evaluation: formDataForPla.evaluation || "",
      expertise: formDataForPla.expertise || "",
      expectation: formDataForPla.expectation || "",
      experience: formDataForPla.experience || "",
      others: formDataForPla.others || "",
    }
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 存进localStorage
    localStorage.setItem("formData", JSON.stringify({ ...formData, [field]: value }));
  }

  const handleInputChangeForPla = (field: string, value: string) => {
    setFormDataForPla((prev) => ({ ...prev, [field]: value }));
    // 存进localStorage
    localStorage.setItem("formDataForPla", JSON.stringify({ ...formDataForPla, [field]: value }));
  }

  const onSubmitForTec = async (values: z.infer<typeof formSchemaForTec>) => {
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const value = values[key as keyof typeof values];
        if (value === "") {
          toast("❗简历尚未填写完毕，请填写完整❗");
          return;
        }
      }
    }
    // TODO: 提交表单
    try {
      const result = await apiCreateResumeForTec(values);
      console.log("提交成功！", result);
      toast("提交成功！🎉");
      setUnsubmitted(false);
    } catch (error) {
      console.error("提交大失败！", error);
    }
  }

  const onSubmitForPla = async (values: z.infer<typeof formSchemaForPla>) => {
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const value = values[key as keyof typeof values];
        if (value === "") {
          toast("❗简历尚未填写完毕，请填写完整❗");
          return;
        }
      }
    }
    // TODO: 提交表单
    try {
      const result = await apiCreateResumeForPla(values);
      console.log("提交成功！", result);
      toast("提交成功！🎉");
      setUnsubmitted(false);
    } catch (error) {
      console.error("提交大失败！", error);
    }
  }

  return (
    <div className='flex flex-col items-center h-full pb-24 print:pb-0'>
      <Link href={'/'} className='print:hidden'>
        <Image src={logoPng} alt="turinglogo" width={100} height={100}
          className="sm:w-[70px] my-16 sm:my-10"
        ></Image>
      </Link>
      <Tabs defaultValue="technical" className="w-[1000px] sm:w-[90%] print:w-[100%]">
        <TabsList className="grid w-full grid-cols-2 h-[50px] mb-10 sm:mb-5 sm:h-[65px] sm:p-[10px] p-[5px] print:hidden">
          <TabsTrigger value="technical" className='h-[40px] text-md font-bold sm:h-[45px] sm:text-[1.1rem]'>创新组简历填写</TabsTrigger>
          <TabsTrigger value="planning" className='h-[40px] text-md font-bold sm:h-[45px] sm:text-[1.1rem]'>创业组简历填写</TabsTrigger>
        </TabsList>
        <TabsContent value="technical">
          <Card className="w-full p-10 print:border-none print:shadow-none print:p-0 sm:p-5" id='card'>
            <CardHeader className='mb-5 print:mb-2'>
              <CardTitle className='text-center text-[2rem] cursor-default'>图灵智能创新团队创新组招新简历</CardTitle>
              <CardDescription className='text-center print:hidden'>请认真填写你的简历信息！</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...formForTec}>
                <form onSubmit={formForTec.handleSubmit((values, event) => {
                  event?.preventDefault();
                  onSubmitForTec(values);
                })} className="space-y-4">
                  <div className='flex flex-col justify-between'>
                    <p className='font-bold text-xl text-ellipsis flex gap-1 items-center mb-1'><TableOfContents />个人信息</p>
                    <div className='grid grid-cols-3 gap-5 sm:grid-cols-1'>
                      <FormField
                        control={formForTec.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-muted-foreground'>姓名</FormLabel>
                            <FormControl>
                              <Input placeholder="张三" {...field} className='mt-0 w-full'
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleInputChange("name", e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForTec.control}
                        name="student_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-muted-foreground'>学号</FormLabel>
                            <FormControl>
                              <Input placeholder="202211991299" {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleInputChange("student_id", e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForTec.control}
                        name="major"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-muted-foreground'>专业名称</FormLabel>
                            <FormControl>
                              <Input placeholder="计算机科学与技术" {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleInputChange("major", e.target.value);
                                }} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='grid grid-cols-3 gap-5 py-2 sm:grid-cols-1'>
                      <FormField
                        control={formForTec.control}
                        name="direction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-muted-foreground'>方向</FormLabel>
                            <FormControl>
                              {/* <Input placeholder="前端" {...field} onChange={(e) => {
                                field.onChange(e);
                                handleInputChange("direction", e.target.value);
                              }} /> */}
                              <Select  {...field} onValueChange={(e) => {
                                field.onChange(e);
                                handleInputChange("direction", e);
                              }}>
                                <SelectTrigger className='w-full' id='placeholder'>
                                  <SelectValue placeholder="请选择你的方向" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="前端">前端</SelectItem>
                                  <SelectItem value="后端">后端</SelectItem>
                                  <SelectItem value="计算机视觉">计算机视觉</SelectItem>
                                  <SelectItem value="自然语言处理">自然语言处理</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForTec.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-muted-foreground'>电话号码</FormLabel>
                            <FormControl>
                              <Input placeholder="198*******4" {...field} className='mt-0 w-full' onChange={(e) => {
                                field.onChange(e);
                                handleInputChange("phone_number", e.target.value);
                              }} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForTec.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-muted-foreground'>邮箱地址</FormLabel>
                            <FormControl>
                              <Input placeholder="*********@qq.com" {...field} onChange={(e) => {
                                field.onChange(e);
                                handleInputChange("email", e.target.value);
                              }} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <hr className='my-5 print:my-3' />
                    <div className='flex flex-col gap-7 pb-5 print:gap-5'>
                      <div className='flex flex-col gap-2'>
                        <p className='font-bold text-xl text-ellipsis flex gap-1 items-center'><Sticker />自我评价</p>
                        <FormField
                          control={formForTec.control}
                          name="evaluation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-muted-foreground'></FormLabel>
                              <FormControl>
                                <Textarea placeholder="简单的自我介绍即可" {...field} className='w-full' onChange={(e) => {
                                  field.onChange(e);
                                  handleInputChange("evaluation", e.target.value);
                                }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='font-bold text-xl text-ellipsis flex gap-1 items-center'><Terminal />技能水平</p>
                        <FormField
                          control={formForTec.control}
                          name="skills"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-muted-foreground'></FormLabel>
                              <FormControl>
                                <Textarea placeholder="高中学过一些计算机相关的知识，参加过信奥比赛等" {...field} className='w-full' onChange={(e) => {
                                  field.onChange(e);
                                  handleInputChange("skills", e.target.value);
                                }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='font-bold text-xl text-ellipsis flex gap-1 items-center'><Sparkle />自我期望</p>
                        <FormField
                          control={formForTec.control}
                          name="expectation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-muted-foreground'></FormLabel>
                              <FormControl>
                                <Textarea placeholder="我希望大学四年可以学习到足够的知识用于就业/考研..." {...field} className='w-full'
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleInputChange("expectation", e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='font-bold text-xl text-ellipsis flex gap-1 items-center'><LibraryBig />项目经历</p>
                        <FormField
                          control={formForTec.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-muted-foreground'></FormLabel>
                              <FormControl>
                                <Textarea placeholder="【写过具体项目（无论大小）的才用答，否则填暂无】" {...field} className='w-full'
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleInputChange("experience", e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='font-bold text-xl text-ellipsis flex gap-1 items-center'><MessageSquareQuote />其他想说的</p>
                        <FormField
                          control={formForTec.control}
                          name="others"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-muted-foreground'></FormLabel>
                              <FormControl>
                                <Textarea placeholder="是否准备参加学生会或者社团协会组织？是否能坚持学习方向知识，做到不随意放弃？" {...field} className='w-full'
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleInputChange("others", e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-5 print:hidden sm:grid-cols-1'>
                    <Button type="submit" className='w-full font-bold sm:h-[55px] sm:text-[1.1rem] h-[55px] text-[1.05rem]'>提 交</Button>
                    <Button className='w-full font-bold bg-zinc-500 sm:h-[55px] sm:text-[1.1rem] h-[55px] text-[1.05rem] hover:bg-zinc-500/95'
                      onClick={(e) => {
                        e.preventDefault();
                        window.print();
                      }}
                      disabled={unsubmitted}
                    >点 击 打 印</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="planning" id='resume'>
          <Card className="w-full p-10 print:border-none print:shadow-none print:p-0" id='card'>
            <CardHeader className='mb-5 print:mb-2'>
              <CardTitle className='text-center text-[2rem] cursor-default'>图灵智能创新团队创业组招新简历</CardTitle>
              <CardDescription className='text-center print:hidden'>请认真填写你的简历信息！</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...formForPla}>
                <form onSubmit={formForPla.handleSubmit((values, event) => {
                  event?.preventDefault();
                  onSubmitForPla(values);
                })} className="space-y-4">
                  <div className='flex flex-col justify-between'>
                    <p className='font-bold text-xl text-ellipsis flex gap-1 items-center'><TableOfContents />个人信息</p>
                    <div className='grid grid-cols-4 gap-5 sm:grid-cols-1'>
                      <FormField
                        control={formForPla.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-muted-foreground'>姓名</FormLabel>
                            <FormControl>
                              <Input placeholder="张三" {...field} className='mt-0 w-full'
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleInputChangeForPla("name", e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForPla.control}
                        name="student_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-muted-foreground'>学号</FormLabel>
                            <FormControl>
                              <Input placeholder="202211991299" {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleInputChangeForPla("student_id", e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForPla.control}
                        name="major"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-muted-foreground'>专业名称</FormLabel>
                            <FormControl>
                              <Input placeholder="工商管理" {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleInputChangeForPla("major", e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formForPla.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-muted-foreground'>电话号码</FormLabel>
                            <FormControl>
                              <Input placeholder="13144612411" {...field} className='mt-0 w-full'
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleInputChangeForPla("phone_number", e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <hr className='my-5' />
                    <div className='flex flex-col gap-7 pb-5'>
                      <div className='flex flex-col gap-2'>
                        <p className='font-bold text-xl text-ellipsis flex gap-1 items-center'><Sticker />自我评价</p>
                        <FormField
                          control={formForPla.control}
                          name="evaluation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-muted-foreground'></FormLabel>
                              <FormControl>
                                <Textarea placeholder="简单的自我介绍即可" {...field} className='w-full'
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleInputChangeForPla("evaluation", e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='font-bold text-xl text-ellipsis flex gap-1 items-center'><Flame />擅长领域</p>
                        <FormField
                          control={formForPla.control}
                          name="expertise"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-muted-foreground'></FormLabel>
                              <FormControl>
                                <Textarea placeholder="可以是美食/音乐/茶艺/篮球/运动/游戏等等相关具体内容" {...field} className='w-full'
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleInputChangeForPla("expertise", e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='font-bold text-xl text-ellipsis flex gap-1 items-center'><Sparkle />自我期望</p>
                        <FormField
                          control={formForPla.control}
                          name="expectation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-muted-foreground'></FormLabel>
                              <FormControl>
                                <Textarea placeholder="我希望大学四年可以积攒足够的经验和学习用于就业/考研..." {...field} className='w-full'
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleInputChangeForPla("expectation", e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='font-bold text-xl text-ellipsis flex gap-1 items-center'><LibraryBig />相关经历</p>
                        <FormField
                          control={formForPla.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-muted-foreground'></FormLabel>
                              <FormControl>
                                <Textarea placeholder="【有创业/策划相关经验（无论大小）的才用答，否则填暂无】" {...field} className='w-full'
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleInputChangeForPla("experience", e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <p className='font-bold text-xl text-ellipsis flex gap-1 items-center'><MessageSquareQuote />其他想说的</p>
                        <FormField
                          control={formForPla.control}
                          name="others"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-muted-foreground'></FormLabel>
                              <FormControl>
                                <Textarea placeholder="是否准备参加学生会或者社团协会组织？是否能坚持学习方向知识，做到不随意放弃？" {...field} className='w-full'
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleInputChangeForPla("others", e.target.value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-5 print:hidden sm:grid-cols-1'>
                    <Button type="submit" className='w-full font-bold sm:h-[55px] sm:text-[1.1rem] h-[55px] text-[1.05rem]'>提 交</Button>
                    <Button className='w-full font-bold bg-zinc-500 sm:h-[55px] sm:text-[1.1rem] h-[55px] text-[1.05rem] hover:bg-zinc-500/90'
                      onClick={(e) => {
                        e.preventDefault();
                        window.print();
                      }}
                      disabled={unsubmitted}
                    >点 击 打 印</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ResumeEditPage